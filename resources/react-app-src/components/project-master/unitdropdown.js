var React = require('react');
var PureRenderMixin = require('react-addons-pure-render-mixin');
var classNames = require('classnames');
var Router = require('react-router-component');


var UnitDropdown = React.createClass({

	mixins: [Router.NavigatableMixin],

	getInitialState: function() {
         return {
             selectedId: this.props.selectedId
         }
     },


    change: function(event){
    	var targetId = event.target.value;
    	this.setState({selectedId: targetId});

    	if(this.props.cardListFor === 'building'){
    		return this.navigate('/buildings/'+targetId);
    	}else if(this.props.cardListFor === 'group'){
    		return this.navigate('/buildings/'+this.props.buildingId+'/group/'+targetId);
    	}

    },

		componentDidMount: function(){
			// var selectOption = $(ReactDOM.findDOMNode(this.refs.selectOption));
			// $('div.viewport').text(selectOption[0].textContent);
			// selectOption.change(function () {
			// 		$('div.viewport').text($("option:selected", this).text());
			// });
			// $('div.viewport').text($('#selectOption')[0].textContent);
			// $('#selectOption').change(function () {
			// 		$('div.viewport').text($("option:selected", this).text());
			// });
			//$('.viewport').html(this.state.data.projectTitle);
			//$('.viewport').html('this is test message');
		},


	render : function(){

		var selectedoption = this.state.selectedId;

		dropwDownData = this.props.dropDownData;
		cardListFor = this.props.cardListFor;


		if(cardListFor === 'building'){
			var buildingSelectNodes= _.map( dropwDownData , function(building, i){
	            return(

	                <option key={i} value={building.id}>
	                	{building.building_name}
	                </option>
	            );

	        });

		}else if(cardListFor === 'group'){
			var buildingSelectNodes= _.map( dropwDownData , function(group, i){
	            return(

	                <option key={i} value={group.id}>
	                	{group.building_name}
	                </option>
	            );

	        });

		}


		return (

			<h4 className="margin-none">
	              <div className="styled-select">
									<div className="viewport"></div>
	                 <select id="selectOption" ref="selectOption" onChange={this.change} value={selectedoption}>
	                    {buildingSelectNodes}
	                 </select>
	              </div>
	            </h4>

		);

	}
});


module.exports = UnitDropdown;
