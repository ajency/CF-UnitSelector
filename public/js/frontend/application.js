(function() {
  jQuery(document).ready(function($) {});

  CommonFloor.addInitializer(function() {
    return Backbone.history.start();
  });

  CommonFloor.start();

  CommonFloor.navigate('/project', true);

}).call(this);

//# sourceMappingURL=../frontend/application.js.map