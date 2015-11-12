var React = require('react');
var StepOne = require('./steps/stepone');
var StepTwo = require('./steps/steptwo');
var StepThree = require('./steps/stepthree');
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
            <Location path="/" handler={StepOne} />
            <Location path="/buildings/:buildingId" handler={StepTwo} />
            <Location path="/buildings/:buildingId/group/:groupId" handler={StepThree} />
            <Location path="/units/:unitId" handler={UnitDetails} />
          </Locations>
        </Template>
    );

  }
});


module.exports = APP;
