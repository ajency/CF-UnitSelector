(function() {
  jQuery(document).ready(function($) {
    CommonFloor.state('project', {
      url: '/project',
      sections: {
        'top': {
          ctrl: 'TopCtrl'
        },
        'left': {
          ctrl: 'LeftCtrl'
        },
        'center': {
          ctrl: 'CenterCtrl'
        }
      }
    });
    CommonFloor.addInitializer(function() {
      Backbone.history.start();
      return CommonFloor.navigate('/project', true);
    });
    return CommonFloor.start();
  });

}).call(this);

//# sourceMappingURL=../frontend/application.js.map