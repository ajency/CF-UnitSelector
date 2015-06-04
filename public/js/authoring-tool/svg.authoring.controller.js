(function() {
  jQuery(document).ready(function($) {
    var keydownFunc;
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
    window.ellipseWidth = 360;
    window.ellipseHeight = 160;
    window.markerPoints = [window.cx, window.cx];
    window.windowWidth = 0;
    window.EDITMODE = false;
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
      if (svg_type !== "google_earth") {
        draw.image(svgImg).data('exclude', true);
      } else {
        draw.image(svgImg).data('exclude', false);
      }
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
      if (value === 'plot') {
        units = plotVariantCollection.getPlotMasterUnits();
      }
      if (value === 'building') {
        units = buildingMasterCollection.toArray();
      }
      if (value === 'apartment') {
        units = apartmentVariantCollection.getApartmentMasterUnits();
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
        var valueText;
        if (value === "Apartment") {
          valueText = "Apartment / Penthouse";
        }
        return $('<option />', {
          value: value.toLowerCase(),
          text: value.toUpperCase()
        }).appendTo(select);
      });
    };
    window.resetCollection = function() {
      return $('.polygon-type,.marker-grp').each(function(index, value) {
        var bldg, bldgId, type, unit, unitID;
        type = $(value).attr('type');
        if (type === 'building') {
          bldgId = parseInt(value.id);
          bldg = buildingCollection.findWhere({
            'id': bldgId
          });
          return buildingCollection.remove(bldg);
        } else {
          unitID = parseInt(value.id);
          if (unitID !== 0) {
            unit = unitMasterCollection.findWhere({
              'id': parseInt(value.id)
            });
            return unitCollection.remove(unit.get('id'));
          }
        }
      });
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
          return alert('Some problem occurred');
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
          window.svgData['breakpoint_position'] = breakpoint_position;
          window.svgData['svg_type'] = svg_type;
          window.svgData['building_id'] = building_id;
          window.svgData['project_id'] = project_id;
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
      window.EDITMODE = false;
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
      myObject['breakpoint_position'] = window.breakpoint_position;
      if (objectType === "amenity") {
        myObject['object_id'] = 0;
      } else if (objectType === "project") {
        myObject['object_id'] = project_id;
      } else {
        myObject['object_id'] = $('.units').val();
      }
      if (myObject['object_type'] === "amenity") {
        details['title'] = $('#amenity-title').val();
        details['description'] = $('#amenity-description').val();
        details['class'] = 'layer ' + $('.property_type').val();
      } else if (myObject['object_type'] === "project") {
        details['class'] = 'step1-marker';
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
      } else if (window.canvas_type === "earthlocationMarker") {
        myObject['points'] = window.markerPoints;
        myObject['canvas_type'] = 'marker';
        details['cx'] = window.cx;
        details['cy'] = window.cy;
        details['ellipseWidth'] = window.ellipseWidth;
        details['ellipseHeight'] = window.ellipseHeight;
        details['marker_type'] = 'earthlocation';
      } else {
        myObject['points'] = $('.area').val().split(',');
      }
      myObject['other_details'] = details;
      if ($('[name="check_primary"]').is(":checked") === true) {
        myObject['primary_breakpoint'] = window.breakpoint_position;
      }
      return $.ajax({
        type: 'POST',
        headers: {
          'x-csrf-token': $("meta[name='csrf-token']").attr('content')
        },
        url: BASEURL + '/admin/project/' + PROJECTID + '/svg-tool',
        async: false,
        data: $.param(myObject),
        success: function(response) {
          var types;
          myObject['id'] = response.data.id;
          if (response.data.primary_breakpoint !== null) {
            myObject['primary_breakpoint'] = response.data.primary_breakpoint;
          }
          window.svgData.data.push(myObject);
          draw.clear();
          types = window.getPendingObjects(window.svgData);
          window.showPendingObjects(types);
          window.generateSvg(window.svgData.data);
          return window.resetTool();
        },
        error: function(response) {
          return alert('Some problem occurred');
        }
      });
    };
    window.loadForm = function(type) {
      this.region = new Marionette.Region({
        el: '#dynamice-region'
      });
      if (type === 'villa') {
        new AuthoringTool.VillaCtrl({
          region: this.region
        });
      }
      if (type === 'plot') {
        new AuthoringTool.PlotCtrl({
          region: this.region
        });
      }
      if (type === 'amenity') {
        new AuthoringTool.AmenityCtrl({
          region: this.region
        });
      }
      if (type === 'apartment') {
        new AuthoringTool.ApartmentCtrl({
          'region': this.region
        });
      }
      if (type === 'building') {
        return new AuthoringTool.BuildingCtrl({
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
    window.loadProjectForm = function() {
      var region;
      $('.property_type').val('project');
      $('.property_type').attr('disabled', true);
      region = new Marionette.Region({
        el: '#dynamice-region'
      });
      return new AuthoringTool.ProjectCtrl({
        'region': region,
        'property': project_data
      });
    };
    window.hideAlert = function() {
      $('.alert').show();
      return $('.alert-box').delay(1000).queue(function(next) {
        $(this).hide('fade');
        return next();
      });
    };
    window.buildSvgObjectData = function() {
      var details, myObject, objectType;
      myObject = {};
      details = {};
      objectType = $('.property_type').val();
      myObject['image_id'] = IMAGEID;
      myObject['object_type'] = objectType;
      myObject['canvas_type'] = window.canvas_type;
      myObject['breakpoint_position'] = window.breakpoint_position;
      if (objectType === "amenity") {
        myObject['object_id'] = 0;
      } else if (objectType === "project") {
        myObject['object_id'] = project_id;
      } else {
        myObject['object_id'] = $('.units').val();
      }
      if (myObject['object_type'] === "amenity") {
        details['title'] = $('#amenity-title').val();
        details['description'] = $('#amenity-description').val();
        details['class'] = 'layer ' + $('.property_type').val();
      } else if (myObject['object_type'] === "project") {
        details['class'] = 'step1-marker';
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
      } else if (window.canvas_type === "earthlocationMarker") {
        myObject['points'] = window.markerPoints;
        myObject['canvas_type'] = 'marker';
        details['cx'] = window.cx;
        details['cy'] = window.cy;
        details['ellipseWidth'] = window.ellipseWidth;
        details['ellipseHeight'] = window.ellipseHeight;
        details['marker_type'] = 'earthlocation';
      } else {
        myObject['points'] = $('.area').val().split(',');
      }
      myObject['other_details'] = details;
      if ($('[name="check_primary"]').is(":checked") === true) {
        myObject['primary_breakpoint'] = window.breakpoint_position;
      }
      return myObject;
    };
    window.drawDefaultMarker = function(markerType) {
      var circle, circle1, circle2, drawMarkerElements, ellipse, groupMarker, path;
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
            cx: window.cx,
            cy: window.cy
          });
          drawMarkerElements.push(circle);
          break;
        case 'location':
          window.canvas_type = "locationMarker";
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
            cx: window.cx,
            cy: window.cy
          });
          drawMarkerElements.push(circle);
          break;
        case 'earthlocation':
          window.canvas_type = "earthlocationMarker";
          groupMarker.attr({
            "class": 'earth-location-marker-grp'
          });
          groupMarker.addClass('step1-marker');
          ellipse = draw.ellipse(window.ellipseWidth, window.ellipseHeight);
          ellipse.attr({
            'fill': '#FF6700',
            'stroke': '#FF7300',
            'stroke-width': 3,
            'fill-opacity': 0.2,
            'stroke-miterlimit': 10,
            cx: window.cx,
            cy: window.cy
          });
          drawMarkerElements.push(ellipse);
          window.loadProjectForm();
      }
      _.each(drawMarkerElements, (function(_this) {
        return function(markerElement, key) {
          return groupMarker.add(markerElement);
        };
      })(this));
      groupMarker.draggable();
      return groupMarker.dragend = function(delta, event) {
        var markerPts, newX, newY, newpoints, oldX, oldY, tx, ty;
        markerPts = window.markerPoints;
        oldX = markerPts[0];
        oldY = markerPts[1];
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
      $('#aj-imp-builder-drag-drop .svg-draw-clear').hide();
      window.windowWidth = $(window).innerWidth();
      $('canvas').css('width', window.windowWidth);
      $('canvas').css('height', window.windowWidth / 2);
      $('.svg-canvas').css('width', window.windowWidth);
      $('.svg-canvas').css('height', window.windowWidth / 2);
      return document.addEventListener('keydown', keydownFunc, false);
    });
    keydownFunc = function(e) {
      var pointList;
      if (e.which === 13) {
        $('.alert').text('POLYGON IS NOW DRAGGABLE');
        window.hideAlert();
        $('#aj-imp-builder-drag-drop canvas').hide();
        $('#aj-imp-builder-drag-drop svg').show();
        pointList = window.polygon.getPointList(f);
        pointList = pointList.join(' ');
        this.polygon = draw.polygon(pointList);
        this.polygon.addClass('polygon-temp');
        this.polygon.data('exclude', true);
        this.polygon.attr('fill', '#CC0000');
        this.polygon.draggable();
        return this.polygon.dragend = (function(_this) {
          return function(delta, event) {
            var canvas, canvasPointsLength, ctx, i, newPoints, newX, newY, oldPoints, tx, ty;
            tx = delta.x;
            ty = delta.y;
            canvasPointsLength = window.f.length;
            oldPoints = window.f;
            newPoints = [];
            i = 0;
            while (i < canvasPointsLength) {
              newX = parseInt(oldPoints[i]) + tx;
              newY = parseInt(oldPoints[i + 1]) + ty;
              newPoints.push(newX, newY);
              i += 2;
            }
            window.f = newPoints;
            $('.area').val(newPoints.join(','));
            canvas = document.getElementById("c");
            ctx = canvas.getContext("2d");
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            _this.polygon.fixed();
            _this.polygon.remove();
            $('#aj-imp-builder-drag-drop canvas').show();
            $('#aj-imp-builder-drag-drop .svg-draw-clear').show();
            $('#aj-imp-builder-drag-drop svg').first().css("position", "absolute");
            return drawPoly(window.f);
          };
        })(this);
      }
    };
    $(".toggle").click(function() {
      $(this).toggleClass("expanded");
      return $('.menu').toggleClass('open');
    });
    $('[rel=\'popover\']').popover({
      html: 'true',
      content: '<div id="popOverBox"> <ul class="list-inline"> <li><div class="marker-elem marker1 concentric-marker"></div></li> <li><div class="marker-elem marker2 solid-marker"></div></li> <li><div class="marker-elem marker3 earth-location-marker"></div></li> </ul> </div>'
    }).parent().on('click', '#popOverBox .marker-elem', function(evt) {
      var currentElem, markerType;
      window.EDITMODE = true;
      currentElem = evt.currentTarget;
      if ($(currentElem).hasClass('concentric-marker')) {
        markerType = "concentric";
      } else if ($(currentElem).hasClass('solid-marker')) {
        markerType = "solid";
      } else if ($(currentElem).hasClass('earth-location-marker')) {
        markerType = "earthlocation";
      }
      $('#aj-imp-builder-drag-drop canvas').hide();
      $('#aj-imp-builder-drag-drop svg').first().css("position", "relative");
      $('.edit-box').removeClass('hidden');
      $('.edit').addClass('hidden');
      $('.delete').addClass('hidden');
      $('.submit').removeClass('hidden');
      $('.property_type').attr('disabled', false);
      $('[rel=\'popover\']').popover('hide');
      return window.drawDefaultMarker(markerType);
    });
    $('.select-polygon').on('click', function(e) {
      e.preventDefault();
      window.EDITMODE = true;
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
    $('svg').on('dblclick', '.polygon-type', function(e) {
      var currentElem, elemId, element, object_type, svgDataObjects;
      e.preventDefault();
      window.canvas_type = "polygon";
      window.EDITMODE = true;
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
          if (parseInt(elemId) === parseInt(svgDataObject.id)) {
            points = svgDataObject.points;
            $('.area').val(points.join(','));
            drawPoly(points);
            $('.submit').addClass('hidden');
            $('.edit').removeClass('hidden');
            $('.delete').removeClass('hidden');
            if (object_type === "project") {
              window.loadProjectForm();
            } else {
              window.loadForm(object_type);
            }
            if ($(currentElem).data("primary-breakpoint")) {
              $('[name="check_primary"]').prop('checked', true);
            }
            if (object_type === "amenity") {
              $('#amenity-title').val($(currentElem).data("amenity-title"));
              $('#amenity-description').val($(currentElem).data("amenity-desc"));
              $('.property_type').val($(currentElem).attr('type'));
              return $('.property_type').attr('disabled', true);
            } else {
              return window.showDetails(currentElem);
            }
          }
        };
      })(this));
    });
    $('svg').on('dblclick', '.marker-grp', function(e) {
      var currentElem, currentSvgElem, cx, cy, draggableChildCircle, draggableElem, elemId, object_type;
      window.EDITMODE = true;
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
      } else if (draggableElem.hasClass('earthlocation')) {
        window.canvas_type = 'earthlocationMarker';
      }
      draggableElem.dragend = function(delta, event) {
        var markerPts, newX, newY, newpoints, oldX, oldY, tx, ty;
        markerPts = window.markerPoints;
        oldX = markerPts[0];
        oldY = markerPts[1];
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
      if (object_type === "project") {
        window.loadProjectForm();
      } else {
        window.loadForm(object_type);
      }
      if ($(currentElem).data("primary-breakpoint")) {
        $('[name="check_primary"]').prop('checked', true);
      }
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
      var myObject, svgElemId;
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
      myObject = window.buildSvgObjectData();
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
          draw.clear();
          window.generateSvg(window.svgData.data);
          return window.resetTool();
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
      return ctx.clearRect(0, 0, canvas.width, canvas.height);
    });
    $('.closeform').on('click', function(e) {
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
      draw.each((function(i, children) {
        this.draggable();
        return this.fixed();
      }), true);
      window.generateSvg(window.svgData.data);
      return window.EDITMODE = false;
    });
    $('.delete').on('click', function(e) {
      var id, myObject, svgElemId;
      myObject = {};
      myObject['_method'] = 'DELETE';
      id = $('.units').val();
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
          var bldg, indexToSplice, obj_id_deleted, obj_type, unit;
          indexToSplice = -1;
          obj_id_deleted = 0;
          obj_type = "";
          $.each(window.svgData.data, function(index, value) {
            if (parseInt(value.id) === svgElemId) {
              indexToSplice = index;
              obj_id_deleted = parseInt(value.object_id);
              return obj_type = value.object_type;
            }
          });
          window.svgData.data.splice(indexToSplice, 1);
          myObject['id'] = svgElemId;
          if (obj_id_deleted > 0) {
            if (obj_type === "building") {
              bldg = buildingCollection.findWhere({
                'id': obj_id_deleted
              });
              buildingCollection.bldg;
            } else {
              unit = unitMasterCollection.findWhere({
                'id': obj_id_deleted
              });
              unitCollection.add(unit);
            }
          }
          draw.clear();
          window.generateSvg(window.svgData.data);
          return window.resetTool();
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
      draw.viewbox(0, 0, viewboxDefault.width, viewboxDefault.height);
      svgExport = draw.exportSvg({
        exclude: function() {
          return this.data('exclude');
        },
        whitespace: false
      });
      data = {};
      data['data'] = btoa(svgExport);
      data['svg_type'] = window.svgData.svg_type;
      data['breakpoint_position'] = window.breakpoint_position;
      data['building'] = building_id;
      data['imgID'] = IMAGEID;
      draw.viewbox(0, 0, viewboxDefault.width, viewboxDefault.height);
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
      return $.ajax(publishSvgOptions).done((function(_this) {
        return function(resp, textStatus, xhr) {
          $('.alert').text('SVG Published');
          return window.hideAlert();
        };
      })(this)).fail((function(_this) {
        return function(xhr, textStatus, errorThrown) {
          $('.alert').text('Failed to publish SVG');
          return window.hideAlert();
        };
      })(this));
    });
  });

}).call(this);

//# sourceMappingURL=../authoring-tool/svg.authoring.controller.js.map