var React = require('react');
var PureRenderMixin = require('react-addons-pure-render-mixin');
var classNames = require('classnames');


var UnitDropdown = React.createClass({

	render : function(){

		buildings = this.props.buildings;

		buildingSelectNodes= buildings.map(function(building,i){
	            return(
	                
	                <option value={building.id}>
	                	{building.building_name} 
	                </option>
	            ); 
	                 
	        });
		return (
			<h4 className="margin-none"> 
	              <div className="styled-select">
	                 <select disabled>
	                    <option>{this.props.projectTitle}</option>
	                 </select>
	              </div>
	            </h4>

		);

	}
});


module.exports = UnitDropdown;