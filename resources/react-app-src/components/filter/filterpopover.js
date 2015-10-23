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

	render: function(){

		var filterCloseClass;

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


		var dom = (  <div className="filterOuter">
	                    <nav className={filterClass} id="filters">
	                        <ul className="filterUl">
	                            <li className="filterLiTop">
	                                <h5 className="text-uppercase">Filters (<span className="filterHeader"> 2 </span>)&nbsp; &nbsp; &nbsp; <span className="filterHeader" >Clear filters</span></h5>
	                                <button className="btn btn-sm btn-default btn-primary text-uppercase pull-right" onClick = {this.props.applyFilters}>apply</button>
	                            </li>

	                            {filterTypeNodes}
 
	                        </ul>
	                        <a className="toggle" href="#" onClick = {this.closeFilterPopOver}></a>
	                    </nav>
	                </div>
	            );

	    return dom;	
	}


});

module.exports = FilterPopover;