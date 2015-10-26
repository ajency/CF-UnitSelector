var React = require('react');
var AppStore = require('../../stores/app-store.js');
var TabHeader = require('../tabs/tabheader');
var TabPanes = require('../tabs/tabpanes');
var TabFooter = require('../tabs/tabfooter');

function getUnitStateData(unitId){
    return AppStore.getUnitStateData(unitId);
}



var UnitDetails = React.createClass({

	getInitialState: function() {
		
		var unitId;
		unitId = this.props.unitId;
		console.log(unitId);

        return getUnitStateData(unitId);
    },

    componentWillMount:function(){
        AppStore.addChangeListener(this._onChange);
    },  
     
    _onChange:function(){
    	var unitId;
		unitId = this.props.unitId;
      	this.setState(getUnitStateData(unitId));
    },     

	
	render: function() {

		var domToDisplay ;


		if(window.isMobile){
		domToDisplay = (
			<div>
				<TabHeader/>
				<TabPanes/>
				<TabFooter/>
			</div>
		)
		}else{
		domToDisplay = (
			<div className="container-fluid step4Desk">
				<TabHeader/>
				<TabPanes/>
				<TabFooter/>
			</div>
		)
		}
		return domToDisplay;
	}
});

module.exports = UnitDetails;