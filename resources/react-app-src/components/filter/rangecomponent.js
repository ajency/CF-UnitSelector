var React = require('react');

var RangeComponent = React.createClass({

  getInitialState: function() {
         return {
             minValue: _.min(this.props.listItems),
             maxValue: _.max(this.props.listItems)
         }
     },

  change: function(event){
    filterEvent = event;

    if(event.target.dataset.type === 'min'){
      this.setState({minValue: event.target.value});
      filterEvent.min = event.target.value;
      filterEvent.max = this.state.maxValue;
    }else{
      this.setState({maxValue: event.target.value});
      filterEvent.max = event.target.value;
      filterEvent.min = this.state.minValue;
    }

    this.props.selectFilter(filterEvent);
  },
  

  render: function () {

    var listItems = this.props.listItems;
    var listType = this.props.listType;
    var searchedFilter = this.props.searchedFilter;

    var selectedoption = this.state.value;

    if(!_.isUndefined(searchedFilter)){
      if(_.isEmpty(searchedFilter)){
        selectedoption = false;
      }
    }



    minFilters = listItems.map(function(item,i){
        if(this.state.maxValue.length>0){
      if(item<=this.state.maxValue){
        return(
          <option key={i} value={item}>{item}</option>
          );
      }
    }else{
      return(
        <option key={i} value={item}>{item}</option>
        );
    }
    }.bind(this));

    maxFilters = listItems.map(function(item,i){
        if(this.state.minValue.length>0){
      if(item>=this.state.minValue){
        return(
          <option key={i} value={item}>{item}</option>
          );
      }
    }else{
      return(
        <option key={i} value={item}>{item}</option>
        );
    }
    }.bind(this));

    var rangeDom;

    if(window.isMobile){
      rangeDom = (
        <div className="row p-0 budgetOuter">
           <div className="col-xs-6">
             <select data-filterstyle = 'range' data-filtertype = {listType} name = {'min-'+listType} onChange={this.change} value={selectedoption} data-type='min'>
               <option>MIN</option>
               {minFilters}
             </select>    
          </div>  
          <div className="col-xs-6">
             <select data-filterstyle = 'range' data-filtertype = {listType} name = {'max-'+listType} onChange={this.change} value={selectedoption} data-type='max'>
               <option>MAX</option>
               {maxFilters}
             </select> 
          </div> 
        </div>
        );

    }else{
      rangeDom = (        
      <li className="budgetOuter">
          <div className="col-xs-5">
             <select data-filterstyle = 'range' data-filtertype = {listType} name = {'min-'+listType} onChange={this.change} value={selectedoption} data-type='min'>
               <option>MIN</option>
               {minFilters}
             </select>    
          </div>  
          <div className="col-xs-2 text-center horizontalArrow">
                                               <i class="fa fa-arrows-h"></i>
                                             </div>
          <div className="col-xs-5">
             <select data-filterstyle = 'range' data-filtertype = {listType} name = {'max-'+listType} onChange={this.change} value={selectedoption} data-type='max'>
               <option>MAX</option>
               {maxFilters}
             </select> 
          </div> 
        </li>
        );
    }


    return rangeDom;
  }
});

module.exports = RangeComponent;