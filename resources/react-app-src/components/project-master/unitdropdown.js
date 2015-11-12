var React = require('react');
var PureRenderMixin = require('react-addons-pure-render-mixin');
var classNames = require('classnames');
var Router = require('react-router-component')


var UnitDropdown = React.createClass({

	mixins: [Router.NavigatableMixin],

	getInitialState: function() {
         return {
             selectedBuilding: this.props.selectedBuilding
         }
     },


    change: function(event){
    	var buildingId = event.target.value;
    	this.setState({selectedBuilding: buildingId});
    	return this.navigate('/buildings/'+buildingId);
    },


	render : function(){

		var selectedoption = this.state.selectedBuilding;

		dropwDownData = this.props.dropDownData;

		buildingSelectNodes= _.map( dropwDownData , function(building, i){
	            return(
	                
	                <option key={i} value={building.id}>
	                	{building.building_name} 
	                </option>
	            ); 
	                 
	        });
		return (
			<h4 className="margin-none"> 
	              <div className="styled-select">
	                 <select onChange={this.change} value={selectedoption}>
	                    {buildingSelectNodes}
	                 </select>
	              </div>
	            </h4>

		);

	}
});


module.exports = UnitDropdown;