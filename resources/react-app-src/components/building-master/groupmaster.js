var React = require('react');
var PureRenderMixin = require('react-addons-pure-render-mixin');
var AppStore = require('../../stores/app-store.js');
var NavBar = require('../project-master/navbar');
var SideBar = require('../project-master/sidebar');
var PageContent = require('../project-master/pagecontent');
var SunToggle = require('../project-master/suntoggle');
var Rotate = require('../project-master/rotate');
var ProjectImage = require('../project-master/projectimage');
var ImageContainerTemplate = require('../project-master/imagecontainertemplate');
var CardList = require('../project-master/cardlist');
var FilterPopover = require('../filter/filterpopover');
var immutabilityHelpers = require('react-addons-update');
var ReactDOM = require('react-dom');
var Modal = require('../modal/modal');


var qtipSettings = { // Grab some elements to apply the tooltip to
            content: "Dummy Text",
            show: {
                when: false, // Don't specify a show event
                ready: true // Show the tooltip when ready
            },
            hide: false,
            style: {
                classes: 'qtip-light',
                tip: {
                    corner: 'bottom center',
                    mimic: 'bottom left',
                    border: 1,
                    width: 88,
                    height: 66
                }
            } // Don't specify a hide event
        };



// function getGroupStateData(floorGroupId){
//     return AppStore.getFloorGroupStateData(floorGroupId);
// }


var GroupMaster = React.createClass({


    getInitialState: function() {
        var groupId;
        groupId = this.props.groupId;

        stateData =  {
            groupId:groupId
        }

        return stateData;
    },

   

    render: function(){
        
        domToDisplay = (<div> Group master </div>);        
       

        return domToDisplay;
    }
});

module.exports = GroupMaster;