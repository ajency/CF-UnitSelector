jQuery(document).ready(function($) {
  AuthoringTool.addInitializer(function() {
    return Backbone.history.start();
  });
  return AuthoringTool.start();
});
