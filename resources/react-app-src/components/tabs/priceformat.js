var React = require('react');

var PriceFormat = React.createClass({

  render: function () {

  	var amount = parseInt(this.props.numPrice);
    var formatedAmount;
    if(amount>=10000000){
      var modulus = Math.round((amount%10000000)/100000,1);
      if(modulus>0){
        var decimal = '.'+modulus;
      }else{
        var decimal = '';
      }
      formatedAmount = Math.round((amount/10000000),1)+decimal+' Cr';
    }else if(amount>=100000){
      var modulus = Math.round((amount%100000)/1000,1);
      if(modulus>0){
        var decimal = '.'+modulus;
      }else{
        var decimal = '';
      }
      formatedAmount = Math.round((amount/100000),1)+decimal+' L';
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
