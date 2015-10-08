var React = require('react/addons');
var PureRenderMixin = React.addons.PureRenderMixin;
var CardView = require('../project-master/cardview');
var Slider = require('react-slick');

var CardList = React.createClass({

    mixins: [PureRenderMixin],

    componentWillUnmount: function(){
        console.log("component will un mount");
    },

    componentDidMount: function() {
        console.log("component did mount");
        // this.forceUpdate();
     
    },

    componentDidUpdate: function() {
        console.log("component did update");

    },

    render: function() {
        var buildings = this.props.buildings;
        var buildingNodes; 

        var settings = {
          slidesToShow: 3,
          arrows: 0,
          centerMode: 1,
          centerPadding: '60px',
          responsive: [
                {
                    breakpoint: 768,
                    settings: {
                        arrows: 0,
                        centerMode: 1,
                        centerPadding: '40px',
                        slidesToShow: 3
                    }
                },
                {
                    breakpoint: 480,
                    settings: {
                        arrows: 0,
                        centerMode: 1,
                        centerPadding: '40px',
                        slidesToShow: 1
                    }
                }
            ]
        };


        buildingNodes = buildings.map(function(building,i){
                            return <CardView key={i} building={building}/>  
                        });

        
        return (    
            <div className="bottom-card">
                <div className="blue">
                    <Slider {...settings}>
                        
                        <div>
                            <div className="card-swipe">

                                <div className="row">
                                    <div className="col-xs-5">
                                        <h4 className=" margin-none text-left"> Tower 1</h4>
                                    </div>
                                    <div className="col-xs-7 text-right text-muted price">
                                        Starting at <i className="fa fa-inr"></i> 20 lacs
                                    </div>
                                </div>
                                <div className=" swipe-unit-info row">
                                    <div className="col-xs-12 text-muted">
                                        16 Floors &nbsp;&nbsp; : &nbsp;&nbsp; 2BHK <b>+ 2</b> &nbsp; &nbsp;: &nbsp;&nbsp; 60 Units
                                    </div>
                                </div>
                                <div className="row swipe-footer">
                                    <div className="col-xs-10 text-muted">
                                        <sm>20</sm> In Selection (40 Available)
                                    </div>
                                    <div className="col-xs-2">
                                        <a href="#"><h3 className="margin-none text-right"><i className="fa fa-angle-right"></i></h3></a>
                                    </div>
                                </div>
                            </div>
                        </div>

                         <div>
                            <div className="card-swipe">

                                <div className="row">
                                    <div className="col-xs-5">
                                        <h4 className=" margin-none text-left"> Tower 2</h4>
                                    </div>
                                    <div className="col-xs-7 text-right text-muted price">
                                        Starting at <i className="fa fa-inr"></i> 20 lacs
                                    </div>
                                </div>
                                <div className=" swipe-unit-info row">
                                    <div className="col-xs-12 text-muted">
                                        16 Floors &nbsp;&nbsp; : &nbsp;&nbsp; 2BHK <b>+ 2</b> &nbsp; &nbsp;: &nbsp;&nbsp; 60 Units
                                    </div>
                                </div>
                                <div className="row swipe-footer">
                                    <div className="col-xs-10 text-muted">
                                        <sm>20</sm> In Selection (40 Available)
                                    </div>
                                    <div className="col-xs-2">
                                        <a href="#"><h3 className="margin-none text-right"><i className="fa fa-angle-right"></i></h3></a>
                                    </div>
                                </div>
                            </div>
                        </div>

                         <div>
                            <div className="card-swipe">

                                <div className="row">
                                    <div className="col-xs-5">
                                        <h4 className=" margin-none text-left"> Tower 3</h4>
                                    </div>
                                    <div className="col-xs-7 text-right text-muted price">
                                        Starting at <i className="fa fa-inr"></i> 20 lacs
                                    </div>
                                </div>
                                <div className=" swipe-unit-info row">
                                    <div className="col-xs-12 text-muted">
                                        16 Floors &nbsp;&nbsp; : &nbsp;&nbsp; 2BHK <b>+ 2</b> &nbsp; &nbsp;: &nbsp;&nbsp; 60 Units
                                    </div>
                                </div>
                                <div className="row swipe-footer">
                                    <div className="col-xs-10 text-muted">
                                        <sm>20</sm> In Selection (40 Available)
                                    </div>
                                    <div className="col-xs-2">
                                        <a href="#"><h3 className="margin-none text-right"><i className="fa fa-angle-right"></i></h3></a>
                                    </div>
                                </div>
                            </div>
                        </div>                        


                    </Slider>
                    </div>
                    </div>

        );
    }
});

module.exports = CardList;