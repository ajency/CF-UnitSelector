(function() {
  jQuery(document).ready(function($) {
    AuthoringTool.state('svgAuthoring', {
      url: '/',
      sections: {
        'top': {
          ctrl: 'TopCtrl'
        },
        'center': {
          ctrl: 'CenterCtrl'
        }
      }
    });
    AuthoringTool.addInitializer(function() {
      return Backbone.history.start();
    });
    return AuthoringTool.start();
  });

}).call(this);

//# sourceMappingURL=../authoring-tool/application.js.map