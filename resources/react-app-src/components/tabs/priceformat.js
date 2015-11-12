var React = require('react');

var PriceFormat = React.createClass({
  
  render: function () {

  	var amount = parseInt(this.props.numPrice);
    var formatedAmount;
    if(amount>=10000000){
      formatedAmount = Math.round((amount/10000000),1)+' crore';
    }else if(amount>=100000){
      formatedAmount = Math.round((amount/100000),1)+' lakh';
    }else if(amount>=1000){
      formatedAmount = Math.round((amount/1000),1)+' thousand';
    }else if(amount<1000){
      formatedAmount = amount;
    }

    return (
    <span className="amount"><i className="fa fa-inr"></i>{formatedAmount}</span>
      );
  } 

});

module.exports = PriceFormat;