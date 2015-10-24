var React = require('react');
var AppStore = require('../../stores/app-store.js');
var TabHeader = require('../tabs/tabheader');
var TabPanes = require('../tabs/tabpanes');
var TabFooter = require('../tabs/tabfooter');

function getStateData(){
    return AppStore.getStateData();
}

var  UnitDetails = React.createClass({

	getInitialState: function() {
        return getStateData();
    },

	
	render: function() {
		var domToDisplay ;

		domToDisplay = (
			<div>
				<TabHeader/>
				<TabPanes/>
				<TabFooter/>
			</div>

		)
		return domToDisplay;
	}
});

module.exports = UnitDetails;