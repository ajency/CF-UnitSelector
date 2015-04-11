(function() {
  jQuery(document).ready(function($) {
    CommonFloor.state('project', {
      url: '/',
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
    CommonFloor.state('bunglowMasterView', {
      url: '/master-view/:id/bunglows',
      sections: {
        'top': {
          ctrl: 'TopBunglowCtrl'
        },
        'left': {
          ctrl: 'LeftBunglowCtrl'
        },
        'center': {
          ctrl: 'CenterBunglowCtrl'
        }
      }
    });
    CommonFloor.addInitializer(function() {
      return Backbone.history.start();
    });
    return CommonFloor.start();
  });

}).call(this);

//# sourceMappingURL=../frontend/application.js.map