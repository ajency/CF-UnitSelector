(function() {
  jQuery(document).ready(function($) {
    var s, str, types;
    $('.area').canvasAreaDraw();
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
          'points': ["197.333", "566.667", "495.333", "490", "479.333", "472.667", "456", "448.667", "454", "474.667", "477.333", "517.333", "519.333", "587"]
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
          'points': ["307.333", "459.333", "468", "482.667", "490", "517.333", "519.333", "587", "602.667", "580", "570.667", "489.333", "488", "463.333"]
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
          'points': ["382.665", "469.999", "479.999", "495.332", "501.999", "570.667", "580", "602.667", "615.999", "590.666", "582.666", "514.666", "505.332", "489.332", "485.332", "474.666"]
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
    window.getPendingObjects = function(svgData) {
      var collection, type, uniqTypes;
      type = [];
      collection = new Backbone.Collection(svgData);
      uniqTypes = _.pluck(svgData, 'type');
      uniqTypes = _.uniq(uniqTypes);
      $.each(uniqTypes, function(index, value) {
        var items, notMarked;
        items = collection.where({
          'type': value
        });
        notMarked = [];
        $.each(items, function(ind, val) {
          if (val.get('canvas_type') === "") {
            return notMarked.push(val);
          }
        });
        return type.push({
          'name': value,
          'id': value,
          'total': items.length,
          'unmarked': notMarked.length
        });
      });
      return type;
    };
    window.showPendingObjects = function(data) {
      var html;
      html = '';
      $.each(data, function(index, value) {
        return html += '<input type="checkbox" name="' + value.id + '" id="' + value.id + '" value="">' + value.name + '<strong>Display marked units</strong>' + '<strong class="pull-right" style="line-height:70px;margin-right: 20px;  color: #FF7E00;">' + 'Pending: ' + value.unmarked + ' ' + value.name + '(s) | Total : ' + value.total + ' ' + value.name + '(s)</strong>';
      });
      return $('.pending').html(html);
    };
    window.createSvg(window.svgData.data);
    window.createPanel(window.svgData.supported_types);
    types = window.getPendingObjects(window.svgData.data);
    window.showPendingObjects(types);
    s = new XMLSerializer();
    str = s.serializeToString(rawSvg);
    draw.svg(str);
    $('.marked').on('dblclick', function(e) {
      return $('#aj-imp-builder-drag-drop canvas').show();
    });
    return $('#aj-imp-builder-drag-drop canvas').ready(function() {
      $('#aj-imp-builder-drag-drop canvas').hide();
      return $('#aj-imp-builder-drag-drop .svg-draw-clear').hide();
    });
  });

}).call(this);

//# sourceMappingURL=../authoring-tool/svg.authoring.controller.js.map