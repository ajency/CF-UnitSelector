var React = require('react');

var PriceFormat = React.createClass({

  render: function () {

  	var amount = parseInt(this.props.numPrice);
    var formatedAmount;
    if(amount>=10000000){
      formatedAmount = Math.round((amount/10000000),1)+' Cr';
    }else if(amount>=100000){
      formatedAmount = Math.round((amount/100000),1)+' L';
    }else if(amount>=1000){
      formatedAmount = amount;
    }else if(amount<1000){
      formatedAmount = amount;
    }else{
      formatedAmount = amount;
    }


    return (
      <span>{formatedAmount}</span>
      );
  }

});

module.exports = PriceFormat;
