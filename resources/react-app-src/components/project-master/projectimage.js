var React = require('react/addons');
var PureRenderMixin = React.addons.PureRenderMixin;

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