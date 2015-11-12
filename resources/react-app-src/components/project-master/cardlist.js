var React = require('react');
var PureRenderMixin = require('react-addons-pure-render-mixin');
var CardView = require('../project-master/cardview');
var Slider = require('react-slick');

var sliderSettings = {
    pagination: false,
    effect: 'coverflow',
    grabCursor: true,
    centeredSlides: true,
    slidesPerView: 'auto',
    coverflow: {
        rotate: 50,
        stretch: 0,
        depth: 100,
        modifier: 1,
        slideShadows : true
    }
};

var CardList = React.createClass({

    mixins: [PureRenderMixin],

    swipeCard: function(swiper){

      swiperContainer = swiper.container;
      swiperContainerHtml = swiperContainer[0];
      swiperSlides = swiper.slides;
      
      // current slide 
      currentSlideIndex = swiper.activeIndex;

      // current slide html
      currentSlideHtml = swiperSlides[currentSlideIndex];

      this.props.destroyTooltip();
      towerId = $(currentSlideHtml).find(".card-swipe" ).data("unitid");

      towerId = parseInt(towerId);

      buildings = this.props.buildings;

      building = _.findWhere(buildings, {id: towerId});

      this.props.rotateImage(building);
        
    },

    componentWillUnmount: function(){
        var mySwiper;
        var $sliderContainer = $(this.refs.sliderContainer);

        if($sliderContainer.hasClass('swiper-container-horizontal')){
              mySwiper = $('.swiper-container')[0].swiper;
              mySwiper.destroy(true,true);
            }
        
    },
    componentDidMount: function() {
      var mySwiper;
      var $sliderContainer = $(this.refs.sliderContainer);


      if((!($sliderContainer.hasClass('swiper-container-horizontal'))) && (window.isMobile)){
            mySwiper = new Swiper('.swiper-container', sliderSettings);
      }
           
       },    

    componentDidUpdate: function() {
        var mySwiper;
        var $sliderContainer = $(this.refs.sliderContainer);

        mySwiper = $('.swiper-container')[0].swiper;
        mySwiper.destroy(true,true);


        if((!($sliderContainer.hasClass('swiper-container-horizontal'))) && (window.isMobile)){
              mySwiper = new Swiper('.swiper-container', sliderSettings);
        }

        // // On swipe event
        // $sliderContainer.on('swipe', this.swipeCard);

        mySwiper.on("TransitionEnd", this.swipeCard);
       
  


           
       },



    render: function() {
        var buildings = this.props.buildings;
        var buildingNodes; 
        var isFilterApplied = this.props.isFilterApplied; 

        var cardListFor = this.props.cardListFor ;
        var cardListForId = this.props.cardListForId ;


        buildingNodes = buildings.map(function(building,i){
                            return(
                                <div key={i} className="swiper-slide">
                                  <div>
                                    <CardView  
                                      building={building}
                                      isFilterApplied={isFilterApplied}
                                      cardListFor = {cardListFor}
                                      cardListForId = {cardListForId}
                                    /> 
                                  </div>
                                </div>
                            ); 
                                 
                        });

        
        return (    
            <div className="bottom-card">
                <div className="blue">
                    
                        <div ref="sliderContainer" className="swiper-container">
                        <div className="swiper-wrapper">
                            {buildingNodes}
                        </div>    
                        </div>
                   
                </div>
            </div>

        );
    }
});

module.exports = CardList;