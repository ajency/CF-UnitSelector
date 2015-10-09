var React = require('react')
var PureRenderMixin = require('react-addons-pure-render-mixin');
var ProjectMaster = require('./project-master/projectmaster');
var BuildingMaster = require('./building-master/buildingmaster');
var Router = require('react-router-component');
var Template = require('./app-template');


var Locations = Router.Locations;
var Location = Router.Location;


var APP = React.createClass({

  render: function() {
  return (


        <Template>
          <Locations hash>
            <Location path="/" handler={ProjectMaster} />
            <Location path="/buildings/:buildingId" handler={BuildingMaster} />
          </Locations>
        </Template>
    );

  }
});


module.exports = APP;
