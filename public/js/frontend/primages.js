/*!
 * prImages - Progressive-Responsive Images - v0.82 - 13/9/2014
 * http://code.hnldesign.nl/demo/hnl.prImages.html
 *
 * Copyright (c) 2014 HN Leussink
 * Dual licensed under the MIT and GPL licenses.
 *
 * Example: http://code.hnldesign.nl/demo/hnl.prImages.html
 */
if (!window.console) {
  var console = {log: function () {
    'use strict';
  }};
}
var Pr = {
  Options : {
    Debug :           window.location.search === '?debug' || false,
    HighQuality :     90,
    UrlType :         'uri',
    WatchResize :     true,
    WatchScroll :     true,
    WatchLoad :       true,
    OnlyVisible :     true,
    SearchSiblings :  true,
    ResBrPts :        [160, 320, 480, 768, 1024, 1224, 1824],
    DpiMultiplier :   (window.devicePixelRatio >= 1.5) ? 2 : 1,
    QueryVars : {
      filename: 'src',
      crop:     'zc',
      filters : 'fltr[]',
      quality : 'q',
      width:    'w',
      height:   'h'
    }
  },
  BrowserInfo : {
    supportsEvtLstnr :  typeof window.addEventListener === 'function',
    supportsElsByCln :  document.getElementsByClassName !== undefined,
    isCrap :            document.querySelectorAll === undefined
  },
  Nodes: [],
  PrElement: function (node) {
    'use strict';
    //define a mule for this image element, to handle preloading
    this.imgMule = new Image();
    //hook into the image loaded event for the mule
    if (Pr.BrowserInfo.supportsEvtLstnr) {
      this.imgMule.addEventListener('load', function () { node.prototype.imgLoaded(node.prototype.imgMule.src); }, false);
      this.imgMule.addEventListener('error', function (e) { console.log(e.type + ' loading image: ' + node.prototype.imgMule.src); }, false);
    } else {
      this.imgMule.attachEvent('onload', function () { node.prototype.imgLoaded(node.prototype.imgMule.src); });
      this.imgMule.attachEvent('onerror', function (e) { console.log(e.type + ' loading image: ' + node.prototype.imgMule.src); });
    }
    //setup/get required image attributes from the physical image element
    this.ImgData = {
      path:     node.getAttribute('data-path').substring(0, node.getAttribute('data-path').lastIndexOf('/') + 1),
      filename: node.getAttribute('data-path').substring(node.getAttribute('data-path').lastIndexOf('/') + 1),
      procPath: node.getAttribute('data-imgprocessor'),
      crop:     parseInt(node.getAttribute('data-crop'), 10),
      filters:  node.getAttribute('data-filters'),
      srcWidth: node.getAttribute('data-srcwidth'),
      ratio:    node.getAttribute('data-ratio'),
      quality:  0,
      width:    0,
      height:   0,
      urlCache: {}
    };
    this.isVisible = function () {
      //am I visible?
      var rect = node.getBoundingClientRect();
      return (
        rect.height > 0 &&
        rect.width > 0 &&
        rect.bottom >= 0 &&
        rect.right >= 0 &&
        rect.top <= (window.innerHeight || document.documentElement.clientHeight) &&
        rect.left <= (window.innerWidth || document.documentElement.clientWidth)
      );
    };
    this.imgLoaded = function (image) {
      //defines what should be done when the mule has loaded its image
      var th = this;
      //image has loaded, set it as source for the image we inserted earlier
      if (node.tagName === 'DIV') {
        node.style.backgroundImage = 'url(\'' + image + '\')';
      } else {
        node.src = image;
      }
      if (Pr.Options.Debug) { th.DebugInfo.show(); }
    };
    this.getDimensions = function (fallback) {
      //gets dimensions of node. If width is zero, falls back (if Options.SearchSiblings is true) to searching for siblings for width
      var dims = [node.offsetWidth, node.offsetHeight];
      if (dims[0] === 0 && fallback) {
        //if no width for the current node is found, look into all its siblings if a similar node is found *with* width and use that
        var sbl = node.parentNode.firstElementChild;
        while (sbl && sbl.nodeType === 1 && sbl !== this) {
          if (sbl.offsetWidth > 0) {
            dims = [sbl.offsetWidth, sbl.offsetHeight];
            break;
          }
          sbl = sbl.nextElementSibling || sbl.nextSibling;
        }
        if (dims[0] === 0) {
          //No sibling dimensions found. Does the image have primage siblings at all? Fallback to parent's parent parent
          //parent, etc (c determines how many times, e.g. how many 'levels up')
          var c = 3;
          var parNode = node.parentNode;
          while (dims[0] === 0 && c > 0) {
            dims = [parNode.offsetWidth, parNode.offsetHeight];
            parNode = parNode.parentNode;
            c -= 1;
          }
        }
      }
      return dims;
    };
    this.normalizedDimensions = function () {
      var th = this, x, y;
      var breakPoints = Pr.Options.ResBrPts.concat([this.ImgData.srcWidth]);
      //match passed value to defined responsive breakpoints. Returns array with width, height and quality
      var dims = th.getDimensions(Pr.Options.SearchSiblings);
      var ratio = parseFloat(th.ImgData.ratio) || Math.round(dims[1] / dims[0] * 100) / 100;
      for (x = 0; x < breakPoints.length - 1; x += 1) {
        if ((dims[0] * Pr.Options.DpiMultiplier <= breakPoints[x]) && (breakPoints[x] * ratio >= dims[1])) {
          break;
        }
      }
      var normalized = {
        width   : breakPoints[x],
        height  : (!!th.ImgData.crop) ? Math.round(breakPoints[x] * ratio) : 0,
        quality : Pr.Options.HighQuality,
        ratio   : ratio
      };
      if (Pr.Options.Debug) {
        th.DebugInfo.scaledUp  = th.ImgData.width < normalized.width;
        th.DebugInfo.isMax  = x === breakPoints.length - 1;
      }
      //merge ImgData into normalized, while keeping normalized data, so a virtual, modified ImgData object is returned for use
      for (y in th.ImgData) { if (th.ImgData.hasOwnProperty(y) && !normalized.hasOwnProperty(y)) { normalized[y] = th.ImgData[y]; } }
      return normalized;
    };
    this.buildUrl = function (imgData) {
      var th = this;
      var ReturnUrl = '';
      //first, check if url was already generated
      if (th.ImgData.urlCache[imgData.width]) {
        ReturnUrl = th.ImgData.urlCache[imgData.width];
      } else {
        if (!Pr.Options.UrlType || Pr.Options.UrlType === 'uri') {
          ReturnUrl =  imgData.path +
            'resized/' +
            imgData.width +
            '/' +
            imgData.height +
            '/' +
            imgData.quality +
            '/' +
            imgData.crop +
            '/' +
            imgData.filters +
            '/' +
            imgData.filename;
        } else if (Pr.Options.UrlType === 'query') {
          ReturnUrl =  imgData.procPath +
            '?' + Pr.Options.QueryVars.filename + '=' +
            imgData.path + imgData.filename +
            '&' + Pr.Options.QueryVars.width + '=' +
            imgData.width +
            '&' + Pr.Options.QueryVars.height + '=' +
            imgData.height +
            '&' + Pr.Options.QueryVars.quality + '=' +
            imgData.quality +
            '&' + Pr.Options.QueryVars.crop + '=' +
            imgData.crop;
          var filters = imgData.filters.split('+');
          var i;
          for (i = 0; i < filters.length; i += 1) {
            ReturnUrl += '&' + Pr.Options.QueryVars.filters + '=' +
              filters[i];
          }
        }
        th.ImgData.urlCache[imgData.width] = ReturnUrl;
      }
      return ReturnUrl;
    };
    this.loadResponsiveImg = function () {
      var th = this;
      var override = !!node.getAttribute('data-alwaysprocess');
      var goTime =  (Pr.Options.OnlyVisible && !override) ? th.isVisible() : true;
      if (goTime) {
        if (Pr.Options.Debug) { console.log('ok, node visible'); }
        //element is visible (if check is set, else this block always executes.) Override supersedes all.
        //get normalized dimensions for element
        var normalized = th.normalizedDimensions();
        //compare normalized dimensions to what is stored for the element
        if (th.ImgData.width !== normalized.width) {
          //element is at a width that requires other image, construct url for that image,
          //preload the new image. Event handler for load should handle the rest of the logic from here.
          th.imgMule.src = th.buildUrl(normalized);
          //store the new, normalized image data for reference on reprocessing
          th.ImgData = normalized;
          if (Pr.Options.Debug) { th.DebugInfo.show('Preloading new image...'); }
        }
      } else {
        if (Pr.Options.Debug) { console.log('not ok, node not visible'); }
      }
    };
    this.DebugInfo = {
      forNode : this,
      scaledUp : false,
      isMax: false,
      show : function (message) {
        //Debugging/demo
        var th = this.forNode;
        if (!node.getAttribute('data-nodebug')) {
          if (node.nextSibling && (node.nextSibling.className === 'infodiv preloading' || node.nextSibling.className === 'infodiv')) {
            node.nextSibling.parentNode.removeChild(node.nextSibling);
          }
          if (node.querySelectorAll('.infodiv')[0]) {
            node.removeChild(node.querySelectorAll('.infodiv')[0]);
          }
          var info = document.createElement('DIV');
          if (message) {
            info.innerHTML = message;
            info.className = 'infodiv preloading';
          } else {
            info.innerHTML = 'Elem: ' + node.offsetWidth + 'x' + node.offsetHeight +
              ', Img: ' + th.ImgData.width + 'x' + th.ImgData.height +
              (Pr.Options.DpiMultiplier > 1 ?
                  ' (Retina)' :  '');
            if (!!th.ImgData.crop) { info.innerHTML += ' (cropped)'; }
            if (this.isMax) { info.innerHTML += ' (max dimensions)'; }
            var updateinfo = document.createElement('SPAN');
            var upordown = this.scaledUp ? ' up' : ' down';
            updateinfo.innerHTML = 'Image adjusted' + upordown;
            updateinfo.className = 'updated';
            info.appendChild(updateinfo);
            setTimeout(function fadeAndRemove() {
              updateinfo.parentNode.removeChild(updateinfo);
            }, 2000);
            info.className = 'infodiv';
          }
          if (node.tagName !== 'DIV') {
            if (node.nextSibling) {
              node.parentNode.insertBefore(info, node.nextSibling);
            } else {
              node.parentNode.appendChild(info);
            }
          } else {
            node.appendChild(info);
          }
        }
      }
    };
    this.loadResponsiveImg();  //finally, process the image upon instantiation
  },
  Reprocess: function () {
    'use strict';
    var i;
    for (i = 0; i < Pr.Nodes.length; i += 1) {
      Pr.Nodes[i].prototype.loadResponsiveImg();
    }
  },
  ProcessImages: function (ClassName) {
    'use strict';
    if (!Pr.BrowserInfo.isCrap) {
      //it's go time!
      var elements = Pr.BrowserInfo.supportsElsByCln ?
                     document.getElementsByClassName(ClassName) :
                     document.querySelectorAll('.' + ClassName);
      var i;
      for (i = 0; i < elements.length; i += 1) {
        var validImg = elements[i].getAttribute('data-path') && elements[i].getAttribute('data-imgprocessor');
        if (validImg) {
          elements[i].prototype = new Pr.PrElement(elements[i]);
          Pr.Nodes.push(elements[i]); //store
        } else {
          console.log('Missing data attributes for:' + (elements[i].id || '(no id available)') + '. Skipping...');
        }
      }
    } else {
      //redirect crappy browsers (IE7 and <)
      if (window.location.search !== '?forcenojs') {
        window.location = '?forcenojs';
      }
    }
  }
};
//debounce prototype
Pr.Reprocess.deBounce = function (threshold, execAsap, caller) {
  'use strict';
  var func = this;
  var timeout;
  return function debounced() {
    var obj = this;
    function delayed(e) {
      if (!execAsap) {
        func.apply(obj, [caller]);
      }
      timeout = null;
    }
    if (timeout) {
      clearTimeout(timeout);
    } else if (execAsap) {
      func.apply(obj, [caller]);
    }
    timeout = setTimeout(delayed, threshold || 100);
  };
};
//determine to listen for either a resize (pc) or an orientation change (device) event
var support = (typeof window.hasOwnProperty === 'function') ?
              window.hasOwnProperty('onorientationchange') :
              false;
var  orientationEvent = support ?
                        'orientationchange' :
                        'resize';
//bind events to window when the document has been completely loaded and parsed, without waiting for stylesheets, images, and subframes to finish loading
if (Pr.BrowserInfo.supportsEvtLstnr) {
  document.addEventListener('DOMContentLoaded', function () {
    'use strict';
    Pr.ProcessImages('primage');
    if (Pr.Options.WatchResize) { window.addEventListener(orientationEvent, Pr.Reprocess.deBounce(100, false, 'resizeEvent'), false); }
    if (Pr.Options.WatchScroll) { window.addEventListener('scroll', Pr.Reprocess.deBounce(50, false, 'scrollEvent'), false); }
    //this is a surrogate for the issue with Safari mobile jumping back: http://stackoverflow.com/questions/25775840/mobile-safari-js-event-for-jump-to-last-scroll-position-on-refresh
    if (Pr.Options.WatchLoad) {   window.addEventListener('load', Pr.Reprocess.deBounce(50, false, 'loadEvent'), false); }
  }, false);
} else {
  document.attachEvent('onreadystatechange', function () {
    'use strict';
    Pr.ProcessImages('primage');
    if (Pr.Options.WatchResize) { window.attachEvent('on' + orientationEvent, Pr.Reprocess.deBounce(100, false, 'resizeEvent')); }
    if (Pr.Options.WatchScroll) { window.attachEvent('onscroll', Pr.Reprocess.deBounce(50, false, 'scrollEvent')); }
  });
}
//register reprocessing as a jQuery function if jQuery is defined
if (window.jQuery && typeof jQuery === 'function') {
  jQuery.fn.reprocessPrImg = function () {
    'use strict';
    return this.each(function () {
      if (this.prototype !== undefined) {
        this.prototype.loadResponsiveImg();
      }
    });
  };
}