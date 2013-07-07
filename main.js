(function($){
 
  var ListView = Backbone.View.extend({
    el: $('body'),
 
    initialize: function(){
      _.bindAll(this, 'render');
      this.render();
    },
 
    render: function(){
		var www = new Host({name: 'www'});
		var lyric = new Host({name: 'www', domain: 'lmail.jp'});
		
      $(this.el).append("<ul><li>hello world</li></ul>");
      $(this.el).append(www.getFQDN());
      $(this.el).append(lyric.getFQDN());

		var xssmodel = new XssModel();
      $(this.el).append(xssmodel.escape("attr"));
      $(this.el).append(xssmodel.getXssString());

		var model = new Backbone.Model();

		model.on('change', function(model){
			_.each(model.changedAttributes(), function(value, name){
				console.log(name + ":" + model.previous(name) + " -> " + value);
			});
		});

		model.set('foo', 1);
		model.set('foo', 3);

		var he = new Person();
		var pre = $(this.el);
		he.on('invalid', function(msg){
			console.log(msg.validationError);
			console.log($("#errorout").text(msg.validationError));
		});

		he.save();

		he.set('age', 1000, {validate: true});

    }
  });

  var listView = new ListView();

})(jQuery);

