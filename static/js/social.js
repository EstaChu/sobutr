/* ===========================================================
 * @title: Social buttons
 * @version: 0.0.1-RC1
 * @author: José Florian González Krause
 * @license: MIT (http://www.opensource.org/licenses/mit-license.php)
 * @date: 14/08/2013
 * ===========================================================
 *
 * @DONE: Export the constructor to window scope.
 * @TODO: Adapt for twitter call & data flow optimization.
 * @TODO: Add self made code for tooltips rather include bootstrap ¿?
 * @TODO: Embed all the HTML.
 *
 * =========================================================== */

var Social = function(api, url, tag, logger){
  // Constructor.
  this.api = api;
  this.site = api;
  this.tag = tag;
  this.logger = logger;
  this.json = null;
  this.apiRes = new Array();

  // Selection of API
  if(this.api === 'twitter'){
    this.api = 'http://urls.api.twitter.com/1/urls/count.json?url=' + url;
  }else if(this.api === 'facebook'){
    this.api = 'http://graph.facebook.com/?id=' + url;
  }else{
    this.api = null;
  }
};

Social.prototype.getJSON = function(){
  // api json caller.
  self = this;
  self.tag = this.tag;
  self.logger = this.logger;
  self.api = this.api;

  $.getJSON(this.api, function(json){
    if(self.logger === true){
      Social.prototype._logger(json);
    };
    for(var key in json){
      if(json.hasOwnProperty(key))
        $(self.tag).append('<li>' + key + ': ' + json[key] + '</li>')
    };
  });
};

Social.prototype.renderCounter = function(){
  // Render the API call data
  self = this;
  self.tag = this.tag;
  self.logger = this.logger;
  self.api = this.api;

  //WARNING: In the actual state only works with FB need to change JQuery's node id
  $.getJSON(this.api, function(json){
    if(self.logger === true){
      Social.prototype._logger(json);
    };
    if(self.site === 'facebook'){
      $('#facebookAnch').tooltip({title: json.shares});
    }else if(self.site === 'twitter'){
      //WORKING: on it.
      console.log('*** TO FIX ***');
    }
  });
};

Social.prototype._logger = function(json){
  // logger private method.
  console.log("*** Hello!! I'm Lindsey Lohan!! ***\n");
  if(arguments.callee.caller){
    if(json){
      console.log('>>>> Return JSON: true');
      $.each(json, function(i, d){
        console.log('\t > \t \t ' + i + ' : ' + d);    
      })
    }else{
      console.log('>>>> Return JSON: false');
    }
    console.log('>>>> Logger: ' +  self.logger);
    console.log('>>>> div id: ' + self.tag);
    console.log('>>>> API site: ' + self.site)
    console.log('>>>> API call: ' + self.api);
  }else{
    console.log('>>>> Return JSON: false');
    console.log('>>>> API url: ' + this.api);
    console.log('>>>> Logger: ' + this.logger);
    console.log('>>>> div id: ' + this.tag);
    console.log('>>>> API site: ' + this.site);
    console.log('>>>> API call: ' + this.api);
  }
};



/* Social API:
   ===========
The first step is to initialize the library with your data in the html

```html
<cript>
  s.getJSON();
  url = 'http://facebook.com'
  var s = new Social('facebook', url, '#soBut', true);
</cript>
```

*/