(function() {
  var CenterUnitView, LeftUnitView, TopUnitView,
    extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
    hasProp = {}.hasOwnProperty;

  CommonFloor.UnitView = (function(superClass) {
    extend(UnitView, superClass);

    function UnitView() {
      return UnitView.__super__.constructor.apply(this, arguments);
    }

    UnitView.prototype.template = '#unit-view-template';

    return UnitView;

  })(Marionette.LayoutView);

  CommonFloor.UnitCtrl = (function(superClass) {
    extend(UnitCtrl, superClass);

    function UnitCtrl() {
      return UnitCtrl.__super__.constructor.apply(this, arguments);
    }

    UnitCtrl.prototype.initialize = function() {
      if (jQuery.isEmptyObject(project.toJSON())) {
        project.setProjectAttributes(PROJECTID);
        CommonFloor.loadJSONData();
      }
      if (bunglowVariantMasterCollection.length === 0 && apartmentVariantMasterCollection.length === 0 && plotVariantMasterCollection.length === 0) {
        return this.show(new CommonFloor.NothingFoundView);
      } else {
        return this.show(new CommonFloor.UnitView);
      }
    };

    return UnitCtrl;

  })(Marionette.RegionController);

  TopUnitView = (function(superClass) {
    extend(TopUnitView, superClass);

    function TopUnitView() {
      return TopUnitView.__super__.constructor.apply(this, arguments);
    }

    TopUnitView.prototype.template = Handlebars.compile('<div class="container-fluid animated fadeIn"> <div class="row"> <div class="col-md-12 col-xs-12 col-sm-12"> <div class="breadcrumb-bar"> <a class="unit_back" href="#"></a> </div> <div class="header-info"> <h2 class="pull-left proj-name">{{project_title}} - {{unit_name}}</h2> </div> <div class="pull-right"> <form action="{{bookingPortalUrl}}" method="POST"> <input type="hidden" value = "{{id}}" name="unit_id"> <button type="submit" class="btn btn-primary cf-btn-primary">Book Now - &#8377; {{unitBookingAmount}}</button> </form> </div> <div class="clearfix"></div> </div> </div> </div>');

    TopUnitView.prototype.ui = {
      unitBack: '.unit_back'
    };

    TopUnitView.prototype.serializeData = function() {
      var data;
      data = TopUnitView.__super__.serializeData.call(this);
      data.project_title = project.get('project_title');
      data.unitBookingAmount = Marionette.getOption(this, 'unitBookingAmount');
      data.bookingPortalUrl = window.bookingPortalUrl;
      return data;
    };

    TopUnitView.prototype.events = function() {
      return {
        'click @ui.unitBack': function(e) {
          var buildingModel, building_id, previousRoute, property, unit, unitType, unitid, url;
          e.preventDefault();
          previousRoute = CommonFloor.router.previous();
          url = Backbone.history.fragment;
          unitid = parseInt(url.split('/')[1]);
          unit = unitCollection.findWhere({
            id: unitid
          });
          unitType = unitTypeMasterCollection.findWhere({
            'id': unit.get('unit_type_id')
          });
          property = window.propertyTypes[unitType.get('property_type_id')];
          if (s.decapitalize(property) === 'penthouse' || s.decapitalize(property) === 'apartments') {
            buildingModel = buildingCollection.findWhere({
              'id': unit.get('building_id')
            });
            building_id = buildingModel.get('id');
            if (Object.keys(buildingModel.get('building_master')).length === 0) {
              return CommonFloor.navigate('/building/' + building_id + '/apartments', true);
            } else {
              return CommonFloor.navigate('/building/' + building_id + '/master-view', true);
            }
          } else {
            if (Object.keys(project.get('project_master')).length === 0) {
              return CommonFloor.navigate('/list-view', true);
            } else {
              return CommonFloor.navigate('/master-view', true);
            }
          }
        }
      };
    };

    return TopUnitView;

  })(Marionette.ItemView);

  CommonFloor.TopUnitCtrl = (function(superClass) {
    extend(TopUnitCtrl, superClass);

    function TopUnitCtrl() {
      return TopUnitCtrl.__super__.constructor.apply(this, arguments);
    }

    TopUnitCtrl.prototype.initialize = function() {
      var bookingAmtOptions, response, unit, unitid, url;
      url = Backbone.history.fragment;
      unitid = parseInt(url.split('/')[1]);
      unit = unitCollection.findWhere({
        id: unitid
      });
      response = window.unit.getUnitDetails(unitid);
      unit.set('type', s.capitalize(response[2]));
      bookingAmtOptions = {
        method: "GET",
        url: BASERESTURL + "/get-booking-amount",
        data: {
          unit_id: unitid
        }
      };
      return $.ajax(bookingAmtOptions).done((function(_this) {
        return function(resp, textStatus, xhr) {
          var unitBookingAmount;
          unitBookingAmount = resp.data;
          return _this.show(new TopUnitView({
            model: unit,
            unitBookingAmount: unitBookingAmount
          }));
        };
      })(this));
    };

    return TopUnitCtrl;

  })(Marionette.RegionController);

  LeftUnitView = (function(superClass) {
    extend(LeftUnitView, superClass);

    function LeftUnitView() {
      return LeftUnitView.__super__.constructor.apply(this, arguments);
    }

    LeftUnitView.prototype.template = Handlebars.compile('<div class="col-md-4 col-lg-3 col-xs-12 col-sm-12 search-left-content animated fadeIn"> <div class="unit-details"> <div class="row detail-list"> <div class="col-sm-6 col-xs-6 text-center"> <span class="facts-icon icon-total-units"></span> <div class="unit-label m-t-10"> <h3>{{unit_variant}}</h3> <h6 class="text-muted">Unit Variant</h6> </div> </div> <div class="col-sm-6 col-xs-6 text-center"> <span class="facts-icon icon-BHKtype"></span> <div class="unit-label m-t-10"> <h3>{{type}}</h3> <h6 class="text-muted">Unit Type</h6> </div> </div> </div> <div class="row detail-list"> <div class="col-sm-6 col-xs-6 text-center"> <span class="facts-icon icon-BHK-area-2"></span> <div class="unit-label m-t-10"> <h3>{{area}} {{measurement_units}}</h3> <h6 class="text-muted">Area</h6> </div> </div> <div class="col-sm-6 col-xs-6 text-center"> <span class="facts-icon icon-rupee-icn"></span> <div class="unit-label m-t-10"> <h3 class="price">{{price}}</h3> <h6 class="text-muted">Price</h6> </div> </div> </div> <div class="advncd-filter-wrp"> <div class="blck-wrap title-row"> <h5 class="bold property {{classname}}">{{property_type}}</h5> </div> {{#attributes}} <div class="row"> <div class="col-sm-12"> <h6><span class="text-muted">{{attribute}}:</span> {{value}}</h6> </div> </div> {{/attributes}} </div> <div class=" title-row"> <div class="panel-group" id="accordion" role="tablist" aria-multiselectable="true"> {{#levels}} <div class="panel panel-default"> <div class="panel-heading" role="tab" id="headingTwo"> <a class="accordion-toggle collapsed text-primary panel-title m-b-5 block" data-toggle="collapse" data-parent="#accordion" href="#{{id}}" aria-expanded="false" > <h4 class="inline-block"> {{level_name}} </h4> </a> </div> <div id="{{id}}" class="panel-collapse collapse collapseLevel" role="tabpanel" aria-labelledby="headingTwo"> <div class="panel-body"> {{#rooms}} <div class="room-attr"> <div class="m-b-15"> <h5 class="m-b-5">{{room_name}}</h5> {{#attributes}} <div class=""><span>{{attribute}}</span>: {{value}}</div> {{/attributes}} </div> </div> {{/rooms}} </div> </div> </div> {{/levels}} </div> </div> </div> <div class="clearfix"></div> <div class="similar-section"> <h5 class="bold m-b-15">{{similarUnitsText}}</h5> {{#similarUnits}} <div class="m-b-15 clearfix"> <div class="sim-icon"> <div class="alert "> <i class="{{type}}-ico"></i> </div> </div> <div class="sim-details"> <h5><a href="' + BASEURL + '/project/' + PROJECTID + '/#unit-view/{{id}}">{{unit_name}}</a> </h5> {{unit_type}} ({{area}} {{units}})<br> {{variant}}<br> <span class="text-primary"><span class="icon-rupee-icn"></span>{{price}}</span> </div> </div> {{/similarUnits}} </div> </div> </div>');

    LeftUnitView.prototype.serializeData = function() {
      var attributes, data, floor, response, similarUnits, temp, unit, unitid, url;
      data = LeftUnitView.__super__.serializeData.call(this);
      url = Backbone.history.fragment;
      unitid = parseInt(url.split('/')[1]);
      response = window.unit.getUnitDetails(unitid);
      unit = unitCollection.findWhere({
        id: unitid
      });
      floor = response[0].get('floor');
      attributes = [];
      if (response[2] === 'apartment' || response[2] === 'Penthouse') {
        attributes.push({
          'attribute': 'Floor',
          'value': unit.get('floor')
        });
      }
      if (response[4] !== null) {
        $.each(response[4], function(index, value) {
          return attributes.push({
            'attribute': s.capitalize(index),
            'value': value
          });
        });
      }
      similarUnits = this.getSimilarUnits(unit);
      temp = [];
      $.each(similarUnits[0], function(index, value) {
        var res;
        res = window.unit.getUnitDetails(value.get('id'));
        return temp.push({
          'unit_name': value.get('unit_name'),
          'unit_type': res[1].get('name'),
          'price': window.numDifferentiation(res[3]),
          'area': res[0].get('super_built_up_area'),
          'variant': res[0].get('unit_variant_name'),
          'id': value.get('id'),
          'type': similarUnits[2],
          'units': project.get('measurement_units')
        });
      });
      data.area = response[0].get('super_built_up_area');
      data.type = response[1].get('name');
      data.unit_variant = response[0].get('unit_variant_name');
      data.levels = this.generateLevels(floor, response, unit);
      data.attributes = attributes;
      data.similarUnits = temp;
      data.similarUnitsText = similarUnits[1];
      data.measurement_units = project.get('measurement_units');
      data.property_type = s.capitalize(response[2] + ' Attribute(s)');
      data.classname = 'hidden';
      data.unitSellingAmount = Marionette.getOption(this, 'unitSellingAmount');
      if (attributes.length !== 0) {
        data.classname = '';
      }
      return data;
    };

    LeftUnitView.prototype.getSimilarUnits = function(unit) {
      var i, text, unitColl, unitModel, unitid, units, unitsArr, url;
      units = [];
      i = 0;
      url = Backbone.history.fragment;
      unitid = parseInt(url.split('/')[1]);
      unitModel = unitMasterCollection.findWhere({
        'id': unitid
      });
      unitColl = CommonFloor.getUnitsProperty(unitModel);
      unitsArr = unitColl[0];
      text = unitColl[1];
      $.each(unitsArr.toArray(), function(index, value) {
        if (value.id !== unitid) {
          units.push(value);
          i++;
        }
        if (i === 3) {
          return false;
        }
      });
      if (unitsArr.length === 1) {
        text = '';
      }
      return [units, text, unitColl[2]];
    };

    LeftUnitView.prototype.generateLevels = function(floor, response, unit) {
      var levels;
      levels = [];
      $.each(floor, function(index, value) {
        var level_id, level_name, rooms;
        rooms = [];
        level_name = 'Level  ' + index;
        if (response[2] === 'apartment') {
          level_name = 'Room details';
        }
        $.each(value.rooms_data, function(ind, val) {
          var attributes;
          attributes = [];
          return $.each(val.atributes, function(ind_att, val_att) {
            if (val_att.attribute_value !== "") {
              attributes.push({
                'attribute': s.capitalize(val_att.attribute_key),
                'value': val_att.attribute_value
              });
            }
            if (attributes.length > 0) {
              return rooms.push({
                'room_name': val.room_name,
                'attributes': attributes
              });
            }
          });
        });
        level_id = s.replaceAll(level_name, " ", "_");
        return levels.push({
          'level_name': level_name,
          'rooms': rooms,
          'id': level_id
        });
      });
      return levels;
    };

    LeftUnitView.prototype.onShow = function() {
      var response, unitSellingAmount, unitid, url;
      url = Backbone.history.fragment;
      unitid = parseInt(url.split('/')[1]);
      response = window.unit.getUnitDetails(unitid);
      unitSellingAmount = Marionette.getOption(this, 'unitSellingAmount');
      unitSellingAmount = parseInt(unitSellingAmount);
      $('.price').text(window.numDifferentiation(unitSellingAmount));
      if (response[2] === 'apartment') {
        return $('.collapseLevel').collapse('show');
      }
    };

    return LeftUnitView;

  })(Marionette.ItemView);

  CommonFloor.LeftUnitCtrl = (function(superClass) {
    extend(LeftUnitCtrl, superClass);

    function LeftUnitCtrl() {
      return LeftUnitCtrl.__super__.constructor.apply(this, arguments);
    }

    LeftUnitCtrl.prototype.initialize = function() {
      var sellingAmtOptions, unitid, url;
      url = Backbone.history.fragment;
      unitid = parseInt(url.split('/')[1]);
      sellingAmtOptions = {
        method: "GET",
        url: BASERESTURL + "/get-selling-amount",
        data: {
          unit_id: unitid
        }
      };
      return $.ajax(sellingAmtOptions).done((function(_this) {
        return function(resp, textStatus, xhr) {
          var unitSellingAmount;
          unitSellingAmount = resp.data;
          return _this.show(new LeftUnitView({
            unitSellingAmount: unitSellingAmount
          }));
        };
      })(this));
    };

    return LeftUnitCtrl;

  })(Marionette.RegionController);

  CenterUnitView = (function(superClass) {
    extend(CenterUnitView, superClass);

    function CenterUnitView() {
      return CenterUnitView.__super__.constructor.apply(this, arguments);
    }

    CenterUnitView.prototype.template = Handlebars.compile('<div class="col-md-8 col-lg-9 col-sm-12 col-xs-12 us-right-content single-unit unit-slides animated fadeIn"> <div class=""> <div class="liquid-slider slider" id="slider-id"> <div class="ls-wrapper ls-responsive"> <div class="ls-nav"> <ul> <li class="external "> <h4 class="title">External 3D</h4> </li> <li class="twoD"> <h4 class="title">2D Layout</h4> </li> <li class="threeD"> <h4 class="title">3D Layout</h4> </li> <li class="gallery"> <h4 class="title">Gallery</h4> </li> <li class="master hidden"> <h4 class="title">Position</h4> </li> <li class="booking"> <h4 class="title">Payment Plan</h4> </li> </ul> </div> <div class="price-mode-dropdown hidden"> <div class="plan-select form-inline"> <!--h5 class="inline-block">Payment Plan: </h5--> <select class="form-control" id="paymentplan"> <option value="payment_plan_breakdown"> Payment Plan Breakdown </option> <option value="price_breakup"> Price Breakup </option> </select> </div> <div class="plan-amount text-right"> <h5 class="inline-block">Total Sale Value: </h5> <h4 class="inline-block bold text-primary"><span class="rec" data-d-group="2" data-m-dec=""><span class="icon-rupee-icn"></span> {{totalSaleValue}}</span></h4> </div> <div class="clearfix"></div> </div> </div> <div class="liquid-slider slider"> <div class="panel-wrapper"> <div class="level "> <img class="firstimage animated fadeIn img-responsive" src=""/> <div class="images animated fadeIn text-center"> </div> </div> </div> </div> <div class="single-unit"> <div class="prev"></div> <div class="next"></div> </div> </div> </div> </div>');

    CenterUnitView.prototype.ui = {
      imagesContainer: '.us-right-content'
    };

    CenterUnitView.prototype.serializeData = function() {
      var data, unitPaymentPlan;
      data = CenterUnitView.__super__.serializeData.call(this);
      unitPaymentPlan = Marionette.getOption(this, 'unitPaymentPlan');
      data.totalSaleValue = unitPaymentPlan.total_sale_value;
      return data;
    };

    CenterUnitView.prototype.events = {
      'click .threeD': function(e) {
        var html, response;
        $('.firstimage').hide();
        $('.images').empty();
        response = this.generateLevels();
        html = '';
        $.each(response[1], function(index, value) {
          return html += '<div class="layouts animated fadeIn"> <a class="fancybox" rel="3d" href="' + value + '" title="' + s.replaceAll(response[2][index], "_", " ") + '"> <img class="img" data-src="' + value + '" /> <div class="img-overlay"></div> <span>' + s.replaceAll(response[2][index], "_", " ") + '</span> </a> </div>';
        });
        $('.images').html(html);
        $('.img').lazyLoadXT({
          forceLoad: true,
          updateEvent: 'load',
          oncomplete: function() {
            $('.img').removeClass("lazy-hidden");
            return $('.img').addClass("lazy-loaded");
          }
        });
        $('.threeD').addClass('current');
        $('.external').removeClass('current');
        $('.twoD').removeClass('current');
        $('.gallery').removeClass('current');
        $('.master').removeClass('current');
        return $('.booking').removeClass('current');
      },
      'click .twoD': function(e) {
        var html, response;
        $('.firstimage').hide();
        $('.images').empty();
        response = this.generateLevels();
        html = '';
        $.each(response[0], function(index, value) {
          return html += '<div class="layouts animated fadeIn"> <a class="fancybox" rel="2d" href="' + value + '" title="' + s.replaceAll(response[2][index], "_", " ") + '"> <img class="img" data-src="' + value + '" /> <div class="img-overlay"></div> <span>' + s.replaceAll(response[2][index], "_", " ") + '</span> </a> </div>';
        });
        $('.images').html(html);
        $('.img').lazyLoadXT({
          forceLoad: true,
          updateEvent: 'load',
          oncomplete: function() {
            $('.img').removeClass("lazy-hidden");
            return $('.img').addClass("lazy-loaded");
          }
        });
        $('.twoD').addClass('current');
        $('.external').removeClass('current');
        $('.threeD').removeClass('current');
        $('.gallery').removeClass('current');
        $('.master').removeClass('current');
        return $('.booking').removeClass('current');
      },
      'click .external': function(e) {
        var html, response;
        $('.firstimage').hide();
        $('.images').empty();
        response = this.generateLevels();
        html = '';
        html += '<div class="external-wrapper"> <div id="rotate_loader" class="img-loader"> <div class="square" ></div> <div class="square"></div> <div class="square last"></div> <div class="square clear"></div> <div class="square"></div> <div class="square last"></div> <div class="square clear"></div> <div class="square "></div> <div class="square last"></div> </div> <div class="animated fadeIn hidden external-container"> <img class="img-responsive external-img" src="' + response[3].get('external3durl') + '" /> </div> </div>';
        $('.images').html(html);
        $('#rotate_loader').removeClass('hidden');
        $('.external-img').load(function() {
          $('#rotate_loader').addClass('hidden');
          return $('.external-container').removeClass('hidden');
        });
        $('.external').addClass('current');
        $('.threeD').removeClass('current');
        $('.twoD').removeClass('current');
        $('.gallery').removeClass('current');
        $('.master').removeClass('current');
        return $('.booking').removeClass('current');
      },
      'click .gallery': function(e) {
        var html, response;
        $('.images').empty();
        $('.firstimage').hide();
        response = this.generateLevels();
        html = '';
        $.each(response[3].get('galleryurl'), function(index, value) {
          return html += '<div class="animated fadeIn gallery-img"> <a class="fancybox" rel="gall" href="' + value + '"> <img class="img" data-src="' + value + '" /> </a> </div>';
        });
        $('.images').html(html);
        $('.img').lazyLoadXT({
          forceLoad: true,
          updateEvent: 'load',
          oncomplete: function() {
            $('.img').removeClass("lazy-hidden");
            return $('.img').addClass("lazy-loaded");
          }
        });
        $('.gallery').addClass('current');
        $('.threeD').removeClass('current');
        $('.twoD').removeClass('current');
        $('.external').removeClass('current');
        $('.master').removeClass('current');
        return $('.booking').removeClass('current');
      },
      'click .master': function(e) {
        $('.price-mode-dropdown').addClass('hidden');
        $('.firstimage').show();
        $('.images').empty();
        this.loadMaster();
        $('.master').addClass('current');
        $('.gallery').removeClass('current');
        $('.threeD').removeClass('current');
        $('.twoD').removeClass('current');
        $('.external').removeClass('current');
        return $('.booking').removeClass('current');
      },
      'change #paymentplan': function(e) {
        var html, selectedMode, unitPaymentPlan, unitPlanMilestones, unitPriceSheet, unitPriceSheetComponents, unitTotalSaleValue;
        unitPaymentPlan = Marionette.getOption(this, 'unitPaymentPlan');
        unitTotalSaleValue = unitPaymentPlan.total_sale_value;
        selectedMode = $('#paymentplan').val();
        $('.price-mode-dropdown').removeClass('hidden');
        unitPaymentPlan = Marionette.getOption(this, 'unitPaymentPlan');
        unitPlanMilestones = unitPaymentPlan.milestones;
        unitTotalSaleValue = unitPaymentPlan.total_sale_value;
        unitPriceSheet = Marionette.getOption(this, 'unitPriceSheet');
        unitPriceSheetComponents = unitPriceSheet.components;
        $('.images').empty();
        $('.firstimage').hide();
        html = '';
        html += '<div class="invoice-items animated fadeIn"> <ul id="paymentTable">';
        if (selectedMode === "payment_plan_breakdown") {
          _.each(unitPlanMilestones, function(milestone, key) {
            var perc;
            perc = window.calculatePerc(milestone.amount, unitTotalSaleValue);
            return html += '<li class="milestonePercent"> <span class="msPercent">' + perc + '%</span> </li> <li class="milestoneList"> <div class="msName">' + milestone.milestone + '</div> <div class="msVal"> <div> <span class="label">Cost Type:</span> <span class= "percentageValue10 label"  data-d-group= "2" data-m-dec=""> ' + milestone.cost_type + '</span> </div> <div> <span class="label">Due Date:</span> <span class= "service10 label"  data-d-group="2" data-m-dec=""> ' + milestone.milestone_date + '</span> </div> <div> Total Amount: <span class="total10" data-d-group="2" data-m-dec=""><span class="icon-rupee-icn"></span> ' + milestone.amount + '</span> </div> </div><span class="barBg" style="width:' + perc + '%"></span> </li> <div class="clearfix"></div>';
          });
        } else if (selectedMode === "price_breakup") {
          _.each(unitPriceSheetComponents, function(component, key) {
            var perc;
            perc = window.calculatePerc(component.amount, unitTotalSaleValue);
            return html += '<li class="milestonePercent"> <span class="msPercent">' + perc + '%</span> </li> <li class="milestoneList"> <div class="msName">' + component.component_price_type + '</div> <div class="msVal"> <div> <span class="label">Cost Type:</span> <span class= "percentageValue10 label"  data-d-group= "2" data-m-dec=""> ' + component.cost_type + '</span> </div> <div> <span class="label">Sub Type:</span> <span class= "service10 label"  data-d-group="2" data-m-dec=""> ' + component.component_price_sub_type + '</span> </div> <div> Total Amount: <span class="total10" data-d-group="2" data-m-dec=""><span class="icon-rupee-icn"></span> ' + component.amount + '</span> </div> </div><span class="barBg" style="width:' + perc + '%"></span> </li> <div class="clearfix"></div>';
          });
        }
        html += '</ul> </div>';
        return $('.images').html(html);
      },
      'click .booking': function(e) {
        var html, unitPaymentPlan, unitPlanMilestones, unitPriceSheet, unitPriceSheetComponents, unitTotalSaleValue;
        $('#paymentplan option[value="payment_plan_breakdown"]').attr('selected', 'selected');
        $('.price-mode-dropdown').removeClass('hidden');
        unitPaymentPlan = Marionette.getOption(this, 'unitPaymentPlan');
        unitPlanMilestones = unitPaymentPlan.milestones;
        unitTotalSaleValue = unitPaymentPlan.total_sale_value;
        unitPriceSheet = Marionette.getOption(this, 'unitPriceSheet');
        unitPriceSheetComponents = unitPriceSheet.components;
        $('.images').empty();
        $('.firstimage').hide();
        html = '';
        html += '<div class="invoice-items animated fadeIn"> <ul id="paymentTable">';
        _.each(unitPlanMilestones, function(milestone, key) {
          var perc;
          perc = window.calculatePerc(milestone.amount, unitTotalSaleValue);
          return html += '<li class="milestonePercent"> <span class="msPercent">' + perc + '%</span> </li> <li class="milestoneList"> <div class="msName">' + milestone.milestone + '</div> <div class="msVal"> <div> <span class="label">Cost Type:</span> <span class= "percentageValue10 label"  data-d-group= "2" data-m-dec=""> ' + milestone.cost_type + '</span> </div> <div> <span class="label">Due Date:</span> <span class= "service10 label"  data-d-group="2" data-m-dec=""> ' + milestone.milestone_date + '</span> </div> <div> Total Amount: <span class="total10" data-d-group="2" data-m-dec=""><span class="icon-rupee-icn"></span> ' + milestone.amount + '</span> </div> </div><span class="barBg" style="width:' + perc + '%"></span> </li> <div class="clearfix"></div>';
        });
        html += '</ul> </div>';
        $('.images').html(html);
        $('.booking').addClass('current');
        $('.master').removeClass('current');
        $('.gallery').removeClass('current');
        $('.threeD').removeClass('current');
        $('.twoD').removeClass('current');
        return $('.external').removeClass('current');
      },
      'mouseover .next,.prev': function(e) {
        var html, id, response, unitColl, unitModel;
        id = parseInt($(e.target).attr('data-id'));
        unitModel = unitCollection.findWhere({
          'id': id
        });
        response = window.unit.getUnitDetails(id);
        unitColl = CommonFloor.getUnitsProperty(unitModel);
        html = '<div class="svg-info"> <i class="' + unitColl[2] + '-ico"></i> <h5 class=" m-t-0">' + unitModel.get('unit_name') + '</h5> <div class="details"> <span>' + response[1].get('name') + '</span></br> <div class="text-primary"><span class="text-primary facts-icon icon-rupee-icn"></span>' + window.numDifferentiation(response[3]) + '</div> <!--<div>Area: <span>' + response[0].get('super_built_up_area') + ' ' + project.get('measurement_units') + '</span></div> <div>Variant: <span>' + response[0].get('unit_variant_name') + '</span></div>--> </div> </div>';
        return $(e.target).tooltipster('content', html);
      },
      'click .next,.prev': function(e) {
        var id, unitModel;
        id = parseInt($(e.target).attr('data-id'));
        unitModel = unitCollection.findWhere({
          'id': id
        });
        CommonFloor.navigate('/unit-view/' + id, true);
        return CommonFloor.router.storeRoute();
      }
    };

    CenterUnitView.prototype.onShow = function() {
      var flag, height, html, response;
      flag = 0;
      this.getNextPrevUnit();
      response = this.generateLevels();
      html = '';
      $.each(response[0], function(index, value) {
        flag = 1;
        return html += '<div class="layouts animated fadeIn"> <a class="fancybox" href="' + value + '"> <img class="img" data-src="' + value + '" /> <div class="img-overlay"></div> <span>' + s.replaceAll(response[2][index], "_", " ") + '</span> </a> </div>';
      });
      $('.twoD').addClass('current');
      $('.threeD').removeClass('current');
      $('.external').removeClass('current');
      $('.gallery').removeClass('current');
      if (response[0].length === 0) {
        flag = 1;
        $.each(response[1], function(index, value) {
          return html += '<img data-src="' + value + '" /><span>' + s.replaceAll(response[2][index], "_", " ") + '</span>';
        });
        $('.threeD').addClass('current');
        $('.external').removeClass('current');
        $('.twoD').removeClass('current');
        $('.gallery').removeClass('current');
      }
      $('.images').html(html);
      $('.level').attr('class', 'level Level_0 ' + _.last(response[2]));
      if (response[4] === 'apartment') {
        $('.level').attr('class', 'level Level_0 apartment_level');
      }
      if (!_.isUndefined(response[3].get('external3durl'))) {
        flag = 1;
        html = '<div class="external-wrapper"> <div id="rotate_loader" class="img-loader"> <div class="square" ></div> <div class="square"></div> <div class="square last"></div> <div class="square clear"></div> <div class="square"></div> <div class="square last"></div> <div class="square clear"></div> <div class="square "></div> <div class="square last"></div> </div> <div class="animated fadeIn hidden external-container"> <img class=" img-responsive external-img"  src="' + response[3].get('external3durl') + '" /> </div> </div>';
        $('.images').html(html);
        $('.external').addClass('current');
        $('.threeD').removeClass('current');
        $('.twoD').removeClass('current');
        $('.gallery').removeClass('current');
      }
      if (response[0].length === 0) {
        $('.twoD').hide();
      }
      if (response[1].length === 0) {
        $('.threeD').hide();
      }
      if (_.isUndefined(response[3].get('external3durl'))) {
        $('.external').hide();
      }
      if (_.isUndefined(response[3].get('galleryurl'))) {
        $('.gallery').hide();
      }
      if (response[0].length === 0 && response[1].length === 0 && _.isUndefined(response[3].get('external3durl'))) {
        $('.gallery').addClass('current');
        $('.threeD').removeClass('current');
        $('.twoD').removeClass('current');
        $('.external').removeClass('current');
        flag = 1;
        if (!_.isUndefined(response[3].get('galleryurl'))) {
          $.each(response[3].get('galleryurl'), function(index, value) {
            return html += '<div class="animated fadeIn"><img class="img" data-src="' + value + '" /></div>';
          });
        }
      }
      if (response[0].length === 0 && response[1].length === 0 && _.isUndefined(response[3].get('external3durl')) && _.isUndefined(response[3].get('galleryurl'))) {
        this.loadMaster();
        flag = 1;
        $('.master').addClass('current');
        $('.gallery').removeClass('current');
        $('.threeD').removeClass('current');
        $('.twoD').removeClass('current');
        $('.external').removeClass('current');
      }
      height = this.ui.imagesContainer.height();
      if ($(window).width() > 991) {
        $('.unit-details').mCustomScrollbar({
          theme: 'cf-scroll'
        });
      }
      $('.images').html(html);
      $('.external-img').load(function() {
        $('#rotate_loader').addClass('hidden');
        return $('.external-container').removeClass('hidden');
      });
      if (flag === 0) {
        console.log("add Booking markup");
        html = '<div class="invoice-items animated fadeIn"> <div class="row"> <div class="col-sm-5 form-inline m-b-20"> <h5 class="inline-block">Payment Plan: </h5><select class="form-control" id="paymentplans"> <option value="3363"> Payment Plan </option> <option value="3364"> Price Breakdown </option> </select> </div> <div class="col-sm-7 text-right"> <h5 class="inline-block">Booking Amount: </h5> <h4 class="inline-block bold text-primary"><span class="rec" data-d-group="2" data-m-dec=""><span class="icon-rupee-icn"></span> 3,53,952</span></h4> </div> </div> <ul id="paymentTable"> <li style="list-style: none"><span class="msPercent">4.5%</span></li> <li class="milestoneList milestoneReached"> <div class="msName"> Application </div> <div class="msVal discCol"> <div> <span class="label">Amount:</span> <span class= "percentageValue0 label"  data-d-group="2" data-m-dec=""><span class="icon-rupee-icn"></span> 3,43,343</span> </div> <div> <span class="label">Service Tax:</span> <span class= "service0 label"  data-d-group="2" data-m-dec=""><span class="icon-rupee-icn"></span> 10,609</span> </div> <div> Total: <span class="total0"  data-d-group= "2" data-m-dec=""><span class="icon-rupee-icn"></span> 3,53,952</span> </div> </div> <div class="msVal"> <div> <span class="label">Amount:</span> <span class= "percentageValue10 label"  data-d-group= "2" data-m-dec=""><span class="icon-rupee-icn"></span> 3,43,343</span> </div> <div> <span class="label">Service Tax:</span> <span class= "service10 label"  data-d-group="2" data-m-dec=""><span class="icon-rupee-icn"></span> 10,609</span> </div> <div> Total: <span class="total10" data-d-group="2" data-m-dec=""><span class="icon-rupee-icn"></span> 3,53,952</span> </div> </div><span class="barBg" style="width:4.5%"></span> </li> <li style="list-style: none; display: inline"> <div class="clearfix"></div><span class="msPercent">26%</span> </li> <li class="milestoneList"> <div class="msName"> Plinth </div> <div class="msVal discCol"> <div> <span class="label">Amount:</span> <span class= "percentageValue1 label"  data-d-group="2" data-m-dec=""><span class="icon-rupee-icn"></span> 19,83,761</span> </div> <div> <span class="label">Service Tax:</span> <span class= "service1 label"  data-d-group="2" data-m-dec=""><span class="icon-rupee-icn"></span> 61,298</span> </div> <div> Total: <span class="total1"  data-d-group= "2" data-m-dec=""><span class="icon-rupee-icn"></span> 20,45,059</span> </div> </div> <div class="msVal"> <div> <span class="label">Amount:</span> <span class= "percentageValue11 label"  data-d-group= "2" data-m-dec=""><span class="icon-rupee-icn"></span> 19,83,761</span> </div> <div> <span class="label">Service Tax:</span> <span class= "service11 label"  data-d-group="2" data-m-dec=""><span class="icon-rupee-icn"></span> 61,298</span> </div> <div> Total: <span class="total11" data-d-group="2" data-m-dec=""><span class="icon-rupee-icn"></span> 20,45,059</span> </div> </div><span class="barBg" style="width:26%"></span> </li> <li style="list-style: none; display: inline"> <div class="clearfix"></div><span class="msPercent">11%</span> </li> <li class="milestoneList"> <div class="msName"> 1st Slab </div> <div class="msVal discCol"> <div> <span class="label">Amount:</span> <span class= "percentageValue2 label"  data-d-group="2" data-m-dec=""><span class="icon-rupee-icn"></span> 8,39,284</span> </div> <div> <span class="label">Service Tax:</span> <span class= "service2 label"  data-d-group="2" data-m-dec=""><span class="icon-rupee-icn"></span> 25,934</span> </div> <div> Total: <span class="total2"  data-d-group= "2" data-m-dec=""><span class="icon-rupee-icn"></span> 8,65,218</span> </div> </div> <div class="msVal"> <div> <span class="label">Amount:</span> <span class= "percentageValue12 label"  data-d-group= "2" data-m-dec=""><span class="icon-rupee-icn"></span> 8,39,284</span> </div> <div> <span class="label">Service Tax:</span> <span class= "service12 label"  data-d-group="2" data-m-dec=""><span class="icon-rupee-icn"></span> 25,934</span> </div> <div> Total: <span class="total12" data-d-group="2" data-m-dec=""><span class="icon-rupee-icn"></span> 8,65,218</span> </div> </div><span class="barBg" style="width:11%"></span> </li> <li style="list-style: none; display: inline"> <div class="clearfix"></div><span class="msPercent">11%</span> </li> <li class="milestoneList"> <div class="msName"> 3rd Slab </div> <div class="msVal discCol"> <div> <span class="label">Amount:</span> <span class= "percentageValue3 label"  data-d-group="2" data-m-dec=""><span class="icon-rupee-icn"></span> 8,39,284</span> </div> <div> <span class="label">Service Tax:</span> <span class= "service3 label"  data-d-group="2" data-m-dec=""><span class="icon-rupee-icn"></span> 25,934</span> </div> <div> Total: <span class="total3"  data-d-group= "2" data-m-dec=""><span class="icon-rupee-icn"></span> 8,65,218</span> </div> </div> <div class="msVal"> <div> <span class="label">Amount:</span> <span class= "percentageValue13 label"  data-d-group= "2" data-m-dec=""><span class="icon-rupee-icn"></span> 8,39,284</span> </div> <div> <span class="label">Service Tax:</span> <span class= "service13 label"  data-d-group="2" data-m-dec=""><span class="icon-rupee-icn"></span> 25,934</span> </div> <div> Total: <span class="total13" data-d-group="2" data-m-dec=""><span class="icon-rupee-icn"></span> 8,65,218</span> </div> </div><span class="barBg" style="width:11%"></span> </li> <li style="list-style: none; display: inline"> <div class="clearfix"></div><span class="msPercent">11%</span> </li> <li class="milestoneList"> <div class="msName"> 5th Slab </div> <div class="msVal discCol"> <div> <span class="label">Amount:</span> <span class= "percentageValue4 label"  data-d-group="2" data-m-dec=""><span class="icon-rupee-icn"></span> 8,39,284</span> </div> <div> <span class="label">Service Tax:</span> <span class= "service4 label"  data-d-group="2" data-m-dec=""><span class="icon-rupee-icn"></span> 25,934</span> </div> <div> Total: <span class="total4"  data-d-group= "2" data-m-dec=""><span class="icon-rupee-icn"></span> 8,65,218</span> </div> </div> <div class="msVal"> <div> <span class="label">Amount:</span> <span class= "percentageValue14 label"  data-d-group= "2" data-m-dec=""><span class="icon-rupee-icn"></span> 8,39,284</span> </div> <div> <span class="label">Service Tax:</span> <span class= "service14 label"  data-d-group="2" data-m-dec=""><span class="icon-rupee-icn"></span> 25,934</span> </div> <div> Total: <span class="total14" data-d-group="2" data-m-dec=""><span class="icon-rupee-icn"></span> 8,65,218</span> </div> </div><span class="barBg" style="width:11%"></span> </li> <li style="list-style: none; display: inline"> <div class="clearfix"></div><span class="msPercent">11%</span> </li> <li class="milestoneList"> <div class="msName"> 7th Slab </div> <div class="msVal discCol"> <div> <span class="label">Amount:</span> <span class= "percentageValue5 label"  data-d-group="2" data-m-dec=""><span class="icon-rupee-icn"></span> 8,39,284</span> </div> <div> <span class="label">Service Tax:</span> <span class= "service5 label"  data-d-group="2" data-m-dec=""><span class="icon-rupee-icn"></span> 25,934</span> </div> <div> Total: <span class="total5"  data-d-group= "2" data-m-dec=""><span class="icon-rupee-icn"></span> 8,65,218</span> </div> </div> <div class="msVal"> <div> <span class="label">Amount:</span> <span class= "percentageValue15 label"  data-d-group= "2" data-m-dec=""><span class="icon-rupee-icn"></span> 8,39,284</span> </div> <div> <span class="label">Service Tax:</span> <span class= "service15 label"  data-d-group="2" data-m-dec=""><span class="icon-rupee-icn"></span> 25,934</span> </div> <div> Total: <span class="total15" data-d-group="2" data-m-dec=""><span class="icon-rupee-icn"></span> 8,65,218</span> </div> </div><span class="barBg" style="width:11%"></span> </li> <li style="list-style: none; display: inline"> <div class="clearfix"></div><span class="msPercent">10.5%</span> </li> <li class="milestoneList"> <div class="msName"> 9th Slab </div> <div class="msVal discCol"> <div> <span class="label">Amount:</span> <span class= "percentageValue6 label"  data-d-group="2" data-m-dec=""><span class="icon-rupee-icn"></span> 8,01,134</span> </div> <div> <span class="label">Service Tax:</span> <span class= "service6 label"  data-d-group="2" data-m-dec=""><span class="icon-rupee-icn"></span> 24,755</span> </div> <div> Total: <span class="total6"  data-d-group= "2" data-m-dec=""><span class="icon-rupee-icn"></span> 8,25,889</span> </div> </div> <div class="msVal"> <div> <span class="label">Amount:</span> <span class= "percentageValue16 label"  data-d-group= "2" data-m-dec=""><span class="icon-rupee-icn"></span> 8,01,134</span> </div> <div> <span class="label">Service Tax:</span> <span class= "service16 label"  data-d-group="2" data-m-dec=""><span class="icon-rupee-icn"></span> 24,755</span> </div> <div> Total: <span class="total16" data-d-group="2" data-m-dec=""><span class="icon-rupee-icn"></span> 8,25,889</span> </div> </div><span class="barBg" style="width:10.5%"></span> </li> <li style="list-style: none; display: inline"> <div class="clearfix"></div><span class="msPercent">5%</span> </li> <li class="milestoneList"> <div class="msName"> Brick Work </div> <div class="msVal discCol"> <div> <span class="label">Amount:</span> <span class= "percentageValue7 label"  data-d-group="2" data-m-dec=""><span class="icon-rupee-icn"></span> 3,81,493</span> </div> <div> <span class="label">Service Tax:</span> <span class= "service7 label"  data-d-group="2" data-m-dec=""><span class="icon-rupee-icn"></span> 11,788</span> </div> <div> Total: <span class="total7"  data-d-group= "2" data-m-dec=""><span class="icon-rupee-icn"></span> 3,93,281</span> </div> </div> <div class="msVal"> <div> <span class="label">Amount:</span> <span class= "percentageValue17 label"  data-d-group= "2" data-m-dec=""><span class="icon-rupee-icn"></span> 3,81,493</span> </div> <div> <span class="label">Service Tax:</span> <span class= "service17 label"  data-d-group="2" data-m-dec=""><span class="icon-rupee-icn"></span> 11,788</span> </div> <div> Total: <span class="total17" data-d-group="2" data-m-dec=""><span class="icon-rupee-icn"></span> 3,93,281</span> </div> </div><span class="barBg" style="width:5%"></span> </li> <li style="list-style: none; display: inline"> <div class="clearfix"></div><span class="msPercent">5%</span> </li> <li class="milestoneList"> <div class="msName"> Flooring </div> <div class="msVal discCol"> <div> <span class="label">Amount:</span> <span class= "percentageValue8 label"  data-d-group="2" data-m-dec=""><span class="icon-rupee-icn"></span> 3,81,493</span> </div> <div> <span class="label">Service Tax:</span> <span class= "service8 label"  data-d-group="2" data-m-dec=""><span class="icon-rupee-icn"></span> 11,788</span> </div> <div> Total: <span class="total8"  data-d-group= "2" data-m-dec=""><span class="icon-rupee-icn"></span> 3,93,281</span> </div> </div> <div class="msVal"> <div> <span class="label">Amount:</span> <span class= "percentageValue18 label"  data-d-group= "2" data-m-dec=""><span class="icon-rupee-icn"></span> 3,81,493</span> </div> <div> <span class="label">Service Tax:</span> <span class= "service18 label"  data-d-group="2" data-m-dec=""><span class="icon-rupee-icn"></span> 11,788</span> </div> <div> Total: <span class="total18" data-d-group="2" data-m-dec=""><span class="icon-rupee-icn"></span> 3,93,281</span> </div> </div><span class="barBg" style="width:5%"></span> </li> <li style="list-style: none; display: inline"> <div class="clearfix"></div><span class="msPercent">5%</span> </li> <li class="milestoneList"> <div class="msName"> Possession </div> <div class="msVal discCol"> <div> <span class="label">Amount:</span> <span class= "percentageValue9 label"  data-d-group="2" data-m-dec=""><span class="icon-rupee-icn"></span> 3,81,493</span> </div> <div> <span class="label">Service Tax:</span> <span class= "service9 label"  data-d-group="2" data-m-dec=""><span class="icon-rupee-icn"></span> 11,788</span> </div> <div> Total: <span class="total9"  data-d-group= "2" data-m-dec=""><span class="icon-rupee-icn"></span> 3,93,281</span> </div> </div> <div class="msVal"> <div> <span class="label">Amount:</span> <span class= "percentageValue19 label"  data-d-group= "2" data-m-dec=""><span class="icon-rupee-icn"></span> 3,81,493</span> </div> <div> <span class="label">Service Tax:</span> <span class= "service19 label"  data-d-group="2" data-m-dec=""><span class="icon-rupee-icn"></span> 11,788</span> </div> <div> Total: <span class="total19" data-d-group="2" data-m-dec=""><span class="icon-rupee-icn"></span> 3,93,281</span> </div> </div><span class="barBg" style="width:5%"></span> </li> <li style="list-style: none; display: inline"> <div class="clearfix"></div> </li> </ul> </div>';
      }
      $(".fancybox").fancybox();
      $('.img').lazyLoadXT({
        updateEvent: 'load',
        oncomplete: function() {
          $('.img').removeClass("lazy-hidden");
          return $('.img').addClass("lazy-loaded");
        }
      });
      return this.iniTooltip();
    };

    CenterUnitView.prototype.loadMaster = function() {
      var breakpoints, building, first, id, response, svgs, transitionImages, unit, url;
      $('.master').removeClass('hidden');
      url = Backbone.history.fragment;
      id = url.split('/')[1];
      unit = unitCollection.findWhere({
        'id': parseInt(id)
      });
      response = window.unit.getUnitDetails(id);
      building = buildingCollection.findWhere({
        'id': parseInt(unit.get('building_id'))
      });
      if (response[2] === 'apartment' || response[2] === 'Penthouse') {
        transitionImages = [];
        svgs = {};
        breakpoints = building.get('breakpoints');
        $.each(breakpoints, function(index, value) {
          return svgs[value] = BASEURL + '/projects/' + PROJECTID + '/buildings/' + unit.get('building_id') + '/master-' + value + '.svg';
        });
        $.merge(transitionImages, building.get('building_master'));
        first = _.values(svgs);
        if (building.get('building_master').length !== 0) {
          $('.firstimage').attr('src', transitionImages[breakpoints[0]]);
          $('.firstimage').load(function() {
            return $('.images').load(first[0], function() {
              $('.apartment,.amenity').each(function(ind, item) {
                var itemid;
                itemid = parseInt(item.id);
                return $('#' + itemid).attr('class', "no-fill");
              });
              return $('#' + id).attr('class', 'layer svg_active');
            });
          });
        }
        if (building.get('building_master').length === 0) {
          $('.master').hide();
        }
        return;
      }
      svgs = [];
      breakpoints = project.get('breakpoints');
      $.each(breakpoints, function(index, value) {
        return svgs[value] = BASEURL + '/projects/' + PROJECTID + '/master/master-' + value + '.svg';
      });
      first = _.values(svgs);
      transitionImages = [];
      $.merge(transitionImages, project.get('project_master'));
      if (project.get('project_master').length !== 0) {
        $('.firstimage').attr('src', transitionImages[breakpoints[0]]);
        $('.firstimage').load(function() {
          return $('.images').load(first[0], function() {
            $('.villa,.plot,.building,.amenity').each(function(ind, item) {
              var itemid;
              itemid = parseInt(item.id);
              return $('#' + itemid).attr('class', "no-fill");
            });
            return $('#' + id).attr('class', 'layer svg_active');
          });
        });
      }
      if (project.get('project_master').length === 0) {
        return $('.master').hide();
      }
    };

    CenterUnitView.prototype.iniTooltip = function() {
      $('.next').tooltipster({
        theme: 'tooltipster-shadow circle-tooltip',
        contentAsHTML: true,
        onlyOne: true,
        arrow: false,
        interactive: true,
        trigger: 'hover',
        position: 'left',
        delay: 50
      });
      return $('.prev').tooltipster({
        theme: 'tooltipster-shadow circle-tooltip',
        contentAsHTML: true,
        onlyOne: true,
        arrow: false,
        interactive: true,
        trigger: 'hover',
        position: 'right',
        delay: 50
      });
    };

    CenterUnitView.prototype.generateLevels = function() {
      var floor, i, level, response, threeD, twoD, unitD, unitid, url;
      url = Backbone.history.fragment;
      unitid = parseInt(url.split('/')[1]);
      response = window.unit.getUnitDetails(unitid);
      twoD = [];
      threeD = [];
      level = [];
      floor = response[0].get('floor');
      i = 0;
      unitD = unitCollection.findWhere({
        id: unitid
      });
      $.each(floor, function(index, value) {
        var level_name;
        if (!_.isUndefined(value.url2dlayout_image) && value.url2dlayout_image !== "") {
          twoD.push(value.url2dlayout_image);
        }
        if (!_.isUndefined(value.url3dlayout_image) && value.url3dlayout_image !== "") {
          threeD.push(value.url3dlayout_image);
        }
        level_name = 'Level  ' + index;
        if (response[2] === 'apartment') {
          level.push("");
        } else {
          level.push(s.replaceAll('Level ' + i, " ", "_"));
        }
        return i = i + 1;
      });
      return [twoD, threeD, level, response[0], response[2]];
    };

    CenterUnitView.prototype.getNextPrevUnit = function() {
      var next, prev, unitModel, unitid, url;
      url = Backbone.history.fragment;
      unitid = parseInt(url.split('/')[1]);
      unitModel = unitCollection.findWhere({
        'id': unitid
      });
      CommonFloor.getUnitsProperty(unitModel);
      window.tempColl.setRecord(unitModel);
      next = tempColl.next();
      if (_.isUndefined(next)) {
        $('.next').hide();
      } else {
        $('.next').attr('data-id', next.get('id'));
      }
      prev = tempColl.prev();
      if (_.isUndefined(prev)) {
        return $('.prev').hide();
      } else {
        return $('.prev').attr('data-id', prev.get('id'));
      }
    };

    return CenterUnitView;

  })(Marionette.ItemView);

  CommonFloor.CenterUnitCtrl = (function(superClass) {
    extend(CenterUnitCtrl, superClass);

    function CenterUnitCtrl() {
      return CenterUnitCtrl.__super__.constructor.apply(this, arguments);
    }

    CenterUnitCtrl.prototype.initialize = function() {
      var unitPaymentPlan, unitPriceSheet, unitPriceSheetAjx, unitid, url;
      url = Backbone.history.fragment;
      unitid = parseInt(url.split('/')[1]);
      unitPaymentPlan = {
        method: "GET",
        url: BASERESTURL + "/get-unit-payment-plan",
        data: {
          unit_id: unitid
        }
      };
      unitPriceSheet = {
        method: "GET",
        url: BASERESTURL + "/get-unit-price-sheet",
        data: {
          unit_id: unitid
        }
      };
      unitPriceSheetAjx = $.ajax(unitPriceSheet);
      unitPaymentPlan = $.ajax(unitPaymentPlan);
      return $.when(unitPaymentPlan, unitPriceSheetAjx).done((function(_this) {
        return function(paymentPlanResp, priceSheetResp) {
          if (!paymentPlanResp) {
            unitPaymentPlan = paymentPlanResp[0]['data'];
          } else {
            unitPaymentPlan = {
              'total_sale_value': 2444444,
              'milestones': {
                '1': {
                  'amount': '2200000',
                  'milestone_date': '2015-05-31',
                  'cost_type': 'Lumpsump',
                  'entered_value': '2200000',
                  'milestone': 'test -1 '
                },
                '2': {
                  'amount': 244444,
                  'milestone_date': '2015-07-31',
                  'cost_type': 'Basic Percentage',
                  'entered_value': '10',
                  'milestone': 'test 2'
                }
              }
            };
          }
          if (!priceSheetResp) {
            unitPriceSheet = priceSheetResp[0]['data'];
          } else {
            unitPriceSheet = {
              'total_sale_value': 3437500,
              'components': {
                '1': {
                  'amount': '2250000',
                  'component_price_sub_type': 'SBA',
                  'cost_type': 'Per sqft',
                  'entered_value': '2500',
                  'component_price_type': 'test 1'
                },
                'u4h852': {
                  'amount': '250000',
                  'component_price_sub_type': '',
                  'cost_type': 'Lumpsump',
                  'entered_value': '250000',
                  'component_price_type': 'test 2'
                },
                'fcmdbj': {
                  'amount': '250000',
                  'component_price_sub_type': '',
                  'cost_type': 'Lumpsump',
                  'entered_value': '250000',
                  'component_price_type': 'test 3'
                },
                'ug9r8r': {
                  'amount': '687500',
                  'component_price_sub_type': '',
                  'cost_type': 'Basic Percentage',
                  'entered_value': '20',
                  'component_price_type': 'test 4'
                }
              }
            };
          }
          return _this.show(new CenterUnitView({
            unitPaymentPlan: unitPaymentPlan,
            unitPriceSheet: unitPriceSheet
          }));
        };
      })(this));
    };

    return CenterUnitCtrl;

  })(Marionette.RegionController);

}).call(this);

//# sourceMappingURL=../../frontend/unit-view/unit.controller.js.map