var React = require('react');
var CardView = require('../project-master/cardview');

var CardList = React.createClass({

    componentWillUnmount: function(){
        console.log("component will un mount");
    },

    componentDidMount: function() {
        console.log("component did mount");
        // this.forceUpdate();
     
    },

    componentDidUpdate: function() {
        console.log("component did update");
        var $sliderContainer = $(this.refs.sliderContainer.getDOMNode());

        var $sliderSettings = {
            centerMode: true,
            centerPadding: '60px',
            arrows: false,
            slidesToShow: 3,
            responsive: [
            {
                breakpoint: 768,
                settings: {
                    arrows: false,
                    centerMode: true,
                    centerPadding: '40px',
                    slidesToShow: 3
                }
            },
            {
                breakpoint: 480,
                settings: {
                    arrows: false,
                    centerMode: true,
                    centerPadding: '40px',
                    slidesToShow: 1
                }
            }
            ]
        };

        $sliderContainer.slick($sliderSettings);
    },

    render: function() {
        var buildings = this.props.buildings;
        var buildingNodes; 


        buildingNodes = buildings.map(function(building,i){
                            return <CardView key={i} building={building}/>  
                        });

        
        return (
            <div className="bottom-card">
                <div className="blue">
                    <div ref="sliderContainer" className="slider center">
                    {buildingNodes} 
                    </div>
                </div>
            </div>
        );
    }
});

module.exports = CardList;