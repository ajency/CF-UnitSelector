var React = require('react')
var PureRenderMixin = require('react-addons-pure-render-mixin');
var ProjectMaster = require('./project-master/projectmaster');
var BuildingMaster = require('./building-master/buildingmaster');
var GroupMaster = require('./building-master/groupmaster');
var UnitDetails = require('./unit-details/unitdetails');
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
            <Location path="/buildings/:buildingId/group/:groupId" handler={GroupMaster} />
            <Location path="/units/:unitId" handler={UnitDetails} />
          </Locations>
        </Template>
    );

  }
});


module.exports = APP;
