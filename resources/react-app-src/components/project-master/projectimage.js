var React = require('react');
var PureRenderMixin = require('react-addons-pure-render-mixin');

var ProjectImage = React.createClass({
    mixins: [PureRenderMixin],	

    render: function(){

            var BASEURL= "http://commonfloorlocal.com";
            var imgUrl= BASEURL+'/images/cf-mobile/FirstSlide.jpg';
            return (
                <div className="image">
                    <img src={imgUrl} className="img-responsive fit"/>
                </div>
            );
        }
});

module.exports = ProjectImage;