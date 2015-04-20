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
    CommonFloor.state('bunglowMaster', {
      url: '/master-view',
      sections: {
        'top': {
          ctrl: 'TopBunglowMasterCtrl'
        },
        'left': {
          ctrl: 'LeftBunglowMasterCtrl'
        },
        'center': {
          ctrl: 'CenterBunglowMasterCtrl'
        }
      }
    });
    CommonFloor.state('bunglowUnit', {
      url: '/unit-view/:id',
      sections: {
        'top': {
          ctrl: 'TopBunglowUnitCtrl'
        },
        'left': {
          ctrl: 'LeftBunglowUnitCtrl'
        },
        'center': {
          ctrl: 'CenterBunglowUnitCtrl'
        }
      }
    });
    CommonFloor.state('bunglowList', {
      url: '/list-view',
      sections: {
        'top': {
          ctrl: 'TopBunglowListCtrl'
        },
        'left': {
          ctrl: 'LeftBunglowListCtrl'
        },
        'center': {
          ctrl: 'CenterBunglowListCtrl'
        }
      }
    });
    CommonFloor.state('apartmentsList', {
      url: '/building/:id/apartments',
      sections: {
        'top': {
          ctrl: 'TopApartmentCtrl'
        },
        'left': {
          ctrl: 'LeftApartmentCtrl'
        },
        'center': {
          ctrl: 'CenterApartmentCtrl'
        }
      }
    });
    CommonFloor.state('apartmentsMaster', {
      url: '/building/:id/master-view',
      sections: {
        'top': {
          ctrl: 'TopApartmentMasterCtrl'
        },
        'left': {
          ctrl: 'LeftApartmentMasterCtrl'
        },
        'center': {
          ctrl: 'CenterApartmentMasterCtrl'
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