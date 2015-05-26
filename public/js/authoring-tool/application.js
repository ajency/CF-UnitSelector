(function() {
  jQuery(document).ready(function($) {
    return AuthoringTool.state('svgAuthoring', {
      url: '/',
      sections: {
        'top': {
          ctrl: 'TopCtrl'
        },
        'left': {
          ctrl: 'LeftCtrl'
        },
        'right': {
          ctrl: 'RightCtrl'
        },
        'dynamic': {
          ctrl: 'DynamicCtrl'
        }
      }
    });
  });

}).call(this);

//# sourceMappingURL=../authoring-tool/application.js.map