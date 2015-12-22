var React = require('react');
var PureRenderMixin = require('react-addons-pure-render-mixin');
var classNames = require('classnames');
var UnitDropdown = require('../project-master/unitdropdown');
var BackButton = require('../common/backbutton');
var FilterCount = require('../common/filtercount');


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
    },

    componentDidUpdate: function() {

        var $titleElem = $(this.refs.titleElem);

        if(this.props.projectTitle.length > 12){
            $titleElem.tooltip();
        }
    },

    render: function(){

        var buildings = this.props.buildings;
        var isFilterApplied = this.props.isFilterApplied;

        var appliedFilterCount = "";
        var applied_filters = this.props.applied_filters;
        var appliedCount = 0;

        var logoDisplay;
        var countDom;

        var domTodisplay, cardListFor, backBtnDom;

        cardListFor = this.props.cardListFor;


        if(_.isEmpty(applied_filters) || !this.props.isFilterApplied){
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
            selectionText = 'units in your selection ('+availableUnitCount+' available)';
        }
        else{
            unitCount = availableUnitCount;
            selectionText = "units available in total";
        }

      if(window.isMobile){

        if(cardListFor==="project"){
            backBtnDom = (
                        <div className="col-xs-2 p-0">
                            <i className="i-marker i-icon"></i>
                        </div>
                    );

        }
        else{
            backBtnDom =  ( <BackButton
                                backStyleType = "light"
                                navigationType = {this.props.cardListFor}
                                navigationId = {this.props.cardListForId}
                                entityId = {this.props.previousEntityId}
                            />);
        }

        if(unitCount==0){
            domTodisplay = (<div/>);
        }
        else{
            domTodisplay = (
                <nav className="navbar navbar-default">
                    <div className="container-fluid">
                      <div className="navbar-header">
                        <div className="row">
                            {backBtnDom}
                            <div className="col-xs-7 p-0">
                                <h3 ref="titleElem" className="normal margin-none" data-toggle="tooltip" data-placement="bottom" title={this.props.projectTitle}>{this.props.projectTitle} </h3>
                                <small>{unitCount} {selectionText}</small>
                            </div>
                            <div className="col-xs-3 p-0">
                              <ul className="list-inline pull-right">
                                <li onClick={this.props.showContactModal}> <i className="i-phone i-icon"></i></li>
                                <li onClick={this.props.showFilterModal}> <i className="i-filter i-icon"></i>
                                  <FilterCount
                                    appliedFilters = {applied_filters}
                                    />
                                  </li>
                              </ul>
                            </div>
                        </div>
                      </div>
                    </div>
                </nav>
            );
        }


      }
      else{
        var dropdownDom, logoDivDom;
        var logoclasses;
        var countDom;

        if(cardListFor==="project"){
            backBtnDom =  "";

        }
        else{
            backBtnDom = ( <BackButton
                                backStyleType = "withoutLabel"
                                navigationType = {this.props.cardListFor}
                                navigationId = {this.props.cardListForId}
                                entityId = {this.props.previousEntityId}
                            />
                         );
        }

        if(this.props.cardListFor==="project"){
            dropdownDom = ""
        }
        else{
            dropdownDom =( <UnitDropdown
                                dropDownData = {this.props.dropDownData}
                                projectTitle = {this.props.projectTitle}
                                buildingId = {this.props.buildingId}
                                selectedId = {this.props.cardListForId}
                                cardListFor = {this.props.cardListFor}
                            />
                        );
        }




        logoclasses = classNames({
            "logoOuter" : true,
            "titleOuter" : !(this.props.cardListFor === "project")
        });


        if(this.props.cardListFor === "building"){
            facingDisplay = (
                <span>
                    <br />
                    <small><span>Facing : {this.props.facing}</span></small>
                </span>
            );

            logoDisplay = (<i className="sideBarLogo"><img className="img-responsive" src={this.props.projectLogo}/></i>);
        }
        else{
            facingDisplay = "";

            if(this.props.cardListFor === "group"){
                logoDisplay = (<i className="sideBarLogo"><img className="img-responsive" src={this.props.projectLogo}/></i>);
            }
            else{
                if(this.props.logoExist){

                    logoDisplay = (<i className="sideBarLogo"><img className="img-responsive" src={this.props.projectLogo}/></i>);

                }
                else{

                    // logoDisplay = (<h3 className="normal margin-none">{this.props.projectTitle} </h3>);
                    logoDisplay = (<i className="sideBarLogo"><img className="img-responsive" src={this.props.projectLogo}/></i>);
                }
            }

        }

        if((unitCount==0)&&!isFilterApplied&&(cardListFor==="project")){
            domTodisplay = (<div/>);
        }
        else{
            domTodisplay = (    <div>
                                {backBtnDom}
                                <div className={logoclasses}>
                                    {logoDisplay}
                                    {dropdownDom}
                                </div>
                                 <div className="col-xs-12 unitDetails">
                                     <small className="text-uppercase availableUnits text-success">{unitCount} {selectionText}{facingDisplay}</small>
                                 </div>
                            </div>
                        );
        }


      }

      return domTodisplay;
    }
});


module.exports = NavBar;
