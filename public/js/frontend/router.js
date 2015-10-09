_.extend(Marionette.AppStates.prototype, {
  history: [],
  storeRoute: function() {
    var url;
    url = Backbone.history.fragment;
    if ($.inArray(url, this.history) === -1) {
      return this.history.push(Backbone.history.fragment);
    }
  },
  previous: function() {
    if (this.history.length > 1) {
      return this.history[this.history.length - 1];
    }
    if (this.history.length === 1) {
      return this.history[0];
    }
  }
});
