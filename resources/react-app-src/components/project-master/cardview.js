var React = require('react');

var CardView = React.createClass({
    render: function() {
        return (
                <div>
                    <div className="card-swipe">

                        <div className="row">
                            <div className="col-xs-5">
                                <h4 className=" margin-none text-left"> Tower 1</h4>
                            </div>
                            <div className="col-xs-7 text-left text-muted">
                                Starting Rs 20 lacs
                            </div>
                        </div>
                        <div className=" swipe-unit-info row">
                            <div className="col-xs-12 text-muted">
                                16 Floors  &nbsp;&nbsp; : &nbsp;&nbsp; 2BHK, 3BHK &nbsp; &nbsp;: &nbsp;&nbsp; 60 Units
                            </div>  
                        </div>
                        <div className="row swipe-footer">
                            <div className="col-xs-10">
                                <sm>40</sm> Units Matching your selection 
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
