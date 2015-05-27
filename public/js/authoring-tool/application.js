(function() {
  jQuery(document).ready(function($) {
    AuthoringTool.addInitializer(function() {
      return Backbone.history.start();
    });
    return AuthoringTool.start();
  });

}).call(this);

//# sourceMappingURL=../authoring-tool/application.js.map