var React = require('react');
var PureRenderMixin = require('react-addons-pure-render-mixin');
var Isvg = require('react-inlinesvg');
var classNames = require('classnames');

var SvgContainer = React.createClass({

    componentDidMount: function(){

      $(document).ready(function(){
      svgDom = $(".svg-area");

      $(svgDom).find("svg .building").attr("class", "in-selection");

      });
     
    },

    svgLoaded: function(buildingToHighlight){
      var highlightedBuildingId = 0 ;
      var highlightedBuildingName = "Loading.." ;

      if(!_.isUndefined(buildingToHighlight)){
        highlightedBuildingId = buildingToHighlight.id;
        highlightedBuildingName = buildingToHighlight.building_name;
      }

      var filteredBuildingIds = [];
      var notAvailableBuildingIds = [];

      buildings = this.props.buildings;


      _.each(buildings,function(building){

          // // find all filtered units
          filteredUnits = building.filteredUnitData;
          availableUnits = building.availableUnitData;
 
          if(availableUnits.length==0){
            notAvailableBuildingIds.push(building.id);
          }
          if(filteredUnits.length>0){
            filteredBuildingIds.push(building.id);
          }

      });

      filteredBuildingIds = _.unique(filteredBuildingIds);
      notAvailableBuildingIds = _.unique(notAvailableBuildingIds);


      svgDom = $(".svg-area");


      // Loop through each building svg element in svg
      $(svgDom).find("svg .building").each(function(ind, item) {
        var id = parseInt(item.id);

        svgElemClassName = 'svg-light building building'+id;

        if(id == highlightedBuildingId)
          svgElemClassName = 'show-qtooltip building building'+id;
        
        // apply filter inselection class 
        if(_.contains(filteredBuildingIds, id)){
          svgElemClassName+=" in-selection";
        }

        if(_.contains(notAvailableBuildingIds, id)){
          svgElemClassName+=" not-in-selection";
        }

        $('.building'+id).attr("class", svgElemClassName);
      });


      

      // apply tooltip only for higlighted building svg
      this.props.showTooltip(highlightedBuildingName);

    },

    render: function(){

      var chosenBreakpoint = this.props.chosenBreakpoint;

      var svgNamePrefix = "master-";

      var svgClasses = classNames(this.props.svgData.svgClasses);

    	var svgUrl= window.baseUrl+'/projects/'+(window.projectId)+'/master/'+svgNamePrefix+''+chosenBreakpoint+'.svg'; //will come based on breakpoint

      // need current highlighted building
      var buildingToHighlight = this.props.buildingToHighlight;
      
        
        return (

                  <div ref= "svgComp" className={svgClasses} >
                  <Isvg src={svgUrl} onLoad={this.svgLoaded.bind(this, buildingToHighlight)}>
	                  Here's some optional content for browsers that don't support XHR or inline
	                  SVGs. You can use other React components here too. Here, I'll show you.

                  </Isvg>  
                  </div>
        );
    }
});

module.exports = SvgContainer;