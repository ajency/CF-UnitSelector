var React = require('react');

var CardView = React.createClass({
    render: function() {
        var buildingData = this.props.building;
        var unitData = [];
        var noOfFloors = 0;
        var buildingName = ""

        if (!_.isEmpty(buildingData)){
           unitData = buildingData.unitData;
           noOfFloors = buildingData.no_of_floors;
           buildingName = buildingData.building_name;
        }
        
        
        return (
                <div>
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
                                {noOfFloors} Floors  &nbsp;&nbsp; : &nbsp;&nbsp; 2BHK, 3BHK &nbsp; &nbsp;: &nbsp;&nbsp; {unitData.length} Units
                            </div>  
                        </div>
                        <div className="row swipe-footer">
                            <div className="col-xs-10">
                                <sm>{unitData.length}</sm> Units Matching your selection 
                            </div>
                            <div className="col-xs-2">
                                <a href="#"><span className="glyphicon glyphicon-chevron-right  text-right" aria-hidden="true"></span></a>
                            </div>
                        </div>
                    </div>
                </div>
        );
    }
});

module.exports = CardView;
