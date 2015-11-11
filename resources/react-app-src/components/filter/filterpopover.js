var React = require('react');
var PureRenderMixin = require('react-addons-pure-render-mixin');
var classNames = require('classnames');
var FilterType = require('../filter/filtertype');

var filterState = {
   'closed': true
 };

var FilterPopover = React.createClass({

    getInitialState: function() {
        return filterState;
    },	

    componentDidMount: function() {
        var customScrollBarSettings = {
         autoHideScrollbar:true,
         theme:"rounded"
       };
        
       $(this.refs.filterUl).mCustomScrollbar(customScrollBarSettings);
    },

    closeFilterPopOver: function(evt){
    	oldState = this.state;
    	newState = {};

    	if(oldState.closed){
    		newState.closed = false;
    	}else{
    		newState.closed = true;
    	}
    	this.setState(newState);
    },

    applyFilters : function(){
        // close popover
        this.setState({closed:true});

        // call parent apply filters function
        this.props.applyFilters();
    },

    unapplyFilters : function(){
        // close popover
        this.setState({closed:true});

        // call parent apply filters function
        this.props.unapplyFilters();
    },
    

	render: function(){

		var filterCloseClass , filterCountDisp, filterCountClasses;
        var applied_filters = this.props.applied_filters;

		filterClass = classNames({
			"float-nav": true,
			"closed": this.state.closed
		});

        filterTypes = this.props.filterTypes;

        search_filters= this.props.search_filters

        filterTypeNodes = filterTypes.map(function(filterType,i){
                            
                            if(_.isEmpty(search_filters))
                                searchedFilter = [];
                            else
                                searchedFilter = search_filters[filterType.type];

                            return(
                                <div key={i}>
                                <FilterType  
                                    filterType={filterType}
                                    selectFilter={this.props.selectFilter}
                                    searchedFilter = {searchedFilter}
                                /> 
                                </div>
                            ); 
                                 
                        }.bind(this));	

      var appliedFilterCount = "";  
      if(_.isEmpty(applied_filters)){
        appliedFilterCount = "";
        
        filterCountClasses = classNames({
          "filterNumber" : false
        });

        filterCountDisp = (<span className="filterHeader"> {appliedFilterCount} </span>);
      }
      else{
        /*appliedFilterKeys = _.keys(applied_filters);
        appliedFilterCount = appliedFilterKeys.length;*/



        var newAppliedFiltersCount = [];
        _.each(applied_filters, function(filter, key){
          if(filter.length>0){
            newAppliedFiltersCount.push(key);
            }
        });

        appliedFilterCount = newAppliedFiltersCount.length;




        filterCountClasses = classNames({
          "filterCountDesk" : true
        });

        filterCountDisp = (<span className="filterHeader">( {appliedFilterCount} )</span>);
      }        

        divStyle = {
            overflow:"hidden",
             height:"100%",
             float:"left",
            width:"100%"

        };

		var dom = (  <div className="filterOuter">
	                    <nav className={filterClass} id="filters">
                            <div style={divStyle}>
                                    <div className="filterLiTop">
                                        <h5 className="text-uppercase">Filters {filterCountDisp}</h5>
                                        <button className="btn btn-sm btn-default btn-primary text-uppercase pull-right" onClick = {this.applyFilters}>apply</button>
                                        <span className="filterHeader btn-link link" onClick={this.unapplyFilters}>Reset</span>
                                    </div>
                                <div ref="filterUl" className="filterUl">
                                    <ul>
                                        {filterTypeNodes}
                                    </ul>                                
                                </div>
                            </div>
	                        
	                        <a className="toggle" onClick = {this.closeFilterPopOver}></a>
                            <span className={filterCountClasses}>{appliedFilterCount}</span>
	                    </nav>
	                </div>
	            );

	    return dom;	
	}


});

module.exports = FilterPopover;