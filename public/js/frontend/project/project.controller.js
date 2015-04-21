(function() {
  var CenterView, LeftView, TopView,
    extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
    hasProp = {}.hasOwnProperty;

  CommonFloor.ProjectLayoutView = (function(superClass) {
    extend(ProjectLayoutView, superClass);

    function ProjectLayoutView() {
      return ProjectLayoutView.__super__.constructor.apply(this, arguments);
    }

    ProjectLayoutView.prototype.template = '#project-template';

    return ProjectLayoutView;

  })(Marionette.LayoutView);

  CommonFloor.ProjectCtrl = (function(superClass) {
    extend(ProjectCtrl, superClass);

    function ProjectCtrl() {
      return ProjectCtrl.__super__.constructor.apply(this, arguments);
    }

    ProjectCtrl.prototype.initialize = function() {
      var id, region;
      id = PROJECTID;
      project.setProjectAttributes(id);
      if (jQuery.isEmptyObject(project.toJSON())) {
        region = new Marionette.Region({
          el: '#noFound-template'
        });
        return this.show(new CommonFloor.NothingFoundView);
      } else {
        return this.show(new CommonFloor.ProjectLayoutView);
      }
    };

    return ProjectCtrl;

  })(Marionette.RegionController);

  TopView = (function(superClass) {
    extend(TopView, superClass);

    function TopView() {
      return TopView.__super__.constructor.apply(this, arguments);
    }

    TopView.prototype.template = Handlebars.compile('<div class="col-md-12 col-xs-12 col-sm-12"> <div class="search-header-wrap"> <h1 class="pull-left">{{i10n "explore"}} {{project_title}}</h1> <!--<div class="pull-right"> <div class="toggle_radio"> <input type="radio" checked class="toggle_option" id="first_toggle" name="toggle_option"> <input type="radio" class="toggle_option" id="second_toggle" name="toggle_option"> <input type="radio" class="toggle_option" id="third_toggle" name="toggle_option"> <label for="first_toggle"><p>Morning</p></label> <label for="second_toggle"><p>Afternoon</p></label> <label for="third_toggle"><p>Evening</p></label> <div class="toggle_option_slider"> </div> </div> </div>--> <div class="clearfix"></div> </div> </div>');

    TopView.prototype.className = 'row';

    return TopView;

  })(Marionette.ItemView);

  CommonFloor.TopCtrl = (function(superClass) {
    extend(TopCtrl, superClass);

    function TopCtrl() {
      return TopCtrl.__super__.constructor.apply(this, arguments);
    }

    TopCtrl.prototype.initialize = function() {
      return this.show(new TopView({
        model: project
      }));
    };

    return TopCtrl;

  })(Marionette.RegionController);

  LeftView = (function(superClass) {
    extend(LeftView, superClass);

    function LeftView() {
      return LeftView.__super__.constructor.apply(this, arguments);
    }

    LeftView.prototype.template = Handlebars.compile('<div class="col-md-3 col-xs-12 col-sm-12 search-left-content"> <div class="filters-wrapper"> <div class="tab-main-container"> <div class="blck-wrap"> <h4><strong>{{i10n "project_by"}}</strong></h4> <img src="{{logo}}" class="img-responsive builder-logo"> </div> <div class="blck-wrap"> <h4><strong>{{i10n "project_details"}}</strong></h4> <div class="proj-details"> {{address}} </div> </div> <div class="detail-pts"> {{#propertyTypes}} <div class="blck-wrap no-hover"> <h4 class="m-b-10 m-t-10 text-primary">{{prop_type}}</h4> <!--  <span>{{i10n "project_type"}}:</span> {{prop_type}} <p> <span>{{i10n "starting_area"}}:</span> {{starting_area}} Sq.Ft. </p>--> <p> <span>{{i10n "unit_types"}}:</span> {{unit_types}} </p> <!--<p> <span>Available:</span> {{#availability}} {{count}}	{{status}} {{/availability}} </p>--> <!--<p> <span>{{i10n "starting_price"}}:</span>  {{starting_price}} </p>--> </div> {{/propertyTypes}} </div> <div class="blck-wrap"> <div class="text-center"> <img src="../images/marker-img.png" class="img-responsive marker-img"> {{i10n "know_your_neighbour"}} </div> </div> </div> </div> </div>');

    LeftView.prototype.serializeData = function() {
      var availability, data, propertyTypes, propertyTypesData;
      data = LeftView.__super__.serializeData.call(this);
      propertyTypesData = this.model.get('project_property_types');
      propertyTypes = this.model.get('property_types');
      propertyTypes = [];
      availability = [];
      $.each(propertyTypesData, function(index, value) {
        $.each(value.availability, function(ind, val) {
          return availability.push({
            'status': s.capitalize(ind),
            'count': val
          });
        });
        return propertyTypes.push({
          'prop_type': s.capitalize(propertyTypes[index]),
          'unit_types': value.unit_types.join(','),
          'starting_area': value.starting_area,
          'starting_price': window.numDifferentiation(value.starting_price),
          'availability': availability
        });
      });
      data.propertyTypes = propertyTypes;
      return data;
    };

    return LeftView;

  })(Marionette.ItemView);

  CommonFloor.LeftCtrl = (function(superClass) {
    extend(LeftCtrl, superClass);

    function LeftCtrl() {
      return LeftCtrl.__super__.constructor.apply(this, arguments);
    }

    LeftCtrl.prototype.initialize = function() {
      return this.show(new LeftView({
        model: project
      }));
    };

    return LeftCtrl;

  })(Marionette.RegionController);

  CenterView = (function(superClass) {
    extend(CenterView, superClass);

    function CenterView() {
      return CenterView.__super__.constructor.apply(this, arguments);
    }

    CenterView.prototype.template = Handlebars.compile('<div class="col-md-9 us-right-content"> <div class="svg-area width="350" height="525" id="prImage-2" title="" alt="" data-nodebug="" data-alwaysprocess="" data-ratio="1.5" data-srcwidth="1920" data-crop="1" data-filters="usm" class="primage fill-width"> </div> </div>');

    CenterView.prototype.events = {
      'click .step1-marker': function(e) {
        return CommonFloor.checkPropertyType();
      }
    };

    CenterView.prototype.onShow = function() {
      var path;
      path = this.model.get('step_one').svg;
      return $('<div></div>').load(path).appendTo('.svg-area');
    };

    return CenterView;

  })(Marionette.ItemView);

  CommonFloor.CenterCtrl = (function(superClass) {
    extend(CenterCtrl, superClass);

    function CenterCtrl() {
      return CenterCtrl.__super__.constructor.apply(this, arguments);
    }

    CenterCtrl.prototype.initialize = function() {
      return this.show(new CenterView({
        model: project
      }));
    };

    return CenterCtrl;

  })(Marionette.RegionController);

}).call(this);

//# sourceMappingURL=../../frontend/project/project.controller.js.map