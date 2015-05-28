(function() {
  jQuery(document).ready(function($) {
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
      supportedTypes = _.uniq(supportedTypes);
      $.each(supportedTypes, function(index, value) {
        var items, marked, units;
        items = collection.where({
          'object_type': value
        });
        units = window.actualUnits(value);
        marked = [];
        $.each(items, function(ind, val) {
          if (!_.isEmpty(val.get('canvas_type'))) {
            return marked.push(val);
          }
        });
        return type.push({
          'name': value,
          'id': value,
          'total': units.length,
          'marked': marked.length
        });
      });
      return type;
    };
    window.actualUnits = function(value) {
      var units;
      units = [];
      if (value === 'villa') {
        units = bunglowVariantCollection.getBunglowUnits();
      }
      return units;
    };
    window.showPendingObjects = function(data) {
      var html, marked, total;
      html = '';
      total = [];
      marked = [];
      $.each(data, function(index, value) {
        total.push(value.total + ' ' + value.name + '(s)');
        return marked.push(value.marked + ' ' + value.name + '(s)');
      });
      html = '<strong class="pull-right total-count">' + total.join(" | ") + '</strong>' + '<strong class="pull-right title-count"> Total:</strong>' + '<strong class="pull-right total-count">' + marked.join(" | ") + '</strong>' + '<strong class="pull-right title-count"> Marked:</strong>';
      console.log(html);
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
      return $.each(types, function(index, value) {
        return $('<option />', {
          value: value,
          text: value.toUpperCase()
        }).appendTo(select);
      });
    };
    window.resetCollection = function() {
      $('.plot,.villa,.building').each(function(index, value) {
        var unit;
        unit = unitCollection.findWhere({
          'id': parseInt(value.id)
        });
        return unitCollection.remove(unit.get('id'));
      });
      return unitCollection;
    };
    window.loadJSONData = function() {
      return $.ajax({
        type: 'GET',
        url: BASERESTURL + '/project/' + PROJECTID + '/step-two',
        async: false,
        success: function(response) {
          var s, str, types;
          response = response.data;
          bunglowVariantCollection.setBunglowVariantAttributes(response.bunglow_variants);
          settings.setSettingsAttributes(response.settings);
          unitTypeCollection.setUnitTypeAttributes(response.unit_types);
          buildingCollection.setBuildingAttributes(response.buildings);
          apartmentVariantCollection.setApartmentVariantAttributes(response.apartment_variants);
          floorLayoutCollection.setFloorLayoutAttributes(response.floor_layout);
          window.propertyTypes = response.property_types;
          plotVariantCollection.setPlotVariantAttributes(response.plot_variants);
          unitCollection.setUnitAttributes(response.units);
          window.createSvg(window.svgData.data);
          window.generatePropTypes();
          types = window.getPendingObjects(window.svgData);
          window.showPendingObjects(types);
          s = new XMLSerializer();
          str = s.serializeToString(rawSvg);
          window.store = draw.svg(str);
          return window.resetCollection();
        },
        error: function(response) {
          this.region = new Marionette.Region({
            el: '#noFound-template'
          });
          return new CommonFloor.ProjectCtrl({
            region: this.region
          });
        }
      });
    };
    window.loadOjectData = function() {
      return $.ajax({
        type: 'GET',
        url: BASEURL + '/admin/project/' + PROJECTID + '/image/' + IMAGEID,
        async: false,
        success: function(response) {
          window.svgData = {};
          window.svgData['image'] = svgImg;
          window.svgData['data'] = response.data;
          window.svgData['supported_types'] = JSON.parse(supported_types);
          return window.loadJSONData();
        },
        error: function(response) {
          return alert('Some problem occurred');
        }
      });
    };
    window.loadOjectData();
    $('#aj-imp-builder-drag-drop canvas').ready(function() {
      $('#aj-imp-builder-drag-drop canvas').hide();
      return $('#aj-imp-builder-drag-drop .svg-draw-clear').hide();
    });
    $(".toggle").click(function() {
      $(this).toggleClass("expanded");
      return $('.menu').toggleClass('open');
    });
    $('.save').on('click', function(e) {
      e.preventDefault();
      window.canvas_type = "polygon";
      $('#aj-imp-builder-drag-drop canvas').show();
      $('#aj-imp-builder-drag-drop .svg-draw-clear').show();
      $('#aj-imp-builder-drag-drop svg').first().css("position", "absolute");
      return $('.edit-box').removeClass('hidden');
    });
    $('svg').on('dblclick', '.villa,.plot', function(e) {
      var classElem, currentElem, element, svgDataObjects;
      e.preventDefault();
      window.canvas_type = "polygon";
      $('#aj-imp-builder-drag-drop canvas').show();
      $('#aj-imp-builder-drag-drop .svg-draw-clear').show();
      $('#aj-imp-builder-drag-drop svg').first().css("position", "absolute");
      $('.edit-box').removeClass('hidden');
      currentElem = e.currentTarget;
      element = currentElem.id;
      classElem = $(currentElem).attr('type');
      svgDataObjects = svgData.data;
      return _.each(svgDataObjects, (function(_this) {
        return function(svgDataObject, key) {
          var collection, points;
          if (parseInt(element) === parseInt(svgDataObject.id)) {
            points = svgDataObject.points;
            $('.area').val(points.join(','));
            collection = new Backbone.Collection(window.svgData.data);
            collection.remove(element);
            window.svgData.data = collection.toArray();
            drawPoly(points);
            window.loadForm(classElem);
            return window.showDetails(currentElem);
          }
        };
      })(this));
    });
    window.saveUnit = function() {
      var details, myObject;
      myObject = {};
      details = {};
      details['class'] = 'layer ' + $('.property_type').val();
      myObject['image_id'] = IMAGEID;
      myObject['object_id'] = $('.units').val();
      myObject['object_type'] = $('.property_type').val();
      myObject['canvas_type'] = window.canvas_type;
      myObject['points'] = $('.area').val().split(',');
      myObject['other_details'] = details;
      return $.ajax({
        type: 'POST',
        headers: {
          'x-csrf-token': $("meta[name='csrf-token']").attr('content')
        },
        url: BASEURL + '/admin/project/' + PROJECTID + '/svg-tool',
        async: false,
        data: $.param(myObject),
        success: function(response) {
          var canvas, childEle, ctx, s, str, types, value;
          value = $('.area').val().split(',');
          window.store.remove();
          details = {};
          details['class'] = 'layer ' + $('.property_type').val();
          childEle = {};
          childEle['id'] = $('.units').val();
          childEle['name'] = $(".units option:selected").text();
          childEle['object_type'] = $('.property_type').val();
          childEle['points'] = value;
          childEle['other_details'] = details;
          childEle['canvas_type'] = window.canvas_type;
          window.svgData.data.push(childEle);
          window.createSvg(window.svgData.data);
          types = window.getPendingObjects(window.svgData);
          window.showPendingObjects(types);
          s = new XMLSerializer();
          str = s.serializeToString(rawSvg);
          draw.svg(str);
          window.resetCollection();
          $('.area').val("");
          window.f = [];
          $("form").trigger("reset");
          $('#dynamice-region').empty();
          $(".toggle").trigger('click');
          $('#aj-imp-builder-drag-drop canvas').hide();
          $('#aj-imp-builder-drag-drop svg').show();
          $('.edit-box').addClass('hidden');
          canvas = document.getElementById("c");
          ctx = canvas.getContext("2d");
          return ctx.clearRect(0, 0, canvas.width, canvas.height);
        },
        error: function(response) {
          return alert('Some problem occurred');
        }
      });
    };
    $('.submit').on('click', function(e) {
      if ($('.property_type').val() === "") {
        $('.alert').text('Unit not assigned');
        window.hideAlert();
        return false;
      }
      if ($('.units').val() === "") {
        $('.alert').text('Unit not assigned');
        window.hideAlert();
        return false;
      }
      if ($('.area').val() === "") {
        $('.alert').text('Coordinates not marked');
        window.hideAlert();
        return false;
      }
      if (window.coord === 1) {
        $('.alert').text('Already assigned');
        window.hideAlert();
        return false;
      }
      return window.saveUnit();
    });
    $('.property_type').on('change', function(e) {
      var type;
      type = $(e.target).val();
      return window.loadForm(type);
    });
    window.loadForm = function(type) {
      if (type === 'villa') {
        this.region = new Marionette.Region({
          el: '#dynamice-region'
        });
        new AuthoringTool.VillaCtrl({
          region: this.region
        });
      }
      if (type === 'plot') {
        this.region = new Marionette.Region({
          el: '#dynamice-region'
        });
        return new AuthoringTool.PlotCtrl({
          region: this.region
        });
      }
    };
    window.showDetails = function(elem) {
      $('.property_type').val($(elem).attr('type'));
      return $('.units').val(elem.id);
    };
    window.hideAlert = function() {
      $('.alert').show();
      return $('.alert-box').delay(1000).queue(function(next) {
        $(this).hide('fade');
        return next();
      });
    };
    $('.clear').on('click', function(e) {
      var canvas, ctx;
      $('.area').val("");
      window.f = [];
      canvas = document.getElementById("c");
      ctx = canvas.getContext("2d");
      return ctx.clearRect(0, 0, canvas.width, canvas.height);
    });
    return $('.close').on('click', function(e) {
      var canvas, ctx;
      $('.area').val("");
      window.f = [];
      canvas = document.getElementById("c");
      ctx = canvas.getContext("2d");
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      $("form").trigger("reset");
      $('#dynamice-region').empty();
      $(".toggle").trigger('click');
      $('#aj-imp-builder-drag-drop canvas').hide();
      $('#aj-imp-builder-drag-drop svg').show();
      return $('.edit-box').addClass('hidden');
    });
  });

}).call(this);

//# sourceMappingURL=../authoring-tool/svg.authoring.controller.js.map