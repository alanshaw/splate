splate [![Dependency Status](https://david-dm.org/alanshaw/splate.png)](https://david-dm.org/alanshaw/splate)
===
The simplest possible streaming JavaScript template engine that could possibly work. JavaScript in your HTML. Oh god it's ASP all over again.

Features
---
* Start JS code block with `<?js`
* End JS code block with `?>`
* Print with `<?js= "Hello World!" ?>`

Usage
---
Template file ("template.html") looks like:

```html
<!doctype html>
<html>
<ul>
<?js
for (var i = 0; i < 10; i++) {
?>
<li><?js= "foo " + i ?></li>
<?js } ?>
</ul>
</html>
```

Compile the template with splate:

```javascript
var splate = require("splate")
  , fs = require("fs")

fs.createReadStream("template.html", {encoding: "utf8"})
  .pipe(splate())
  .pipe(fs.createWriteStream("compiled-tpl.js"))
```

"compiled-tpl.js" looks like:

```javascript
function(data){var str="";str+="<!doctype html>\n<html>\n<ul>\n";
for (var i = 0; i < 10; i++) {
;str+="\n<li>";str+= "foo " + i ;str+="</li>\n"; } ;str+="\n</ul>\n</html>";return str;}
```
