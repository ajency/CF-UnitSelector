var React = require('react');
var PureRenderMixin = require('react-addons-pure-render-mixin');


var NavBar = React.createClass({
    mixins: [PureRenderMixin],
    
    render: function(){

      var buildings = this.props.buildings; 
      var isFilterApplied = this.props.isFilterApplied;

      unitCount = this.props.unitCount;
      availableUnitCount = 0;
      filteredUnitCount = 0;

      selectionText = "units available in total";

      _.each(buildings,function(building){
        availableCount = building.availableUnitData.length;
        filteredCount = building.filteredUnitData.length;

        availableUnitCount =availableUnitCount+availableCount;
        filteredUnitCount = filteredUnitCount+filteredCount;

      })

      

      if(isFilterApplied){
        unitCount = filteredUnitCount;
        selectionText = "units in your selection";
      } 
      else{
        unitCount = availableUnitCount;
        selectionText = "units available in total";
      }       

      return (
          <nav className="navbar navbar-default">
              <div className="container-fluid">
                <div className="navbar-header">
                  <div className="row">
                     <div className="col-xs-2 p-0">
                          <i className="i-marker i-icon"></i>
                      </div>
                      <div className="col-xs-6 p-0">
                          <h3 className="normal margin-none">{this.props.projectTitle} </h3>
                          <small>{unitCount} {selectionText}</small>
                      </div>
                      <div className="col-xs-4 p-0">
                        <ul className="list-inline pull-right">
                          <li> <i className="i-phone i-icon"></i></li>
                          <li onClick={this.props.showFilterModal}> <i className="i-filter i-icon"></i></li>
                        </ul>
                      </div>
                  </div>
                </div>
            </div>
        </nav>
        );
        }
});


module.exports = NavBar;