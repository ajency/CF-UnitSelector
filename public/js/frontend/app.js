(function() {
  Handlebars.registerHelper('l10n', function(keyword) {
    var i, j, key, lang, len, locale, target;
    lang = navigator.language ? navigator.language : navigator.userLanguage;
    locale = window.locale[lang] || window.locale['en-US'] || window.locale || false;
    if (!locale) {
      return keyword;
    }
    target = locale;
    key = keyword.split(".");
    for (j = 0, len = key.length; j < len; j++) {
      i = key[j];
      target = target[key[i]];
    }
    target = target || keyword;
    return target;
  });

}).call(this);

//# sourceMappingURL=../frontend/app.js.map