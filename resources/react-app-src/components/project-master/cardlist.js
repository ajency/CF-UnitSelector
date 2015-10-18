var React = require('react');
var PureRenderMixin = require('react-addons-pure-render-mixin');
var CardView = require('../project-master/cardview');
var Slider = require('react-slick');

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

var CardList = React.createClass({

    mixins: [PureRenderMixin],

    componentWillUnmount: function(){
        
        var $sliderContainer = $(this.refs.sliderContainer);

        if($sliderContainer.hasClass('slick-initialized')){
              $sliderContainer.slick('unslick');
            }
        
    },
    componentDidMount: function() {
      
      var $sliderContainer = $(this.refs.sliderContainer);

      if(!($sliderContainer.hasClass('slick-initialized'))){
        $sliderContainer.slick($sliderSettings);
      }
           
       },    

    componentDidUpdate: function() {
       
       var $sliderContainer = $(this.refs.sliderContainer);
       $sliderContainer.slick('unslick');


        if(!($sliderContainer.hasClass('slick-initialized'))){
          $sliderContainer.slick($sliderSettings);
        }

        // On swipe event
        $sliderContainer.on('swipe', function(event, slick, direction){
          alert("swipee");
          console.log(event);
          console.log(slick);
          console.log(direction);
          // left
        });


           
       },



    render: function() {
        var buildings = this.props.buildings;
        var buildingNodes; 
        var isFilterApplied = this.props.isFilterApplied;

  


        buildingNodes = buildings.map(function(building,i){
                            return(
                                <div key={i}>
                                <CardView  
                                  building={building}
                                  isFilterApplied={isFilterApplied}
                                /> 
                                </div>
                            ); 
                                 
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