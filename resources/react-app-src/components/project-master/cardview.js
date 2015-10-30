var React = require('react');
var PureRenderMixin = require('react-addons-pure-render-mixin');
var Link = require('react-router-component').Link
var classNames = require('classnames');



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

    render: function() {
        var buildingData = this.props.building;
        var buildingId = buildingData.id;
        var isFilterApplied = this.props.isFilterApplied;
        var unitData = [];
        var noOfFloors = 0;
        var buildingName = "";
        var supportedUnitTypeString = " ";
        var buildingUrl = " ";
        var minStartPrice = buildingData.minStartPrice;
        
        var unitCount = 0;
        var unitCountDisplayString = "available"; 

        var isZeroUnits = isZeroInSelection = false;

        var mainDom;

        if (!_.isEmpty(buildingData)){
          
          unitData = buildingData.unitData;
          availableUnitData = buildingData.availableUnitData;
          filteredUnitData = buildingData.filteredUnitData;
          noOfFloors = buildingData.no_of_floors;
          buildingName = buildingData.building_name;
          

          buildingUrl = "/buildings/"+buildingData.id;

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
            unitCountDisplayString = "matching your selection";
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

        

        domToDisplay = ( <div><sm>{unitCount}</sm><span className="units"><b>{unitCountDisplayString}</b><br/>{unitData.length} total units</span>
                          <div className={arrowClasses}>
                              <Link href={buildingUrl}><h3 className="margin-none"><i className="fa fa-angle-right"></i></h3></Link>
                          </div>
                          </div>);

        if(isZeroUnits)
          domToDisplay = (<b>Units Not Available</b>);



        if(window.isMobile){
          mainDom = ( <div className={cardClasses} data-unitid={buildingId}>
                          <div className="row">
                              <div className="col-xs-12">
                                  <h4 className=" margin-none text-left"> {buildingName}</h4>
                              </div>
                              <div className="col-xs-12 text-muted price">
                                    From <b className="price-tag"><i className="fa fa-inr"></i> {minStartPrice} </b>
                              </div>
                          </div>
                          
                          <div className=" swipe-unit-info row">
                             <div className="col-xs-12 text-muted">
                                <span> {noOfFloors} Floors</span><li></li> <span> {supportedUnitTypeString} </span>
                             </div>  
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

          buildingToBeHighlighted = this.props.buildingToBeHighlighted;
          buildingToBeHighlightedId = buildingToBeHighlighted.id;

          if(buildingId === buildingToBeHighlightedId){
            
            // if no units in the tower are enabled then disable cardview
            cardClasses = classNames({
              'card-swipe': true,
              'not-released': isZeroUnits,
              'highlight': true
            });             

          }

          // give card an id to help in scrolling
          cardId = "building"+buildingId;

          mainDom = (   <li className="sidebar-brand">
                            <div className={cardClasses} onClick={this.selectCard} data-unitid={buildingId} id={cardId}>
                                <div className="row">
                                    <div className="col-xs-12">
                                        <h4 className=" margin-none text-left text-uppercase"> {buildingName}</h4>
                                    </div>
                                    <div className="col-xs-12 text-muted price">
                                        From <b><i className="fa fa-inr"></i> {minStartPrice}</b>
                                    </div>
                                </div>
                                <div className=" swipe-unit-info row">
                                    <div className="col-xs-12 text-muted">
                                        <span>{noOfFloors} Floors</span>
                                        <ul>
                                            <li></li>
                                        </ul>
                                        <span>{supportedUnitTypeString}</span>
                                    </div>
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
