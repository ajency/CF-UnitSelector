var React = require('react');

var SocietyAmenities = React.createClass({


  render: function () {


  var allAmenities = this.props.allAmenities;
  var unitAmenities = this.props.unitAmenities;

  amenitiesNodes = _.map( allAmenities , function(val, key){

    if(_.indexOf(unitAmenities, val.toString()) > -1){
      var classStatus = '';
    }else{
      var classStatus = 'disabled';
    }
                        return(
                            <div key={key} className={'col-xs-2 '+classStatus}> 
                              <span className="icon"><i className="fa fa-star-o"></i></span>
                              <span className="text text-uppercase">{val}</span>
                            </div>  
                        ); 
                             
                    });




    return (
      <div className="col-xs-12 amenitiesView outerDivs pNone" id="societyEmenities_div">
        <div className="row">
          <div className="contentHEader">
            <span className="contentTitle text-uppercase">
              Social amenities
            </span>
            <span className="contentText">
              Simplicity of design and strong construction from the backbone of the Metro.
            </span>
          </div>
        </div>
        <div className="col-xs-12 amenitiesDetails">
          <div className="row">
            {amenitiesNodes}                                           
          </div> 
        </div>
        </div>
        );
 }
});

module.exports = SocietyAmenities;