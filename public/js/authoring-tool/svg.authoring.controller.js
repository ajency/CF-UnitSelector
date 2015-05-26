(function() {
  jQuery(document).ready(function($) {
    var s, str, types;
    $('.area').canvasAreaDraw();
    window.draw = SVG('aj-imp-builder-drag-drop');
    window.svgData = {
      'image': '',
      'data': [],
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
    $('.marked,.save').on('dblclick', function(e) {
      var currentElem, svgDataObjects;
      window.canvas_type = "polygon";
      $('#aj-imp-builder-drag-drop canvas').show();
      $('#aj-imp-builder-drag-drop .svg-draw-clear').show();
      $('#aj-imp-builder-drag-drop svg').first().css("position", "absolute");
      $('.edit-box').removeClass('hidden');
      currentElem = e.currentTarget;
      svgDataObjects = svgData.data;
      return _.each(svgDataObjects, (function(_this) {
        return function(svgDataObject, key) {
          var elemTypeId, points;
          elemTypeId = $(currentElem).attr("type-id");
          if (parseInt(elemTypeId) === svgDataObject.id) {
            points = svgDataObject.points;
            drawPoly(points);
            return $("input[name=svg-element-id]").val(svgDataObject.id);
          }
        };
      })(this));
    });
    $('#aj-imp-builder-drag-drop canvas').ready(function() {
      $('#aj-imp-builder-drag-drop canvas').hide();
      return $('#aj-imp-builder-drag-drop .svg-draw-clear').hide();
    });
    return $('.submit').on('click', function(e) {
      var childEle, details, value;
      console.log(value = $('.area').val().split(','));
      details = [];
      details.push({
        "class": 'villa'
      });
      childEle = {};
      childEle['id'] = $('.Villas').val();
      childEle['name'] = $(".Villas option:selected").text();
      childEle['type'] = $('.property_type').val();
      childEle['points'] = value;
      childEle['details'] = details;
      childEle['canvas_type'] = window.canvas_type;
      console.log(childEle);
      window.svgData.data.push(childEle);
      $('#aj-imp-builder-drag-drop canvas').hide();
      $('#aj-imp-builder-drag-drop svg').show();
      $('#aj-imp-builder-drag-drop svg').first().css("position", "absolute");
      console.log(window.svgData);
      window.createSvg(window.svgData.data);
      window.createPanel(window.svgData.supported_types);
      types = window.getPendingObjects(window.svgData.data);
      window.showPendingObjects(types);
      s = new XMLSerializer();
      str = s.serializeToString(rawSvg);
      return draw.svg(str);
    });
  });

}).call(this);

//# sourceMappingURL=../authoring-tool/svg.authoring.controller.js.map