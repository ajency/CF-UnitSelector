var React = require('react');
var PureRenderMixin = require('react-addons-pure-render-mixin');
var Isvg = require('react-inlinesvg');
var classNames = require('classnames');
var Router = require('react-router-component');

var SvgContainer = React.createClass({


    mixins: [Router.NavigatableMixin],

    applyGroupSpecificClasses : function(){
        var apartmentIdsToMark;
        var svgDom = $(".svg-area");
        var buildings = this.props.buildings;
        
        this.props.panToZoomedGroup();
        
        cardListForId = parseInt(this.props.cardListForId);

        apartmentIdsToMark = _.pluck(buildings,'id');

        // loop through each apartment class and remove apartment class for all those ids which do not belong to apartmentidstomark
        $(svgDom).find(".apartment").each(function(ind, item) {

                var svgElemClassName;
                var id = parseInt(item.id);

                var exisitngClasses = "";
                var selector= '.apartment'+id;

                existingClasses = $(selector).attr("class"); 


                if(!_.contains(apartmentIdsToMark,id)){
                    // if selected floor group then apply border
                    svgElemClassName = 'svg-light disabled-floor-group';
                    $(selector).attr("class", svgElemClassName);
                }

                

        });  

        // if there are any unassigned classes then apply disabled class for them
        $(svgDom).find(".unassign").each(function(ind, item) {

                var svgElemClassName;
                var id = parseInt(item.id);

                var exisitngClasses = "";
                var selector= '.unassign'+id;

                svgElemClassName = 'svg-light disabled-floor-group';


                $(selector).attr("class", svgElemClassName);

        });   

        $(svgDom).find(".floor_group").each(function(ind, item) {

                var svgElemClassName;
                var id = parseInt(item.id);

                var exisitngClasses = "";
                var selector= '.floor_group'+id;

                existingClasses = $(selector).attr("class"); 


                if(id === cardListForId){
                    // if selected floor group then apply border
                    svgElemClassName = existingClasses+' svg-light step2-svg';
                }
                else{
                    // if not selected floor group then dont apply border, just diable the group
                    svgElemClassName = existingClasses+' svg-light disabled-floor-group';   
                }

                $(selector).attr("class", svgElemClassName);

        });                

    },

    applyNotLiveBuildingClasses : function(){
        var svgDom = $(".svg-area");
        var notLiveBuildings = this.props.not_live_buildings;

        notLiveBuildingsIdsToMark = _.pluck(notLiveBuildings,'id');


        $(svgDom).find(".building").each(function(ind, item) {

                var svgElemClassName;
                var id = parseInt(item.id);

                var exisitngClasses = "";
                var selector= '.building'+id;

                existingClasses = $(selector).attr("class"); 


                if(_.contains(notLiveBuildingsIdsToMark,id)){
                    // if selected floor group then apply border
                    svgElemClassName = existingClasses+' svg-light not-in-selection';
                    $(selector).attr("class", svgElemClassName);
                }

               

        });         
    },

    svgLoaded: function(buildingToHighlight,cardListFor){
        var highlightedBuildingId = 0 ;
        var highlightedBuildingName = "Loading.." ;
        var highlightedBuildingSelector = "";

        var imageType = this.props.imageType;

        var svgDom = $(".svg-area");

        var isFilterApplied = this.props.isFilterApplied;

        // on load of svg rest apply svg filter check to avoid continuous reload of svg file
        if(this.props.applyFiltersSvgCheck){
            this.props.updatefiltersSvgCheck(false);
        }
        

        if(!_.isUndefined(buildingToHighlight)){
            highlightedBuildingId = buildingToHighlight.id;
            highlightedBuildingName = buildingToHighlight.building_name;
        }

        if(cardListFor==="group"){
            this.applyGroupSpecificClasses();            
        }

        notLiveBuildings = this.props.notLiveBuildings;   
        if((cardListFor==="master")&&(notLiveBuildings.length>0)){
            this.applyNotLiveBuildingClasses();   
        }        

        var filteredBuildingIds = [];
        var notAvailableBuildingIds = [];
        var notFilteredBuildingIds = [];

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
              if(isFilterApplied&&filteredUnits.length==0){
                notFilteredBuildingIds.push(building.id);
              }

        });

        filteredBuildingIds = _.unique(filteredBuildingIds);
        notAvailableBuildingIds = _.unique(notAvailableBuildingIds);
        notFilteredBuildingIds = _.unique(notFilteredBuildingIds);

        notInSelectionBuilding = [];
        if(isFilterApplied){
            notInSelectionBuilding = notFilteredBuildingIds;
        }else{
            notInSelectionBuilding = notAvailableBuildingIds;   
        }

        var svgSelector= "";

        if(imageType === "master"){
            svgSelector = "svg .building";
        }else if(imageType === "buildingFloorGrps"){
            svgSelector = "svg .floor_group";
        }else{
            svgSelector = "svg .apartment";    
        }      


      // Loop through each building svg element in svg
        $(svgDom).find(svgSelector).each(function(ind, item) {

            var svgElemClassName;
            var id = parseInt(item.id);

            var exisitngClasses = "";
            var selector= "";

            if(imageType === "master"){
              selector = '.building'+id;
            }else if(imageType === "buildingFloorGrps"){
              selector = '.floor_group'+id;  
            }else{
              selector = '.apartment'+id;
            }

            existingClasses = $(selector).attr("class"); 


            if(imageType==="master"){
                svgElemClassName = existingClasses;
            }else{
                svgElemClassName = existingClasses+' step2-svg';
            }
            


            if(id == highlightedBuildingId){
              highlightedBuildingSelector = selector;  
              svgElemClassName = svgElemClassName+' svg-light show-qtooltip';
            }
            
            // apply filter inselection class 
            if(_.contains(filteredBuildingIds, id)){
              svgElemClassName+=" in-selection";
            }

            if(_.contains(notInSelectionBuilding, id)){
              svgElemClassName+=" not-in-selection";
            }

            $(selector).attr("class", svgElemClassName);

        });


      

        // apply tooltip only for higlighted building svg
        this.props.showTooltip(highlightedBuildingName,highlightedBuildingSelector);

        var classNameToSelect = ".building";

        if(imageType === "master"){
            classNameToSelect = ".building";
        }
        else if(imageType === "buildingFloorGrps"){
            classNameToSelect = '.floor_group';  
        }
        else{
            classNameToSelect = '.apartment';
        }

        // on mouse hover of building apply tooltip
        $(classNameToSelect).mouseover(function(e){
            var that = this;
            id = parseInt(e.currentTarget.id);
            $('.cardOuter').mCustomScrollbar("scrollTo",'#building'+id);

            // update building to highlight
            that.props.updateUnitIndexToHighlight(id);
        }.bind(this));

        // on mouse click of building apply tooltip
        $(classNameToSelect).click(function(e){
            var that = this;
            id = parseInt(e.currentTarget.id);
            
            if(imageType === 'master'){
               that.navigate('/buildings/'+id);
            }
            else if(imageType === 'buildingFloorGrps'){
                that.navigate('/buildings/'+this.props.cardListForId+'/group/'+id);
            }
            else{
                that.navigate('/units/'+id);
            }
            
        }.bind(this));

    },

    getSvgFilePrefix: function(imageType){
      var svgNamePrefix = "master-";

        switch(imageType) {
            case "master":
                svgNamePrefix = "master-";
                break;
            case "buildingFloorGrps":
                svgNamePrefix = "step-two-";
                break;
            case "singleFloorGroup":
                svgNamePrefix = "step-three-";
                break;
            default:
                svgNamePrefix = "master-";
        }

        return svgNamePrefix;
    },

    render: function(){

        var chosenBreakpoint = this.props.chosenBreakpoint;
        var imageType = this.props.imageType;


        var svgNamePrefix = this.getSvgFilePrefix(imageType);

        var svgClasses = classNames(this.props.svgData.svgClasses);

        var svgBaseUrl = this.props.svgBaseUrl;

    	var svgUrl= svgBaseUrl+svgNamePrefix+''+chosenBreakpoint+'.svg'; //will come based on breakpoint

        // need current highlighted building
        var buildingToHighlight = this.props.buildingToHighlight;
        var cardListFor = this.props.cardListFor;
        var panToZoomedGroup = this.props.panToZoomedGroup;
      
        
        return (

                  <div ref= "svgComp" className={svgClasses} >
                  <Isvg src={svgUrl} onLoad={this.svgLoaded.bind(this, buildingToHighlight, cardListFor)}>
	                  Here's some optional content for browsers that don't support XHR or inline
	                  SVGs. You can use other React components here too. Here, I'll show you.

                  </Isvg>  
                  </div>
        );
    }
});

module.exports = SvgContainer;