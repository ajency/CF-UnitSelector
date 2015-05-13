(function() {
  jQuery(document).ready(function($) {
    var s, str;
    window.draw = SVG('aj-imp-builder-drag-drop');
    window.svgData = {
      'image': '',
      'data': [
        {
          'id': 1,
          'type': 'villa',
          'name': 'Villa 1',
          'canvas_type': 'polygon',
          'details': {
            'class': 'marked'
          },
          'points': ["197.333", "566.667 199.333", "495.333 206.667", "490 207.333", "479.333 218", "472.667 218", "456 230.667", "448.667 267.333", "454 267.333", "474.667 283.333", "477.333 281.333", "517.333 275.333", "519.333 275.333", "587"]
        }, {
          'id': 2,
          'type': 'villa',
          'name': 'Villa 2',
          'canvas_type': '',
          'details': '',
          'points': []
        }, {
          'id': 3,
          'type': 'villa',
          'name': 'Villa 3',
          'canvas_type': 'polygon',
          'details': {
            'class': 'marked'
          },
          'points': ["307.333", "459.333 293.333", "468 294", "482.667 284", "490 281.333", "517.333 275.333", "519.333 275.333", "587 341.333", "602.667 342.667", "580 356.667", "570.667 358", "489.333 343.333", "488 342.667", "463.333"]
        }, {
          'id': 4,
          'type': 'villa',
          'name': 'Villa 4',
          'canvas_type': '',
          'details': '',
          'points': []
        }, {
          'id': 5,
          'type': 'villa',
          'name': 'Villa 5',
          'canvas_type': 'polygon',
          'details': {
            'class': 'marked'
          },
          'points': ["382.665", "469.999 369.332", "479.999 370.665", "495.332 361.998", "501.999 356.667", "570.667 342.667", "580 341.333", "602.667 421.332", "615.999 419.998", "590.666 435.998", "582.666 435.998", "514.666 449.332", "505.332 450.665", "489.332 419.665", "485.332 420.665", "474.666"]
        }
      ],
      'supported_types': ['polygon']
    };
    window.createSvg = function(svgData) {
      window.rawSvg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
      rawSvg.setAttribute('id', 'Layer_1');
      rawSvg.setAttribute('style', 'border: 1px solid black');
      rawSvg.setAttribute('width', '100%');
      rawSvg.setAttribute('height', '100%');
      rawSvg.setAttributeNS(null, 'x', '0');
      rawSvg.setAttributeNS(null, 'y', '0');
      rawSvg.setAttributeNS(null, 'viewBox', '0 0 1600 1095');
      rawSvg.setAttributeNS(null, 'enable-background', 'new 0 0 1600 1095');
      rawSvg.setAttributeNS("http://www.w3.org/2000/xmlns/", "xmlns:xlink", "http://www.w3.org/1999/xlink");
      window.createImageTag();
      return $.each(svgData, function(index, value) {
        var tag;
        if (value.canvas_type === 'polygon') {
          tag = window.polygon.createPolgyonTag(value);
          if (tag !== "") {
            window.makeDraggable();
            rawSvg.appendChild(tag);
          }
        }
        if (value.type === 'marker') {
          return window.marker.createMarkerTag(value);
        }
      });
    };
    window.createImageTag = function() {
      var svgimg;
      svgimg = document.createElementNS('http://www.w3.org/2000/svg', 'image');
      svgimg.setAttributeNS(null, 'height', '100%');
      svgimg.setAttributeNS(null, 'width', '100%');
      svgimg.setAttributeNS('http://www.w3.org/1999/xlink', 'href', svgImg);
      svgimg.setAttributeNS(null, 'x', '10');
      svgimg.setAttributeNS(null, 'y', '10');
      svgimg.setAttributeNS(null, 'visibility', 'visible');
      return rawSvg.appendChild(svgimg);
    };
    window.createPanel = function(data) {
      return $.each(data, function(index, value) {
        return $('.' + value).removeClass('hidden');
      });
    };
    window.makeDraggable = function(data) {
      var element;
      element = draw.polygon(data);
      return element.draggable();
    };
    window.createPanel(window.svgData.supported_types);
    window.createSvg(window.svgData.data);
    s = new XMLSerializer();
    str = s.serializeToString(rawSvg);
    return draw.svg(str);
  });

}).call(this);

//# sourceMappingURL=../authoring-tool/svg.authoring.controller.js.map