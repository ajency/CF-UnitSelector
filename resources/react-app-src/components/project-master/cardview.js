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
                            <div className="col-xs-5">
                                <h4 className=" margin-none text-left">{buildingName}</h4>
                            </div>
                            <div className="col-xs-7 text-left text-muted">
                                Starting Rs 20 lacs
                            </div>
                        </div>
                        <div className=" swipe-unit-info row">
                            <div className="col-xs-12 text-muted">
                                {noOfFloors} Floors  &nbsp;&nbsp; : &nbsp;&nbsp; {supportedUnitTypeString} &nbsp; &nbsp;: &nbsp;&nbsp; {unitData.length} Units
                            </div>  
                        </div>
                        <div className="row swipe-footer">
                            <div className="col-xs-10">
                                <sm>{availableUnitData.length}</sm> {unitsMatchingString} 
                            </div>
                            <div className="col-xs-2">
                                <Link href={buildingUrl}><span className="glyphicon glyphicon-chevron-right  text-right" aria-hidden="true"></span></Link>
                            </div>
                        </div>
                    </div>
                

        );
    }
});

module.exports = CardView;
