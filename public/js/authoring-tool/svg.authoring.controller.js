(function() {
  jQuery(document).ready(function($) {
    $('.area').canvasAreaDraw();
    window.draw = SVG('aj-imp-builder-drag-drop');
    window.svgData = {
      'image': '',
      'data': [],
      'supported_types': ['villa', 'plot']
    };
    window.cx = 630.101;
    window.cy = 362.245;
    window.innerRadius = 8.002;
    window.outerRadius = 15.002;
    window.markerPoints = [];
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
        if (value.canvas_type === 'marker') {
          return tag = window.marker.createMarkerTag(value);
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
    window.generateSvg = function(svgData) {
      draw.image(svgImg).data('exclude', true);
      return $.each(svgData, function(index, value) {
        if (value.canvas_type === 'polygon') {
          window.polygon.generatePolygonTag(value);
        }
        if (value.canvas_type === 'marker') {
          return window.marker.generateMarkerTag(value);
        }
      });
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
          'object_type': value.toLowerCase()
        });
        units = window.actualUnits(value.toLowerCase());
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
        units = bunglowVariantCollection.getBunglowMasterUnits();
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
          value: value.toLowerCase(),
          text: value.toUpperCase()
        }).appendTo(select);
      });
    };
    window.resetCollection = function() {
      $('.plot,.villa,.building,.marker-grp').each(function(index, value) {
        var unit, unitID;
        unitID = parseInt(value.id);
        console.log(unitID);
        if (unitID !== 0) {
          unit = unitMasterCollection.findWhere({
            'id': parseInt(value.id)
          });
          return unitCollection.remove(unit.get('id'));
        }
      });
      return console.log(unitCollection);
    };
    window.loadJSONData = function() {
      return $.ajax({
        type: 'GET',
        url: BASERESTURL + '/project/' + PROJECTID + '/step-two',
        async: false,
        success: function(response) {
          var types;
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
          window.generatePropTypes();
          types = window.getPendingObjects(window.svgData);
          window.showPendingObjects(types);
          window.generateSvg(window.svgData.data);
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
    window.renderSVG = function() {
      var canvas, ctx, s, str, types;
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
      $('#aj-imp-builder-drag-drop canvas').hide();
      $('#aj-imp-builder-drag-drop svg').show();
      $('.edit-box').addClass('hidden');
      canvas = document.getElementById("c");
      ctx = canvas.getContext("2d");
      return ctx.clearRect(0, 0, canvas.width, canvas.height);
    };
    window.resetTool = function() {
      var canvas, ctx;
      window.resetCollection();
      $(".toggle").trigger('click');
      $('.area').val("");
      window.f = [];
      $("form").trigger("reset");
      $('#dynamice-region').empty();
      $('#aj-imp-builder-drag-drop canvas').hide();
      $('#aj-imp-builder-drag-drop svg').show();
      $('.edit-box').addClass('hidden');
      canvas = document.getElementById("c");
      ctx = canvas.getContext("2d");
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      return $('#aj-imp-builder-drag-drop svg').first().css("position", "absolute");
    };
    window.saveUnit = function() {
      var details, myObject, objectType;
      myObject = {};
      details = {};
      objectType = $('.property_type').val();
      myObject['image_id'] = IMAGEID;
      myObject['object_type'] = objectType;
      myObject['canvas_type'] = window.canvas_type;
      if (objectType === "amenity") {
        myObject['object_id'] = 0;
      } else {
        myObject['object_id'] = $('.units').val();
      }
      if (myObject['object_type'] === "amenity") {
        details['title'] = $('#amenity-title').val();
        details['description'] = $('#amenity-description').val();
      } else {
        details['class'] = 'layer ' + $('.property_type').val();
      }
      if (window.canvas_type === "concentricMarker") {
        myObject['points'] = window.markerPoints;
        myObject['canvas_type'] = 'marker';
        details['cx'] = window.cx;
        details['cy'] = window.cy;
        details['innerRadius'] = window.innerRadius;
        details['outerRadius'] = window.outerRadius;
        details['marker_type'] = 'concentric';
      } else if (window.canvas_type === "solidMarker") {
        myObject['points'] = window.markerPoints;
        myObject['canvas_type'] = 'marker';
        details['cx'] = window.cx;
        details['cy'] = window.cy;
        details['innerRadius'] = window.innerRadius;
        details['outerRadius'] = window.outerRadius;
        details['marker_type'] = 'solid';
      } else {
        myObject['points'] = $('.area').val().split(',');
      }
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
          window.svgData.data.push(myObject);
          window.resetTool();
          draw.clear();
          return window.generateSvg(window.svgData.data);
        },
        error: function(response) {
          return alert('Some problem occurred');
        }
      });
    };
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
        new AuthoringTool.PlotCtrl({
          region: this.region
        });
      }
      if (type === 'amenity') {
        this.region = new Marionette.Region({
          el: '#dynamice-region'
        });
        return new AuthoringTool.AmenityCtrl({
          'region': this.region
        });
      }
    };
    window.showDetails = function(elem) {
      var select, unit;
      unit = unitMasterCollection.findWhere({
        'id': parseInt(elem.id)
      });
      $('.property_type').val($(elem).attr('type'));
      $('.property_type').attr('disabled', true);
      select = $('.units');
      $('<option />', {
        value: elem.id,
        text: unit.get('unit_name')
      }).appendTo(select);
      $('.units').attr('disabled', true);
      $('.units').val(elem.id);
      return $('.units').show();
    };
    window.hideAlert = function() {
      $('.alert').show();
      return $('.alert-box').delay(1000).queue(function(next) {
        $(this).hide('fade');
        return next();
      });
    };
    window.drawDefaultMarker = function(markerType) {
      var circle, circle1, circle2, drawMarkerElements, groupMarker, path;
      drawMarkerElements = [];
      window.markerPoints = [window.cx, window.cy];
      groupMarker = draw.group();
      switch (markerType) {
        case 'concentric':
          window.canvas_type = "concentricMarker";
          groupMarker.attr({
            "class": 'concentric-marker-grp'
          });
          circle1 = draw.circle(window.innerRadius);
          circle1.attr({
            fill: '#FF8500',
            cx: window.cx,
            cy: window.cy
          });
          circle2 = draw.circle(window.outerRadius);
          circle2.attr({
            fill: 'none',
            cx: window.cx,
            cy: window.cy,
            stroke: "#FF7900",
            'stroke-width': 4,
            'stroke-miterlimit': 10
          });
          drawMarkerElements.push(circle1);
          drawMarkerElements.push(circle2);
          break;
        case 'solid':
          window.canvas_type = "solidMarker";
          groupMarker.attr({
            "class": 'solid-marker-grp'
          });
          circle = draw.circle(15.002);
          circle.attr({
            fill: '#F7931E',
            cx: "630.101",
            cy: "362.245"
          });
          drawMarkerElements.push(circle);
          break;
        case 'location':
          groupMarker.attr({
            "class": 'location-marker-grp'
          });
          path = draw.path('M1087.492,428.966c0,7.208-13.052,24.276-13.052,24.276s-13.052-17.067-13.052-24.276 c0-7.208,5.844-13.051,13.052-13.051S1087.492,421.758,1087.492,428.966z');
          path.attr({
            fill: '#F7931E'
          });
          drawMarkerElements.push(path);
          circle = draw.circle(15.002);
          circle.attr({
            fill: '#FFFFFF',
            cx: "1074.44",
            cy: "427.187"
          });
          drawMarkerElements.push(circle);
      }
      _.each(drawMarkerElements, (function(_this) {
        return function(markerElement, key) {
          return groupMarker.add(markerElement);
        };
      })(this));
      groupMarker.draggable();
      return groupMarker.dragend = function(delta, event) {
        var newX, newY, newpoints, oldX, oldY, tx, ty;
        oldX = window.cx;
        oldY = window.cy;
        tx = delta.x;
        ty = delta.y;
        newX = oldX + tx;
        newY = oldY + ty;
        newpoints = [newX, newY];
        return window.markerPoints = newpoints;
      };
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
    $('[rel=\'popover\']').popover({
      html: 'true',
      content: '<div id="popOverBox"> <ul class="list-inline"> <li><div class="marker-elem marker1 concentric-marker"></div></li> <li><div class="marker-elem marker2 solid-marker"></div></li> <!--li><div class="marker-elem marker3 location-marker"></div></li--> </ul> </div>'
    }).parent().on('click', '#popOverBox .marker-elem', function(evt) {
      var currentElem, markerType;
      currentElem = evt.currentTarget;
      if ($(currentElem).hasClass('concentric-marker')) {
        markerType = "concentric";
      } else if ($(currentElem).hasClass('solid-marker')) {
        markerType = "solid";
      } else if ($(currentElem).hasClass('location-marker')) {
        markerType = "location";
      }
      $('#aj-imp-builder-drag-drop canvas').hide();
      $('#aj-imp-builder-drag-drop svg').first().css("position", "relative");
      $('.edit-box').removeClass('hidden');
      $('[rel=\'popover\']').popover('hide');
      return window.drawDefaultMarker(markerType);
    });
    $('.select-polygon').on('click', function(e) {
      e.preventDefault();
      window.canvas_type = "polygon";
      $('#aj-imp-builder-drag-drop canvas').show();
      $('#aj-imp-builder-drag-drop .svg-draw-clear').show();
      $('#aj-imp-builder-drag-drop svg').first().css("position", "absolute");
      $('.edit-box').removeClass('hidden');
      $('.edit').addClass('hidden');
      $('.delete').addClass('hidden');
      $('.submit').removeClass('hidden');
      return $('.property_type').attr('disabled', false);
    });
    $('svg').on('dblclick', '.villa,.plot', function(e) {
      var currentElem, elemId, element, object_type, svgDataObjects;
      e.preventDefault();
      window.canvas_type = "polygon";
      elemId = $(e.currentTarget).attr('svgid');
      window.currentSvgId = parseInt(elemId);
      $('#aj-imp-builder-drag-drop canvas').show();
      $('#aj-imp-builder-drag-drop .svg-draw-clear').show();
      $('#aj-imp-builder-drag-drop svg').first().css("position", "absolute");
      $('.edit-box').removeClass('hidden');
      currentElem = e.currentTarget;
      element = currentElem.id;
      object_type = $(currentElem).attr('type');
      svgDataObjects = svgData.data;
      return _.each(svgDataObjects, (function(_this) {
        return function(svgDataObject, key) {
          var points;
          if (parseInt(element) === parseInt(svgDataObject.object_id)) {
            points = svgDataObject.points;
            $('.area').val(points.join(','));
            drawPoly(points);
            $('.submit').addClass('hidden');
            $('.edit').removeClass('hidden');
            $('.delete').removeClass('hidden');
            window.loadForm(object_type);
            if (object_type === "amenity") {
              $('#amenity-title').val($(currentElem).data("amenity-title"));
              return $('#amenity-description').val($(currentElem).data("amenity-desc"));
            } else {
              return window.showDetails(currentElem);
            }
          }
        };
      })(this));
    });
    $('svg').on('dblclick', '.marker-grp', function(e) {
      var currentElem, currentSvgElem, cx, cy, draggableChildCircle, draggableElem, elemId, object_type;
      draggableElem = "";
      elemId = $(e.currentTarget).attr('svgid');
      window.currentSvgId = parseInt(elemId);
      currentSvgElem = $(e.currentTarget);
      draw.each((function(i, children) {
        var childId;
        childId = this.attr('svgid');
        if (parseInt(childId) === parseInt(elemId)) {
          this.draggable();
          draggableElem = this;
        }
      }), true);
      draggableChildCircle = draggableElem.first();
      cx = draggableChildCircle.attr('cx');
      cy = draggableChildCircle.attr('cy');
      window.markerPoints = [cx, cy];
      if (draggableElem.hasClass('concentric')) {
        window.canvas_type = 'concentricMarker';
      } else if (draggableElem.hasClass('solid')) {
        window.canvas_type = 'solidMarker';
      }
      draggableElem.dragend = function(delta, event) {
        var newX, newY, newpoints, oldX, oldY, tx, ty;
        oldX = window.cx;
        oldY = window.cy;
        tx = delta.x;
        ty = delta.y;
        newX = oldX + tx;
        newY = oldY + ty;
        newpoints = [newX, newY];
        return window.markerPoints = newpoints;
      };
      currentElem = e.currentTarget;
      $('.edit-box').removeClass('hidden');
      object_type = $(currentElem).attr('type');
      $('.submit').addClass('hidden');
      $('.edit').removeClass('hidden');
      $('.delete').removeClass('hidden');
      window.loadForm(object_type);
      if (object_type === "amenity") {
        $('#amenity-title').val($(currentElem).data("amenity-title"));
        $('#amenity-description').val($(currentElem).data("amenity-desc"));
        $('.property_type').val($(currentElem).attr('type'));
        return $('.property_type').attr('disabled', true);
      } else {
        return window.showDetails(currentElem);
      }
    });
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
      if (($('.area').val() === "") && (window.canvas_type === "polygon")) {
        $('.alert').text('Coordinates not marked');
        window.hideAlert();
        return false;
      }
      if ((window.markerPoints.length < 1) && (window.canvas_type !== "polygon")) {
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
    $('.edit').on('click', function(e) {
      var details, myObject, objectType, svgElemId;
      myObject = {};
      details = {};
      objectType = $('.property_type').val();
      myObject['image_id'] = IMAGEID;
      myObject['object_type'] = objectType;
      myObject['canvas_type'] = window.canvas_type;
      if (objectType === "amenity") {
        myObject['object_id'] = 0;
      } else {
        myObject['object_id'] = $('.units').val();
      }
      if (myObject['object_type'] === "amenity") {
        details['title'] = $('#amenity-title').val();
        details['description'] = $('#amenity-description').val();
      } else {
        details['class'] = 'layer ' + $('.property_type').val();
      }
      if (window.canvas_type === "concentricMarker") {
        myObject['points'] = window.markerPoints;
        myObject['canvas_type'] = 'marker';
        details['cx'] = window.cx;
        details['cy'] = window.cy;
        details['innerRadius'] = window.innerRadius;
        details['outerRadius'] = window.outerRadius;
        details['marker_type'] = 'concentric';
      } else if (window.canvas_type === "solidMarker") {
        myObject['points'] = window.markerPoints;
        myObject['canvas_type'] = 'marker';
        details['cx'] = window.cx;
        details['cy'] = window.cy;
        details['innerRadius'] = window.innerRadius;
        details['outerRadius'] = window.outerRadius;
        details['marker_type'] = 'solid';
      } else {
        myObject['points'] = $('.area').val().split(',');
      }
      myObject['other_details'] = details;
      myObject['_method'] = 'PUT';
      svgElemId = window.currentSvgId;
      return $.ajax({
        type: 'POST',
        headers: {
          'x-csrf-token': $("meta[name='csrf-token']").attr('content')
        },
        url: BASEURL + "/admin/project/" + PROJECTID + "/svg-tool/" + svgElemId,
        async: false,
        data: $.param(myObject),
        success: function(response) {
          var indexToSplice;
          indexToSplice = -1;
          $.each(window.svgData.data, function(index, value) {
            if (parseInt(value.id) === svgElemId) {
              return indexToSplice = index;
            }
          });
          window.svgData.data.splice(indexToSplice, 1);
          myObject['id'] = svgElemId;
          window.svgData.data.push(myObject);
          window.resetTool();
          draw.clear();
          return window.generateSvg(window.svgData.data);
        },
        error: function(response) {
          return alert('Some problem occurred');
        }
      });
    });
    $('.property_type').on('change', function(e) {
      var type;
      type = $(e.target).val();
      return window.loadForm(type);
    });
    $('.clear').on('click', function(e) {
      var canvas, ctx;
      $('.area').val("");
      window.f = [];
      canvas = document.getElementById("c");
      ctx = canvas.getContext("2d");
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      $("form").trigger("reset");
      $(".toggle").trigger('click');
      $('#dynamice-region').empty();
      return $('.edit-box').addClass('hidden');
    });
    $('.close').on('click', function(e) {
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
      $('.edit-box').addClass('hidden');
      return draw.each((function(i, children) {
        this.draggable();
        return this.fixed();
      }), true);
    });
    $('.delete').on('click', function(e) {
      var id, myObject;
      myObject = {};
      myObject['_method'] = 'DELETE';
      id = $('.units').val();
      return $.ajax({
        type: 'POST',
        headers: {
          'x-csrf-token': $("meta[name='csrf-token']").attr('content')
        },
        url: BASEURL + '/admin/project/' + PROJECTID + '/svg-tool/' + id,
        async: false,
        data: $.param(myObject),
        success: function(response) {
          var unit, value;
          value = $('.area').val().split(',');
          $('#Layer_1').remove();
          $.each(window.svgData.data, function(index, value) {
            if (parseInt(value.object_id) === parseInt($('.units').val())) {
              console.log(index);
              return window.svgData.data.splice(index, 1);
            }
          });
          console.log(window.svgData.data);
          window.renderSVG();
          unit = unitMasterCollection.findWhere({
            'id': parseInt(id)
          });
          return unitCollection.add(unit);
        },
        error: function(response) {
          return alert('Some problem occurred');
        }
      });
    });
    return $('.btn-publish-svg').on('click', function(e) {
      var data, postUrl, publishSvgOptions, svgExport, viewboxDefault;
      e.preventDefault();
      viewboxDefault = draw.viewbox();
      draw.viewbox(0, 0, 1600, 800);
      svgExport = draw.exportSvg({
        exclude: function() {
          return this.data('exclude');
        },
        whitespace: true
      });
      data = {};
      data['data'] = btoa(svgExport);
      draw.viewbox(0, 0, viewboxDefault.width, viewboxDefault.height);
      console.log(viewboxDefault.width);
      console.log(viewboxDefault.height);
      postUrl = BASEURL + "/admin/project/" + PROJECTID + "/image/" + IMAGEID + "/downloadSvg";
      publishSvgOptions = {
        type: 'POST',
        url: postUrl,
        headers: {
          'x-csrf-token': $("meta[name='csrf-token']").attr('content')
        },
        data: data,
        async: false
      };
      return $.ajax(publishSvgOptions);
    });
  });

}).call(this);

//# sourceMappingURL=../authoring-tool/svg.authoring.controller.js.map