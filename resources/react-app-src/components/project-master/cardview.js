var React = require('react');
var PureRenderMixin = require('react-addons-pure-render-mixin');
var Link = require('react-router-component').Link

var CardView = React.createClass({
    
    mixins: [PureRenderMixin],

    render: function() {
        var buildingData = this.props.building;
        var unitData = [];
        var noOfFloors = 0;
        var buildingName = "";
        var supportedUnitTypeString = " ";
        var buildingUrl = " ";

        if (!_.isEmpty(buildingData)){
           unitData = buildingData.unitData;
           availableUnitData = buildingData.availableUnitData;
           noOfFloors = buildingData.no_of_floors;
           buildingName = buildingData.building_name;
           unitsMatchingString = " Units available";

           buildingUrl = "/buildings/"+buildingData.id;



           _.each(buildingData.supportedUnitTypes, function(supportedUnitType , i){
                
                len = buildingData.supportedUnitTypes.length

                if(i==(len-1)){
                    supportedUnitTypeString += supportedUnitType;
                }
                else{
                    supportedUnitTypeString += supportedUnitType+", ";
                }
                
           })
        }
        
        
        return (
                
                    <div className="card-swipe">

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
                               <sm> {availableUnitData.length} </sm> <span className="units"><b>Available</b> <br/> {unitData.length} total units</span>
                              <div className="arrow">
                               <Link href={buildingUrl}><h3 className="margin-none"><i className="fa fa-angle-right"></i></h3></Link>
                            </div>
                          </div>  
                        </div>
                    </div>
                

        );
    }
});

module.exports = CardView;
