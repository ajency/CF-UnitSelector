var React = require('react');
var NavBar = require('./project-master/navbar');


var Template =
  React.createClass({
    render:function(){
      return  (
        <div>
          {this.props.children}
        </div>
        )
    }
  });
module.exports = Template;
