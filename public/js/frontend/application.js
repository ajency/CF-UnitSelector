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
      url: '/master-view/bunglows',
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
      url: '/bunglows/unit-view/:id',
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
    CommonFloor.state('buildingList', {
      url: '/list-view/building',
      sections: {
        'top': {
          ctrl: 'TopBuildingListCtrl'
        },
        'left': {
          ctrl: 'LeftBuildingListCtrl'
        },
        'center': {
          ctrl: 'CenterBuildingListCtrl'
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