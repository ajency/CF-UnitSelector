var React = require('react');

var CardList = React.createClass({

    componentDidMount: function() {
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

    componentWillUnmount: function(){
        var $sliderContainer = $(this.refs.sliderContainer.getDOMNode());
        $sliderContainer.unslick();
    },

    render: function() {

        return (
            <div className="bottom-card">
                <div className="blue">
                    <div ref="sliderContainer" className="slider center">
                    {this.props.children}
                    </div>
                </div>
            </div>
        );
    }
});

module.exports = CardList;