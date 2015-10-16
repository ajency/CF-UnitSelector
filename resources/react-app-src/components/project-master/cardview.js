var React = require('react');
var PureRenderMixin = require('react-addons-pure-render-mixin');
var Link = require('react-router-component').Link
var classNames = require('classnames');

var CardView = React.createClass({
    
    mixins: [PureRenderMixin],

    render: function() {
        var buildingData = this.props.building;
        var isFilterApplied = this.props.isFilterApplied;
        var unitData = [];
        var noOfFloors = 0;
        var buildingName = "";
        var supportedUnitTypeString = " ";
        var buildingUrl = " ";
        
        var unitCount = 0;
        var unitCountDisplayString = "available"; 

        var isZeroUnits = false;

        if (!_.isEmpty(buildingData)){
          
          unitData = buildingData.unitData;
          availableUnitData = buildingData.availableUnitData;
          filteredUnitData = buildingData.filteredUnitData;
          noOfFloors = buildingData.no_of_floors;
          buildingName = buildingData.building_name;
          

          buildingUrl = "/buildings/"+buildingData.id;

          _.each(buildingData.supportedUnitTypes, function(supportedUnitType , i){
                
                len = buildingData.supportedUnitTypes.length

                if(i==(len-1)){
                    supportedUnitTypeString += supportedUnitType;
                }
                else{
                    supportedUnitTypeString += supportedUnitType+", ";
                }
                
           });

          // Check if applied filters have atleast one filter array with size greater than 0 m if yes => filters have been applied else not

          if(isFilterApplied){
            unitCount = filteredUnitData.length;
            unitCountDisplayString = "matching your selection";
          }
          else{
            unitCount = availableUnitData.length;
            unitCountDisplayString = "available";
          }


        }

        if(availableUnitData.length==0){
          isZeroUnits = true;
        }

        // if no units in the tower are enabled then disable cardview
        var cardClasses = classNames({
          'card-swipe': true,
          'not-released': isZeroUnits
        }); 

        

        
        var arrowClasses = classNames({
          arrow: true,
          hide: isZeroUnits
        });
        
        
        return (
                
                    <div className={cardClasses}>

                        <div className="row">
                            <div className="col-xs-12">
                                <h4 className=" margin-none text-left"> {buildingName}</h4>
                            </div>
                            <div className="col-xs-12 text-muted price">
                                  From <span className="price-tag"><i className="fa fa-inr"></i> 20 lacs</span>
                            </div>
                        </div>
                        <div className=" swipe-unit-info row">
                         <div className="col-xs-12 text-muted">
                            <span> {noOfFloors} Floors</span><li></li> <span> {supportedUnitTypeString} </span>
                         </div>  
                        </div>
                        <div className="row swipe-footer">
                             <div className="col-xs-12 text-muted text-uppercase">
                               <sm> {unitCount} </sm> <span className="units"><b>{unitCountDisplayString}</b> <br/> {unitData.length} total units</span>
                              <div className={arrowClasses}>
                               <Link href={buildingUrl}><h3 className="margin-none"><i className="fa fa-angle-right"></i></h3></Link>
                            </div>
                          </div>  
                        </div>
                    </div>
                

        );
    }
});

module.exports = CardView;
