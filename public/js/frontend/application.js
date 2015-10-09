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
  CommonFloor.state('projectMaster', {
    url: '/master-view',
    sections: {
      'top': {
        ctrl: 'TopMasterCtrl'
      },
      'left': {
        ctrl: 'LeftMasterCtrl'
      },
      'center': {
        ctrl: 'CenterMasterCtrl'
      },
      'filter': {
        ctrl: 'FilterMasterCtrl'
      }
    }
  });
  CommonFloor.state('unit', {
    url: '/unit-view/:id',
    sections: {
      'top': {
        ctrl: 'TopUnitCtrl'
      },
      'left': {
        ctrl: 'LeftUnitCtrl'
      },
      'center': {
        ctrl: 'CenterUnitCtrl'
      }
    }
  });
  CommonFloor.state('projectList', {
    url: '/list-view',
    sections: {
      'top': {
        ctrl: 'TopListCtrl'
      },
      'center': {
        ctrl: 'CenterListCtrl'
      },
      'filter': {
        ctrl: 'FilterMasterCtrl'
      }
    }
  });
  CommonFloor.state('apartmentsList', {
    url: '/building/:id/apartments',
    sections: {
      'top': {
        ctrl: 'TopApartmentCtrl'
      },
      'center': {
        ctrl: 'CenterApartmentCtrl'
      },
      'filter': {
        ctrl: 'FilterApartmentCtrl'
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
      },
      'filter': {
        ctrl: 'FilterApartmentCtrl'
      }
    }
  });
  CommonFloor.addInitializer(function() {
    Backbone.history.start();
    return CommonFloor.router.storeRoute();
  });
  return CommonFloor.start();
});
