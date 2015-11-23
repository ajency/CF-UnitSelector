var React = require('react');
var classNames = require('classnames');

var FilterCount = React.createClass({

    render: function () {

      var filterClass,filterCount;

      var appliedFilters = this.props.appliedFilters;

      var newAppliedFiltersCount = [];
      _.each(appliedFilters, function(filter, key){
        if(filter.length>0){
          newAppliedFiltersCount.push(key);
        }
      });

      if(newAppliedFiltersCount.length>0){
        if(this.props.screen === 'desktop'){
          filterClasses = classNames({
            "filterCountDesk" : true
          });
        }else{
          filterClasses = classNames({
            "filterNumber" : true
          });
        }
        filterCount = newAppliedFiltersCount.length;
      }else{
        if(this.props.screen === 'desktop'){
          filterClasses = classNames({
            "filterCountDesk" : false
          });
        }else{
          filterClasses = classNames({
            "filterNumber" : false
          });
        }
        filterCount = "";
      }

        return (
            <span className={filterClasses}>{filterCount}</span>
          );
    }

});

module.exports = FilterCount;
