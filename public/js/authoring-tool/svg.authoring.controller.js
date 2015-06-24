(function() {
  jQuery(document).ready(function($) {
    var keydownFunc;
    $('.svg-canvas').addClass('svg-off');
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
    window.locationMarkerPoints = [window.cx, window.cx];
    window.dropLocationMarker = false;
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
      rawSvg.setAttribute('preserveAspectRatio', '"xMinYMin slice"');
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
      var newUnits, temp, units;
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
      if (value === 'apartment/penthouse') {
        units = apartmentVariantCollection.getApartmentMasterUnits();
        temp = new Backbone.Collection(units);
        newUnits = temp.where({
          'building_id': parseInt(building_id)
        });
        units = newUnits;
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
      $.each(types, function(index, value) {
        var valueText;
        if (svg_type === 'google_earth' && value === 'Project') {
          return;
        }
        if (value === "Apartment") {
          valueText = "Apartment / Penthouse";
        }
        return $('<option />', {
          value: value.toLowerCase(),
          text: value.toUpperCase()
        }).appendTo(select);
      });
      return $('<option />', {
        value: 'unassign',
        text: 'Unassign'.toUpperCase()
      }).appendTo(select);
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
        } else if (type === 'unassign') {

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
    window.iniTooltip = function() {
      return $('.amenity').tooltipster({
        theme: 'tooltipster-shadow',
        contentAsHTML: true,
        onlyOne: true,
        arrow: false,
        offsetX: 50,
        offsetY: -10,
        interactive: true,
        trigger: 'hover'
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
          window.iniTooltip();
          window.generateSvg(window.svgData.data);
          return window.resetCollection();
        },
        error: function(response) {
          return alert('Some problem occurred');
        }
      });
    };
    window.loadSvgPaths = function() {
      var building_name, select, svgCount, svgs;
      select = $('.svgPaths');
      $('<option />', {
        value: "",
        text: "Select Option"
      }).appendTo(select);
      svgs = jQuery.parseJSON(svg_paths);
      svgs = _.omit(svgs, image_id);
      $.each(svgs, function(index, value) {
        if (value === "") {
          return svgs = _.omit(svgs, index);
        }
      });
      svgCount = Object.keys(svgs).length;
      if (svgCount === 0) {
        select.hide();
        $('.duplicate').hide();
        return;
      }
      building_name = buildingMasterCollection.findWhere({
        'id': parseInt(building_id)
      });
      if (parseInt(building_id) !== 0) {
        $.each(svgs, function(index, value) {
          var svg_name, svg_name_arr;
          svg_name_arr = value.split('/');
          svg_name = svg_name_arr[parseInt(svg_name_arr.length) - 1];
          return $('<option />', {
            value: index,
            text: building_name.get('building_name') + '-' + svg_name
          }).appendTo(select);
        });
        return;
      }
      console.log(svgs);
      return $.each(svgs, function(index, value) {
        return $('<option />', {
          value: index,
          text: value
        }).appendTo(select);
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
          window.loadJSONData();
          $('.duplicate').hide();
          if (response.data.length === 0) {
            $('.duplicate').show();
            return window.loadSvgPaths();
          }
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
      var details, locationPoints, myObject, objectType;
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
        if (window.dropLocationMarker === true) {
          locationPoints = window.locationMarkerPoints;
          details['location_marker_x'] = locationPoints[0];
          details['location_marker_y'] = locationPoints[1];
          details['location_marker_class'] = 'marker';
        }
      } else {
        myObject['object_id'] = $('.units').val();
      }
      if (myObject['object_type'] === "amenity") {
        details['title'] = $('#amenity-title').val();
        details['description'] = $('#amenity-description').val();
        details['class'] = $('.property_type').val();
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
          if (svg_type === "google_earth") {
            window.is_project_marked = true;
          }
          window.svgData.data.push(myObject);
          draw.clear();
          types = window.getPendingObjects(window.svgData);
          window.showPendingObjects(types);
          window.generateSvg(window.svgData.data);
          window.resetTool();
          return $('.toggle').bind('click');
        },
        error: function(response) {
          return alert('Some problem occurred');
        }
      });
    };
    window.loadForm = function(type) {
      var propType;
      propType = $('.property_type').val();
      if ((propType === 'project') && window.is_project_marked) {
        $('.submit').attr('disabled', true);
      } else {
        $('.submit').attr('disabled', false);
      }
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
      if (type === 'apartment/penthouse') {
        new AuthoringTool.ApartmentCtrl({
          'region': this.region
        });
      }
      if (type === 'building') {
        new AuthoringTool.BuildingCtrl({
          'region': this.region
        });
      }
      if (type === 'project') {
        new AuthoringTool.ProjectCtrl({
          'region': this.region,
          'property': project_data
        });
      }
      if (type === 'unassign') {
        return $('#dynamice-region').empty();
      }
    };
    window.showDetails = function(elem) {
      var select, type, unit;
      type = $(elem).attr('type');
      if (type !== 'unassign' && type !== 'undetect') {
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
      } else {
        $("form").trigger("reset");
        $('.edit').removeClass('hidden');
        $('.delete').removeClass('hidden');
        $('.submit').addClass('hidden');
        $('.property_type').attr('disabled', false);
        return $('.property_type').val('unassign');
      }
    };
    window.loadProjectForm = function() {
      var propType, region, select;
      if (window.canvas_type === "earthlocationMarker") {
        select = $('.property_type');
        $('<option />', {
          value: 'project',
          text: s.capitalize('project')
        }).appendTo(select);
      }
      $('.property_type').val('project');
      $('.property_type').attr('disabled', true);
      propType = $('.property_type').val();
      if ((propType === 'project') && window.is_project_marked) {
        $('.submit').attr('disabled', true);
      } else {
        $('.submit').attr('disabled', false);
      }
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
      return $('.alert-box').delay(3000).queue(function(next) {
        $(this).hide('fade');
        return next();
      });
    };
    window.buildSvgObjectData = function() {
      var details, locationPoints, myObject, objectType;
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
        if (window.dropLocationMarker === true) {
          locationPoints = window.locationMarkerPoints;
          details['location_marker_x'] = locationPoints[0];
          details['location_marker_y'] = locationPoints[1];
          details['location_marker_class'] = 'marker';
        }
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
      var circle, circle1, circle2, drawMarkerElements, ellipse, groupLocation, groupMarker, polygon;
      drawMarkerElements = [];
      window.markerPoints = [window.cx, window.cy];
      groupLocation = "";
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
            cx: window.cx,
            cy: window.cy
          });
          drawMarkerElements.push(circle);
          break;
        case 'location':
          groupLocation = draw.group();
          groupLocation.attr({
            "class": 'location-marker-grp'
          });
          groupLocation.addClass('marker');
          polygon = draw.polygon('776.906,408.457 821.094,407 798.01,459.243');
          polygon.attr({
            fill: '#F7931E'
          });
          groupLocation.add(polygon);
          ellipse = draw.ellipse(40, 40);
          ellipse.attr({
            'fill': '#FFFFFF',
            'stroke': '#F7931E',
            'stroke-width': 6,
            'stroke-miterlimit': 10,
            cx: 798.696,
            cy: 401.52
          });
          drawDefaultMarker.add(ellipse);
          groupLocation.draggable();
          groupLocation.dragend = function(delta, event) {
            var newDelta;
            newDelta = [delta.x, delta.y];
            return window.locationMarkerPoints = newDelta;
          };
          window.dropLocationMarker = true;
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
      if (window.canvas_type !== 'earthlocationMarker' && svg_type === 'google_earth') {
        $(".property_type").find("option[value='project']").remove();
        $('#dynamice-region').empty();
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
      var id, object, pointList;
      if (e.which === 13) {
        $('#aj-imp-builder-drag-drop canvas').hide();
        $('#aj-imp-builder-drag-drop svg').show();
        object = window.EDITOBJECT;
        id = $(object).attr('svgid');
        $('.layer[svgid="' + id + '"]').hide();
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
      content: '<div id="popOverBox"> <ul class="list-inline"> <li title="Amenities"><div class="marker-elem marker1 concentric-marker"></div></li> <li title="Units"><div class="marker-elem marker2 solid-marker"></div></li> <li class="google-earth-li hidden" title="Project Location"><div class="marker-elem marker3 earth-location-marker"></div></li> </ul> </div>'
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
      } else if ($(currentElem).hasClass('location-marker')) {
        markerType = "location";
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
    $('[rel=\'popover\']').on('click', function(e) {
      var google_earth_li;
      if (svg_type === "google_earth") {
        google_earth_li = $('.google-earth-li').removeClass('hidden');
        return $('.popover-content').css("width", "163px");
      }
    });
    $('.select-polygon').on('click', function(e) {
      e.preventDefault();
      window.EDITMODE = true;
      window.canvas_type = "polygon";
      if (window.canvas_type !== 'earthlocationMarker' && svg_type === 'google_earth') {
        $(".property_type").find("option[value='project']").remove();
        $('#dynamice-region').empty();
      }
      $('#aj-imp-builder-drag-drop canvas').show();
      $('#aj-imp-builder-drag-drop .svg-draw-clear').show();
      $('#aj-imp-builder-drag-drop svg').first().css("position", "absolute");
      $('.edit-box').removeClass('hidden');
      $('.edit').addClass('hidden');
      $('.delete').addClass('hidden');
      $('.submit').removeClass('hidden');
      return $('.property_type').attr('disabled', false);
    });
    $('.select-ellipse').on('click', function(e) {
      e.preventDefault();
      window.EDITMODE = true;
      return window.canvas_type = "ellipse";
    });
    $('svg').on('dblclick', '.polygon-type', function(e) {
      var currentElem, elemId, element, object_type, svgDataObjects;
      e.preventDefault();
      window.EDITOBJECT = e.target;
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
    $('.zoom-in').on('click', function(e) {
      return $('.svg-canvas').removeClass('svg-off');
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
      var propType;
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
      propType = $('.property_type').val();
      if ((propType === "amenity") && ($('#amenity-title').val() === "")) {
        $('.alert').text('Amenity title not entered');
        window.hideAlert();
        return false;
      }
      return window.saveUnit();
    });
    $('.edit').on('click', function(e) {
      var myObject, propType, svgElemId;
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
      propType = $('.property_type').val();
      if ((propType === "amenity") && ($('#amenity-title').val() === "")) {
        $('.alert').text('Amenity title not entered');
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
          var indexToSplice, types;
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
          types = window.getPendingObjects(window.svgData);
          window.showPendingObjects(types);
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
    window.setToggle = function() {
      return $(".toggle").click(function() {
        $(".toggle").toggleClass("expanded");
        return $('.menu').toggleClass('open');
      });
    };
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
      $('.toggle').on('click', window.setToggle());
      draw.each((function(i, children) {
        this.draggable();
        return this.fixed();
      }), true);
      draw.clear();
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
          var bldg, indexToSplice, obj_id_deleted, obj_type, types, unit;
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
            } else if (obj_type === "project") {
              window.is_project_marked = false;
            } else {
              unit = unitMasterCollection.findWhere({
                'id': obj_id_deleted
              });
              unitCollection.add(unit);
            }
          }
          draw.clear();
          window.generateSvg(window.svgData.data);
          types = window.getPendingObjects(window.svgData);
          window.showPendingObjects(types);
          window.resetTool();
          return $(".toggle").bind('click');
        },
        error: function(response) {
          return alert('Some problem occurred');
        }
      });
    });
    $('.btn-publish-svg').on('click', function(e) {
      var data, postUrl, publishSvgOptions, svgExport, viewboxDefault;
      e.preventDefault();
      if (window.EDITMODE === true) {
        $('.alert').text('Please save svg elements before publish');
        window.hideAlert();
        return false;
      }
      viewboxDefault = draw.viewbox();
      draw.viewbox(0, 0, viewboxDefault.width, viewboxDefault.height);
      $('#aj-imp-builder-drag-drop svg').first().css("position", "");
      svgExport = draw.exportSvg({
        exclude: function() {
          return this.data('exclude');
        },
        whitespace: true
      });
      $('#aj-imp-builder-drag-drop svg').first().css("position", "absolute");
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
    $('svg').on('contextmenu', '.polygon-type', function(e) {
      var currentElem, newPoints, pointList;
      e.preventDefault();
      $('.alert').text('Polygon duplicated, drag to position');
      window.hideAlert();
      currentElem = e.currentTarget;
      if (/(^|\s)marker-grp(\s|$)/.test($(currentElem).attr("class"))) {
        return false;
      }
      newPoints = window.addPoints($(e.target).attr('points'));
      window.canvas_type = "polygon";
      pointList = window.polygon.getPointList(f);
      pointList = pointList.join(' ');
      this.polygon = draw.polygon(pointList);
      this.polygon.addClass('polygon-temp');
      this.polygon.data('exclude', true);
      this.polygon.attr('fill', '#CC0000');
      this.polygon.draggable();
      return this.polygon.dragend = (function(_this) {
        return function(delta, event) {
          var canvas, canvasPointsLength, ctx, i, newX, newY, oldPoints, tx, ty;
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
          $('.edit-box').removeClass('hidden');
          $("form").trigger("reset");
          $('.edit').addClass('hidden');
          $('.delete').addClass('hidden');
          $('.submit').removeClass('hidden');
          $('.property_type').attr('disabled', false);
          return drawPoly(window.f);
        };
      })(this);
    });
    window.addPoints = function(points) {
      var newPoints;
      points = points.replace(/\s/g, ',');
      window.f = points.split(',');
      newPoints = [];
      $.each(window.f, function(index, value) {
        return newPoints.push(parseInt(value) + 5);
      });
      return newPoints;
    };
    $('.duplicate').on('click', function(evt) {
      return $('#myModal').modal();
    });
    $('.process').on('click', function(evt) {
      var imageid;
      imageid = $('.svgPaths').val();
      if (imageid === "") {
        $('.alert').text('Select svg');
        window.hideAlert();
        return;
      }
      $('.svg-canvas').hide();
      $('#myModal').modal('hide');
      $('#rotate_loader').removeClass('hidden');
      return $.ajax({
        type: 'GET',
        url: BASEURL + '/admin/project/' + PROJECTID + '/image/' + image_id + '/duplicate_image_id/' + imageid,
        async: false,
        success: function(response) {
          window.svgData['data'] = response.data;
          draw.clear();
          window.generateSvg(window.svgData.data);
          $('#rotate_loader').addClass('hidden');
          $('.svg-canvas').show();
          return $('.duplicate').hide();
        },
        error: function(response) {
          return alert('Some problem occurred');
        }
      });
    });
    return $('.amenity').on('mouseover', function(e) {
      var html;
      window.iniTooltip();
      html = '<div class="row"> <div class="col-sm-12 b-r"> <h4 class="text-warning margin-none">' + $(e.currentTarget).attr('data-amenity-title') + '</h4> <h6 class="text-muted">' + $(e.currentTarget).attr('data-amenity-desc') + '</h6> </div> </div>';
      return $('.amenity').tooltipster('content', html);
    });
  });

}).call(this);

//# sourceMappingURL=../authoring-tool/svg.authoring.controller.js.map