var split = require("split")
  , through = require("through")
  , duplex = require("duplexer")

module.exports = function () {
  var splitter = split(/(?:<\?js)|(?:\?>)/)
    , inJs = false
    , first = true

  var streamplate = through(function (data) {
    if (first) {
      this.queue("function(data){var str=\"\";")
      first = false
    }
    
    if (inJs) {
      if (data[0] == "=") {
				this.queue("str+=" + data.slice(1) + ";")
      } else {
				this.queue(data + ";")
      }
    } else {
      this.queue("str+=" + JSON.stringify(data) + ";")
    }
    
    inJs = !inJs
    
  }, function () {
    inJs = false
    first = true
    this.queue("return str;}")
    this.queue(null)
  })

  splitter.pipe(streamplate)

  return duplex(splitter, streamplate)
}