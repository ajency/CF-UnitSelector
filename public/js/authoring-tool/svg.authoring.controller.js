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
          'points': ["359", "332", "418", "365", "345", "359"]
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
          'points': ["425", "485", "459", "501", "457", "547", "408", "550"]
        }, {
          'id': 4,
          'type': 'villa',
          'name': 'Villa 4',
          'canvas_type': 'polygon',
          'details': {
            'class': 'marked'
          },
          'points': ["629", "490", "667", "476", "704", "474", "709", "499", "706", "536", "635", "539"]
        }, {
          'id': 5,
          'type': 'villa',
          'name': 'Villa 5',
          'canvas_type': '',
          'details': '',
          'points': []
        }, {
          'id': 6,
          'type': 'building',
          'name': 'Building 1',
          'canvas_type': '',
          'details': '',
          'points': []
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
      svgimg.setAttributeNS(null, 'height', '800');
      svgimg.setAttributeNS(null, 'width', '1600');
      svgimg.setAttributeNS('http://www.w3.org/1999/xlink', 'href', svgImg);
      svgimg.setAttributeNS(null, 'x', '0');
      svgimg.setAttributeNS(null, 'y', '0');
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
        var Marked, items;
        items = collection.where({
          'type': value
        });
        Marked = [];
        $.each(items, function(ind, val) {
          if (val.get('canvas_type') !== "") {
            return Marked.push(val);
          }
        });
        return type.push({
          'name': value,
          'id': value,
          'total': items.length,
          'unmarked': Marked.length
        });
      });
      return type;
    };
    window.showPendingObjects = function(data) {
      var html;
      html = '';
      $.each(data, function(index, value) {
        return html += '<strong class="pull-right" style="line-height:70px;margin-right: 20px;  color: #FF7E00;">' + 'Marked: ' + value.unmarked + ' ' + value.name + '(s) | Total : ' + value.total + ' ' + value.name + '(s)</strong>';
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
    $('#aj-imp-builder-drag-drop canvas').ready(function() {
      $('#aj-imp-builder-drag-drop canvas').hide();
      return $('#aj-imp-builder-drag-drop .svg-draw-clear').hide();
    });
    $(".toggle").click(function() {
      $(this).toggleClass("expanded");
      return $('.menu').toggleClass('open');
    });
    $('.submit').on('click', function(e) {
      var childEle, details, value;
      value = $('.area').val().split(',');
      details = {};
      details['class'] = 'marked';
      childEle = {};
      childEle['id'] = $('.Villas').val();
      childEle['name'] = $(".Villas option:selected").text();
      childEle['type'] = $('.property_type').val();
      childEle['points'] = value;
      childEle['details'] = details;
      childEle['canvas_type'] = window.canvas_type;
      window.svgData.data.push(childEle);
      $('#aj-imp-builder-drag-drop canvas').hide();
      $('#aj-imp-builder-drag-drop svg').show();
      $('#aj-imp-builder-drag-drop svg').first().css("position", "absolute");
      $('.edit-box').addClass('hidden');
      window.createSvg(window.svgData.data);
      types = window.getPendingObjects(window.svgData.data);
      window.showPendingObjects(types);
      s = new XMLSerializer();
      str = s.serializeToString(rawSvg);
      return draw.svg(str);
    });
    return $('.marked,.save').on('dblclick', function(e) {
      var currentElem, svgDataObjects;
      e.preventDefault();
      window.canvas_type = "polygon";
      $('#aj-imp-builder-drag-drop canvas').show();
      $('#aj-imp-builder-drag-drop .svg-draw-clear').show();
      $('#aj-imp-builder-drag-drop svg').first().css("position", "absolute");
      $('.edit-box').removeClass('hidden');
      currentElem = e.currentTarget.id;
      svgDataObjects = svgData.data;
      return _.each(svgDataObjects, (function(_this) {
        return function(svgDataObject, key) {
          var points;
          if (parseInt(currentElem) === svgDataObject.id) {
            points = svgDataObject.points;
            drawPoly(points);
            return $("input[name=svg-element-id]").val(svgDataObject.id);
          }
        };
      })(this));
    });
  });

}).call(this);

//# sourceMappingURL=../authoring-tool/svg.authoring.controller.js.map