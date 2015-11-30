var React = require('react');
var PureRenderMixin = require('react-addons-pure-render-mixin');
var Link = require('react-router-component').Link
var classNames = require('classnames');
var PriceFormat = require('../tabs/priceformat');



var CardView = React.createClass({

    getInitialState: function(){
      return {
        isHighlighted:false
      };
    },
    selectCard: function(event){

      this.props.destroyTooltip();

      building = this.props.building;

      this.props.rotateImage(building);

      // newState = {};
      // if(this.state.isHighlighted){
      //   newState.isHighlighted = false;
      // }else{
      //   newState.isHighlighted = true;
      // }

      // this.setState(newState);
    },

    getNextStepUrl: function(navigationType, navigationId){

      var url = "";

      switch(navigationType){
        case "project":
          url = "/buildings/";
          break;
        case "building":
          url = "/buildings/"+navigationId+"/group/";
          break;
        case "group":
          url = "/units/";
          break;
        default:
          url = "/buildings/";
      }

      return url;


    },


    render: function() {



        var buildingData = this.props.building;
        var buildingId = buildingData.id;
        var isFilterApplied = this.props.isFilterApplied;
        var unitData = [];
        var noOfFloors = 0;
        var buildingName = "";
        var supportedUnitTypeString = " ";
        var baseUrl = "";
        var buildingUrl = "";
        var minStartPrice = buildingData.minStartPrice;

        var unitCount = 0;
        var unitCountDisplayString = "available";

        var isZeroUnits = isZeroInSelection = false;

        var cardListFor = this.props.cardListFor;
        var cardListForId = this.props.cardListForId;

        var mainDom;

        if (!_.isEmpty(buildingData)){

          unitData = buildingData.unitData;
          availableUnitData = buildingData.availableUnitData;
          filteredUnitData = buildingData.filteredUnitData;
          noOfFloors = buildingData.no_of_floors;
          buildingName = buildingData.building_name;

          baseUrl = this.getNextStepUrl(cardListFor,cardListForId);
          buildingUrl =  baseUrl+buildingData.id;

          _.each(buildingData.supportedUnitTypes, function(supportedUnitType , i){

                len = buildingData.supportedUnitTypes.length

                if(i==(len-1)){
                    supportedUnitTypeString += supportedUnitType;
                }
                else{
                    supportedUnitTypeString += supportedUnitType+", ";
                }

           });

          // Check if applied filters have atleast one filter array with size greater than 0 m if yes => filters have been applied else not

          if(isFilterApplied){
            unitCount = filteredUnitData.length;

            if(filteredUnitData.length > 0)
              unitCountDisplayString = "matching your selection";
            else
              unitCountDisplayString = "not matching your selection";  
          }
          else{
            unitCount = availableUnitData.length;
            unitCountDisplayString = "available";
          }


        }

        if(availableUnitData.length==0){
          isZeroUnits = true;
        }
        if(filteredUnitData.length==0){
          isZeroInSelection = true;
        }

        // if no units in the tower are enabled then disable cardview
        var cardClasses = classNames({
          'card-swipe': true,
          'not-released': isZeroUnits,
          'highlight': (window.isMobile === false) && (this.state.isHighlighted)
        });


        var arrowClasses = classNames({
          arrow: true,
          hide: isZeroUnits||(isZeroInSelection && isFilterApplied)
        });


        if(cardListFor==="group"){
            domToDisplay = ( <div>
                                <span className="units"><b>{unitCountDisplayString}</b></span>
                                <div className={arrowClasses}>
                                  <Link href={buildingUrl}><h3 className="margin-none"><i className="fa fa-angle-right"></i></h3></Link>
                                </div>
                              </div>);

            if(isZeroUnits)
              domToDisplay = (<b>Unit Not Available</b>);             
        }
        else{
            domToDisplay = ( <div><sm>{unitCount}</sm><span className="units"><b>{unitCountDisplayString}</b><br/>{unitData.length} total units</span>
                              <div className={arrowClasses}>
                                  <Link href={buildingUrl}><h3 className="margin-none"><i className="fa fa-angle-right"></i></h3></Link>
                              </div>
                              </div>);


            if(isZeroUnits)
              domToDisplay = (<b>Units Not Available</b>);              
        }




        if(window.isMobile){

          unitTypeDom = (<div className="col-xs-12 text-muted"><span> {noOfFloors}  &nbsp;Floors</span><li></li> <span> {supportedUnitTypeString} </span></div>  );

          if((!_.isUndefined(buildingData.unitType))&&(!_.isUndefined(buildingData.superBuiltUpArea))){
            unitTypeDom = (<div className="col-xs-12 text-muted"><span> {buildingData.unitType}</span><li></li> <span> {buildingData.superBuiltUpArea} &nbsp;sqFt </span></div> );
          }

          mainDom = ( <div className={cardClasses} data-unitid={buildingId}>
                            <div className="row">
                                <div className="col-xs-12">
                                    <h4 className=" margin-none text-left"> {buildingName}</h4>
                                </div>
                                <div className="col-xs-12 text-muted price">
                                    From <b className="price-tag"><i className="fa fa-inr"></i> <PriceFormat numPrice={minStartPrice} /> </b>

                              </div>
                          </div>

                          <div className=" swipe-unit-info row">

                                {unitTypeDom}

                          </div>

                          <div className="row swipe-footer">
                               <div className="col-xs-12 text-muted text-uppercase">
                                  {domToDisplay}
                                </div>
                          </div>

                      </div>
                    );

        }
        else{

          var buildingToBeHighlighted = this.props.buildingToBeHighlighted;

          if(buildingToBeHighlighted){
            var buildingToBeHighlightedId = buildingToBeHighlighted.id;

          if(buildingId === buildingToBeHighlightedId){

            // if no units in the tower are enabled then disable cardview
            cardClasses = classNames({
              'card-swipe': true,
              'not-released': isZeroUnits,
              'highlight': true
            });
          }
          }



          // give card an id to help in scrolling
          cardId = "building"+buildingId;

          unitTypeDom = ( <div className="col-xs-12 text-muted"> <span>{noOfFloors} &nbsp; Floors</span> <ul> <li></li> </ul> <span>{supportedUnitTypeString}</span> </div>);

          if((!_.isUndefined(buildingData.unitType))&&(!_.isUndefined(buildingData.superBuiltUpArea))){
            unitTypeDom = (<div className="col-xs-12 text-muted"><span> {buildingData.unitType}</span><ul><li></li> </ul> <span> {buildingData.superBuiltUpArea} &nbsp;sqFt </span></div> );
          }

          mainDom = (   <li className="sidebar-brand">
                            <div className={cardClasses} onClick={this.selectCard} data-unitid={buildingId} id={cardId}>
                                <div className="row">
                                    <div className="col-xs-12">
                                        <h4 className=" margin-none text-left text-uppercase"> {buildingName}</h4>
                                    </div>
                                    <div className="col-xs-12 text-muted price">
                                        From <b><i className="fa fa-inr"></i> <PriceFormat numPrice={minStartPrice} /></b>
                                    </div>
                                </div>
                                <div className=" swipe-unit-info row">
                                  {unitTypeDom}
                                </div>
                                <div className="swipe-footer">
                                    <div className="col-xs-12">
                                        {domToDisplay}
                                    </div>
                                </div>
                            </div>
                        </li>
                  );
        }


        return mainDom;
    }
});

module.exports = CardView;
