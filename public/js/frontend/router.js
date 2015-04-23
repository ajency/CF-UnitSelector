(function() {
  _.extend(Marionette.AppStates.prototype, {
    history: [],
    storeRoute: function() {
      var url;
      console.log(url = Backbone.history.fragment);
      if ($.inArray(url, this.history) === -1) {
        return this.history.push(Backbone.history.fragment);
      }
    },
    previous: function() {
      this.history = _.without(this.history, Backbone.history.fragment);
      console.log(this.history);
      if (this.history.length > 1) {
        return this.history[this.history.length - 1];
      }
      if (this.history.length === 1) {
        return this.history[0];
      }
    }
  });

}).call(this);

//# sourceMappingURL=../frontend/router.js.map