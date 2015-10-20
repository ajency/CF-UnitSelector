var React = require('react');
var PureRenderMixin = require('react-addons-pure-render-mixin');
var Isvg = require('react-inlinesvg');
var classNames = require('classnames');

var qtipSettings = { // Grab some elements to apply the tooltip to
            content: "Dummy Text",
            show: {
                when: false, // Don't specify a show event
                ready: true // Show the tooltip when ready
            },
            hide: false,
            style: {
                classes: 'qtip-light',
                tip: {
                    corner: 'bottom center',
                    mimic: 'bottom left',
                    border: 1,
                    width: 88,
                    height: 66
                }
            } // Don't specify a hide event
        };

var SvgContainer = React.createClass({

    componentDidMount: function(){

      $(document).ready(function(){
      svgDom = $(".svg-area");

      $(svgDom).find("svg .building").attr("class", "in-selection");

      });
     
    },

    showTooltip: function(propertytype,unitId,text){

        $(".building").qtip("disable");

        if(propertytype=="building"){
          unitTypeClass = ".building"; 
        }
        classname = unitTypeClass+""+unitId;

        qtipSettings['content'] = text;

        $(classname).qtip(qtipSettings);
    },    

    svgLoaded: function(){

      console.log("svg loaded");

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

        svgElemClassName = 'building building'+id;
        
        // apply filter inselection class 
        if(_.contains(filteredBuildingIds, id)){
          svgElemClassName+=" in-selection";
          $('.building'+id).attr("class", svgElemClassName);
        }

        if(_.contains(notAvailableBuildingIds, id)){
          svgElemClassName+=" not-in-selection";
          $('.building'+id).attr("class", svgElemClassName);
        }
      });


      // need current highlighted building
      buildingToHighlight = this.props.buildingToHighlight;

      // apply tooltip only for higlighted building svg
      this.showTooltip("building",buildingToHighlight.id,buildingToHighlight.building_name);



      // svgDom = $(".svg-area");
      // $(svgDom).find("svg .building").attr("class", "in-selection");
    },

    render: function(){

      var chosenBreakpoint = this.props.chosenBreakpoint;

      var svgNamePrefix = "master-";

      var svgClasses = classNames(this.props.svgData.svgClasses);

    	var svgUrl= window.baseUrl+'/projects/'+(window.projectId)+'/master/'+svgNamePrefix+''+chosenBreakpoint+'.svg'; //will come based on breakpoint
        
        return (

                  <div ref= "svgComp" className={svgClasses} >
                  <Isvg src={svgUrl} onLoad={this.svgLoaded}>
	                  Here's some optional content for browsers that don't support XHR or inline
	                  SVGs. You can use other React components here too. Here, I'll show you.

                  </Isvg>  
                  </div>
        );
    }
});

module.exports = SvgContainer;