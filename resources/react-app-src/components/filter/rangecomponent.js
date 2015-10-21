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


    return (
		  <div className="row p-0 budgetOuter">
          <div className="col-xs-6">
             <select data-filterstyle = 'range' data-filtertype = {listType} name = {'min-'+listType} onChange={this.change} value={this.state.value} data-type='min'>
               <option>MIN</option>
               {minFilters}
             </select>    
          </div>  
          <div className="col-xs-6">
             <select data-filterstyle = 'range' data-filtertype = {listType} name = {'max-'+listType} onChange={this.change} value={this.state.value} data-type='max'>
               <option>MAX</option>
               {maxFilters}
             </select> 
          </div> 
        </div>
      )
  }
});

module.exports = RangeComponent;