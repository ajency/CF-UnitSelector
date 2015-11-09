var React = require('react');
var AppStore = require('../../stores/app-store.js');
var TabHeader = require('../tabs/tabheader');
var TabPanes = require('../tabs/tabpanes');
var TabFooter = require('../tabs/tabfooter');
var SimilarUnits = require('../tabs/similarunits');
var Modal = require('../modal/modal');
var ReactDOM = require('react-dom');

function getUnitStateData(unitId){
    return AppStore.getUnitStateData(unitId);
}



var UnitDetails = React.createClass({

	getInitialState: function() {
		
		var unitId;
		unitId = this.props.unitId;
		

        return getUnitStateData(unitId);
    },

    componentWillMount:function(){
        AppStore.addChangeListener(this._onChange);
    }, 


    componentDidMount: function() {
    if(!window.isMobile){
        $(document).on('click', '.click', function (e) {
        var theID = $(this).attr('id');
        $('.list-unstyled li a.active').removeClass('active');
        $(this).addClass('active');
        $('html, body').animate({
            scrollTop: $('#' + theID + '_div').offset().top-60
        }, 1000);
        return false;
      });


        /*var sections = $('.outerDivs')
          , nav = $('tabHeader')
          , nav_height = nav.outerHeight();

          $(window).on('scroll', function () {
            var cur_pos = $(this).scrollTop();
            
            sections.each(function() {
              var top = $(this).offset().top - nav_height,
                  bottom = top + $(this).outerHeight();
              
              if (cur_pos >= top && cur_pos <= bottom) {
                nav.find('a').removeClass('active');
                sections.removeClass('active');
                
                $(this).addClass('active');
                nav.find('a[href="#'+$(this).attr('id')+'"]').addClass('active');
              }
            });
          });

          nav.find('a').on('click', function () {
            var $el = $(this)
              , id = $el.attr('href');
            
            $('html, body').animate({
              scrollTop: $(id).offset().top - nav_height
            }, 500);
            
            return false;
          });*/

	
      function sticky_relocate() {
          var window_top = $(window).scrollTop();
          var div_top = $('#sticky-anchor').offset().top;
          if (window_top > div_top) {
              $('#stickyHeader').addClass('stick');
          } else {
              $('#stickyHeader').removeClass('stick');
          }
      }

      $(function () {
          $(window).scroll(sticky_relocate);
          sticky_relocate();
      });
      }
  },


    showContactModal: function(){
        $(ReactDOM.findDOMNode(this.refs.contactModal)).modal();
    },	

     
    _onChange:function(){
    	var unitId;
		unitId = this.props.unitId;
      	this.setState(getUnitStateData(unitId));
    },  

    ordinalSuffixof:function (i) {
	    var j = i % 10,
	        k = i % 100;
	    if (j == 1 && k != 11) {
	        return i + "st";
	    }
	    if (j == 2 && k != 12) {
	        return i + "nd";
	    }
	    if (j == 3 && k != 13) {
	        return i + "rd";
	    }
	    return i + "th";
	}, 

	getFormattedUnitData: function(unformattedData){
		var unitData = {};
		var basicData = {};
		var roomData = [];

		// initialise data
		basicData.id="";
		basicData.name="";
		basicData.direction="";
		basicData.primaryBreakPoint=0;
		basicData.sellingAmount="";
		basicData.propertyTypeName="";
		basicData.status="";
		basicData.floor="";
		basicData.superBuiltUpArea="";
		basicData.builtUpArea="";
		basicData.buildingName="";
		basicData.url2dlayout="";
		basicData.url3dlayout="";
		basicData.buildingId="";
		basicData.buildingPrimaryBreakPoint=0;
		basicData.buildingMasterImgs=[];
		basicData.projectMasterImgs=[];  
		basicData.projectName="";  

		basicData.variantAttributes = "";
		basicData.views = "";
		basicData.allAmenities = "";
		unitData.similarUnits = "";

		unitData.basic = basicData;
		unitData.rooms = roomData;

		unit = unformattedData;

		if(!_.isEmpty(unit)){

			unitData.basic.id = unit.id;
			unitData.basic.name = unit.unit_name;
			unitData.basic.cfProjectId = unit.cfProjectId;
			unitData.basic.direction = unit.direction;
			unitData.basic.sellingAmount= unit.selling_amount;
			unitData.basic.propertyTypeName= unit.propertyTypeName;
			unitData.basic.primaryBreakPoint= unit.primary_breakpoint;
			unitData.basic.status = unit.availability;
			unitData.basic.floor= this.ordinalSuffixof(unit.floor);
			unitData.basic.superBuiltUpArea= unit.variantData.super_built_up_area;
			unitData.basic.builtUpArea = unit.variantData.built_up_area;
			unitData.basic.buildingId = unit.buildingData.id;
			unitData.basic.buildingName = unit.buildingData.building_name;
			unitData.basic.buildingPrimaryBreakPoint = unit.buildingData.primary_breakpoint;
			unitData.basic.buildingMasterImgs = unit.buildingData.building_master;
			unitData.basic.unitTypeName = unit.variantData.unitTypeName;
			
			unitData.basic.projectMasterImgs = unit.projectMasterImgs;
			unitData.basic.projectName = unit.projectName;

			unitData.basic.variantAttributes = unit.variantData.variant_attributes;
			unitData.basic.views = unit.views;
			unitData.basic.allAmenities = unit.allAmenities;
			unitData.basic.unitId = unit.id;
			unitData.similarUnits = unit.similarUnits;

			floorData = unit.variantData.floor
			groundfloorData = floorData[0];

			unitData.basic.url2dlayout = groundfloorData.url2dlayout_image;
			unitData.basic.url3dlayout = groundfloorData.url3dlayout_image;

			unitData.rooms = groundfloorData.rooms_data;
		}

		return unitData;


	},  

	
	render: function() {

		var domToDisplay;

		var unitId = this.props.unitId;
		var projectId ;
		unitStatetData = getUnitStateData(unitId);
		unitData = this.getFormattedUnitData(unitStatetData);
		projectId = unitData.basic.cfProjectId;
		status = unitData.basic.status;

		buildingName = unitData.basic.buildingName;
		propertyTypeName = unitData.basic.propertyTypeName;
		unitTypeName = unitData.basic.unitTypeName;

		var modalData = {};
    	modalData.projectData = {title:unitData.basic.projectName};

		if(window.isMobile){

			domToDisplay = (
				<div>
					<TabHeader
						buildingName={buildingName}
						unitTypeName={unitTypeName}
						propertyTypeName={propertyTypeName}
						unitId = {unitId}
						projectId = {projectId}
						unitStatus = {status}
					/>
					<TabPanes
						unitData = {unitData}
					/>
					<TabFooter
						unitId = {unitId}
						projectId = {projectId}
						unitStatus = {status}
						showContactModal = {this.showContactModal}
					/>

	                <Modal 
	                    ref="contactModal" 
	                    modalData = {modalData}
	                    modalPurpose = "mobileContactModal"
	                />					
				</div>
			)
		}
		else{

			domToDisplay = (
				<div>
					<div className="container-fluid step4Desk">
						<TabHeader
							buildingName={buildingName}
							unitTypeName={unitTypeName}
							propertyTypeName={propertyTypeName}					
							unitData = {unitData}
							showContactModal = {this.showContactModal}
						/>
						<TabPanes
							unitData = {unitData}
						/>
						<SimilarUnits similarUnits={unitData.similarUnits} />				
					</div>

					<TabFooter
							unitId = {unitId}
							projectId = {projectId}
							unitStatus = {status}

					/>
	                <Modal 
	                    ref="contactModal" 
	                    modalData = {modalData}
	                    modalPurpose = "contactModal"
	                />
				</div>
		)
		}
		return domToDisplay;
	}
});

module.exports = UnitDetails;