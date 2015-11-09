var React = require('react');
var Link = require('react-router-component').Link

var SimilarUnits = React.createClass({


  render: function () {

    var similarUnits = this.props.similarUnits;

    
    console.log(window.location.pathname);

      var similarNodes =  _.map( similarUnits , function(unit, key){
        var unitUrl = "/units/"+unit.id;
                        return(
                            <div className="col-xs-3" key={key}>
              <div className="card-swipe">
                <div className="row">
                   <div className="col-xs-12">
                      <h5 className=" margin-none text-left text-uppercase"> {unit.name}</h5>
                   </div>
                   <div className="col-xs-12 text-muted price">
                      From <span className="amount"><i className="fa fa-inr"></i> {unit.sellingAmount}</span>
                   </div>
                </div>
                <div className=" swipe-unit-info row">
                   <div className="col-xs-12 text-muted">
                      <span>{unit.unitType} </span>
                      <ul>
                         <li></li>
                      </ul>
                      <span>{unit.builtUpArea+' SQFT.'}</span>
                   </div>
                </div>
                <div className="swipe-footer">
                   <div className="col-xs-12 matchingSelection">
                       Matching your selection
                       <div className="arrow">
                         <Link href={unitUrl}><h3 className="margin-none"><i className="fa fa-angle-right"></i></h3></Link>
                      </div>
                    </div>
                </div>
             </div>
            </div>
                        ); 
                             
                    });





    return (
      <div className="col-xs-12 pNone similarFlat">
        <div className="row">
          <div className="contentHEader">
            <span className="contentTitle text-uppercase">
              Similar flat based on your selection
            </span>            
          </div>
        </div>
        <div className="col-xs-12 moreFlats">
          <div className="row">
          {similarNodes}
          </div>
        </div>
        </div>
        );
 }
});

module.exports = SimilarUnits;