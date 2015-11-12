var React = require('react');
var PureRenderMixin = require('react-addons-pure-render-mixin');
var classNames = require('classnames');
var UnitDropdown = require('../project-master/unitdropdown');


var NavBar = React.createClass({
    mixins: [PureRenderMixin],

    getDefaultProps: function () {
      return { 
        projectTitle : "Default project title" ,
        unitCount : 0,
        showFilterModal : true,
        buildings : [],
        isFilterApplied : false,
        applied_filters : {}

      };
    } ,   
    
    render: function(){

      var buildings = this.props.buildings; 
      var isFilterApplied = this.props.isFilterApplied;

      var appliedFilterCount = "";     
      var applied_filters = this.props.applied_filters;
      var appliedCount = 0;

      var domTodisplay;

      if(_.isEmpty(applied_filters)){
        appliedFilterCount = "";
        filterClasses = classNames({
          "filterNumber" : false
        });
      }
      else{


var newAppliedFiltersCount = [];
_.each(applied_filters, function(filter, key){
  if(filter.length>0){
    newAppliedFiltersCount.push(key);
  }
});



        appliedFilterKeys = _.keys(applied_filters);
        //appliedFilterCount = appliedFilterKeys.length;
        appliedFilterCount = newAppliedFiltersCount.length;
        filterClasses = classNames({
          "filterNumber" : true
        });
      }


      unitCount = this.props.unitCount;
      availableUnitCount = 0;
      filteredUnitCount = 0;

      selectionText = "units available in total";

      _.each(buildings,function(building){
        availableCount = building.availableUnitData.length;
        filteredCount = building.filteredUnitData.length;

        availableUnitCount =availableUnitCount+availableCount;
        filteredUnitCount = filteredUnitCount+filteredCount;

      })

      

      if(isFilterApplied){
        unitCount = filteredUnitCount;
        selectionText = "units in your selection";
      } 
      else{
        unitCount = availableUnitCount;
        selectionText = "units available in total";
      }

      if(window.isMobile){

        domTodisplay = (
            <nav className="navbar navbar-default">
                <div className="container-fluid">
                  <div className="navbar-header">
                    <div className="row">
                       <div className="col-xs-2 p-0">
                            <i className="i-marker i-icon"></i>
                        </div>
                        <div className="col-xs-6 p-0">
                            <h3 className="normal margin-none">{this.props.projectTitle} </h3>
                            <small>{unitCount} {selectionText}</small>
                        </div>
                        <div className="col-xs-4 p-0">
                          <ul className="list-inline pull-right">
                            <li> <i className="i-phone i-icon"></i></li>
                            <li onClick={this.props.showFilterModal}> <i className="i-filter i-icon"></i><span className={filterClasses}>{appliedFilterCount}</span></li>
                          </ul>
                        </div>
                    </div>
                  </div>
              </div>
          </nav>
        );        
      }
      else{
        var dropdownDom;

        if(this.props.cardListFor==="project"){
            dropdownDom = ""
        }
        else{
            dropdownDom =( <UnitDropdown
                                dropDownData = {this.props.dropDownData}
                                projectTitle = {this.props.projectTitle}
                                selectedBuilding = {this.props.cardListForId}
                            />
                        );
        }


        domTodisplay = (
            <div>
                <div className="logoOuter titleOuter">
                    <i className="sideBarLogo"><img className="img-responsive" src={this.props.projectLogo}/></i>
                    {dropdownDom}
                </div>
                <div className="col-xs-12 unitDetails"><small className="text-uppercase availableUnits text-success">{unitCount} {selectionText}</small></div>
                <div className="clear"></div>
            </div>
        ); 

      }

      return domTodisplay;
    }
});


module.exports = NavBar;