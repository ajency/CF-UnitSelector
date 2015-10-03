var React = require('react');

var ProjectImage = React.createClass({

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