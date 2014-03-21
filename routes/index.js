
/*
 * GET home page.
 */
var md = require( "markdown" ).markdown;
var yml = require('js-yaml');
Mustache=require("mustache");

exports.index = function(req, res){
  res.sendfile("public/index.html");
};

exports.convert = function(req, res){
  var markdown = req.body.markdown;
  var yaml = '';
  var data = null;
  if(markdown.slice(0,3)==='---')
  {
    var end = markdown.indexOf('---',3);
    if(end>-1){
        yaml = markdown.slice(3,end);
        try{
          data = yml.load(yaml);
        }
        catch(e){
          res.send("Incorrect YAML");
          return;
        }
        markdown = markdown.slice(end+3);
    }
    //No closing --- were found
    else
        markdown=markdown.slice(3);
  }
  //Now we template it up:
  var content = Mustache.render(markdown, data)
  res.send(md.toHTML(content));
};
