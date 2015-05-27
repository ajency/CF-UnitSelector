(function() {
  jQuery(document).ready(function($) {
    var s, store, str, types;
    $('.area').canvasAreaDraw();
    window.draw = SVG('aj-imp-builder-drag-drop');
    window.svgData = {
      'image': '',
      'data': [],
      'supported_types': ['villa', 'plot']
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
      var collection, supportedTypes, type;
      type = [];
      collection = new Backbone.Collection(svgData.data);
      supportedTypes = svgData.supported_types;
      console.log(supportedTypes = _.uniq(supportedTypes));
      $.each(supportedTypes, function(index, value) {
        var items, marked;
        items = collection.where({
          'type': value
        });
        marked = [];
        $.each(items, function(ind, val) {
          if (!_.isEmpty(val.get('canvas_type'))) {
            return marked.push(val);
          }
        });
        return type.push({
          'name': value,
          'id': value,
          'total': items.length,
          'marked': marked.length
        });
      });
      return type;
    };
    window.showPendingObjects = function(data) {
      var html;
      html = '';
      $.each(data, function(index, value) {
        return html += '<strong class="pull-right" style="line-height:70px;margin-right: 20px;  color: #FF7E00;">' + 'Marked: ' + value.marked + ' ' + value.name + '(s) | Total : ' + value.total + ' ' + value.name + '(s)</strong>';
      });
      return $('.pending').html(html);
    };
    window.generatePropTypes = function() {
      var select, types;
      types = window.svgData.supported_types;
      select = $('.property_type');
      $('<option />', {
        value: "",
        text: 'Select option'
      }).appendTo(select);
      $.each(types, function(index, value) {
        return $('<option />', {
          value: value,
          text: value.toUpperCase()
        }).appendTo(select);
      });
      return console.log($('.property_type'));
    };
    window.createSvg(window.svgData.data);
    window.generatePropTypes();
    window.createPanel(window.svgData.supported_types);
    types = window.getPendingObjects(window.svgData);
    window.showPendingObjects(types);
    s = new XMLSerializer();
    str = s.serializeToString(rawSvg);
    store = draw.svg(str);
    $('#aj-imp-builder-drag-drop canvas').ready(function() {
      $('#aj-imp-builder-drag-drop canvas').hide();
      return $('#aj-imp-builder-drag-drop .svg-draw-clear').hide();
    });
    $(".toggle").click(function() {
      $(this).toggleClass("expanded");
      return $('.menu').toggleClass('open');
    });
    $('.save').on('dblclick', function(e) {
      e.preventDefault();
      window.canvas_type = "polygon";
      $('#aj-imp-builder-drag-drop canvas').show();
      $('#aj-imp-builder-drag-drop .svg-draw-clear').show();
      $('#aj-imp-builder-drag-drop svg').first().css("position", "absolute");
      return $('.edit-box').removeClass('hidden');
    });
    $('.villa,.plot').on('dblclick', function(e) {
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
    $('.submit').on('click', function(e) {
      var childEle, details, value;
      if (_.isEmpty($('.area').val())) {
        $('.info').text('Coordinates not marked');
        $('.alert').removeClass('hidden');
        return false;
      }
      value = $('.area').val().split(',');
      store.remove();
      details = {};
      details['class'] = 'layer ' + $('.property_type').val();
      childEle = {};
      childEle['id'] = $('.units').val();
      childEle['name'] = $(".units option:selected").text();
      childEle['type'] = $('.property_type').val();
      childEle['points'] = value;
      childEle['details'] = details;
      childEle['canvas_type'] = window.canvas_type;
      window.svgData.data.push(childEle);
      $('#aj-imp-builder-drag-drop canvas').hide();
      $('#aj-imp-builder-drag-drop svg').show();
      $('.edit-box').addClass('hidden');
      window.createSvg(window.svgData.data);
      types = window.getPendingObjects(window.svgData);
      window.showPendingObjects(types);
      s = new XMLSerializer();
      str = s.serializeToString(rawSvg);
      draw.svg(str);
      $('.area').val("");
      return window.f = [];
    });
    $('.property_type').on('change', function(e) {
      if ($(e.target).val() === 'villa') {
        this.region = new Marionette.Region({
          el: '#dynamice-region'
        });
        new AuthoringTool.VillaCtrl({
          region: this.region
        });
      }
      if ($(e.target).val() === 'plot') {
        this.region = new Marionette.Region({
          el: '#dynamice-region'
        });
        return new AuthoringTool.PlotCtrl({
          region: this.region
        });
      }
    });
    return $('.units').on('change', function(e) {
      console.log("aaaaaaaaaaaa");
      return $('.layer').each(function(index, value) {
        if (value.id === $(e.target).val()) {
          $('.info').text('Already assigned');
          $('.alert').removeClass('hidden');
        }
      });
    });
  });

}).call(this);

//# sourceMappingURL=../authoring-tool/svg.authoring.controller.js.map