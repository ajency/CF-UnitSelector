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
                            return(
                                <div>
                                <CardView key={i} building={building}/> 
                                </div>
                            ); 
                                 
                        });

        
        return (    
            <div className="bottom-card">
                <div className="blue">
                    <Slider {...settings}>
                        
                    {buildingNodes}  


                    </Slider>
                    </div>
                    </div>

        );
    }
});

module.exports = CardList;