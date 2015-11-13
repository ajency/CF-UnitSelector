var React = require('react');

var PriceFormat = React.createClass({
  
  render: function () {

  	var amount = parseInt(this.props.numPrice);
    var formatedAmount;
    if(amount>=10000000){
      formatedAmount = Math.round((amount/10000000),1)+' crore';
    }else if(amount>=100000){
      formatedAmount = Math.round((amount/100000),1)+' lakh';
    }else{
      formatedAmount = amount;
    }

    return (
    <span className="amount"><i className="fa fa-inr"></i>&nbsp;{formatedAmount}</span>
      );
  } 

});

module.exports = PriceFormat;