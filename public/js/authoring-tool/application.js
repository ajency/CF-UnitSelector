(function() {
  jQuery(document).ready(function($) {
    AuthoringTool.state('svgAuthoring', {
      url: '/authoring-tool',
      sections: {
        'top': {
          ctrl: 'TopCtrl'
        },
        'left': {
          ctrl: 'LeftCtrl'
        },
        'right': {
          ctrl: 'RightCtrl'
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