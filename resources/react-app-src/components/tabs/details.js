var React = require('react');
var RoomAttributeList = require('../tabs/roomattributelist');

var Details = React.createClass({


    handleClick: function (event) {
        var status = $("#main").find('#'+event.target.id).text();

        if(status === 'More'){
            $("#main").find('#'+event.target.id).text('Less');
            $("#main").find('#'+event.target.id).parents('.roomDetails').find('.hiddenContent').css({
            'display': 'block'
            });
        }

        if(status === 'Less'){
            $("#main").find('#'+event.target.id).text('More');
            $("#main").find('#'+event.target.id).parents('.roomDetails').find('.hiddenContent').css({
            'display': 'none'
            });
        }
    },




  componentDidMount: function() {
    if(!window.isMobile){
      $('.attributeList').each(function(event) {
        console.log('attribute list');
        $(this).readmore({
          moreLink: '<a href="#">More</a>',
          collapsedHeight: 120,
          afterToggle: function(trigger, element, expanded) {
            if(! expanded) { // The "Close" link was clicked
              $('html, body').animate({scrollTop: element.offset().top}, {duration: 100});
            }
          }
        });
      });
    }
  },




  render: function () {
    var basicDetails = this.props.basicDetails;
    var roomData = this.props.roomData;

var domToDisplay ;


if(window.isMobile){

    roomCardNodes = roomData.map(function(room,i){
                        return(
                            <div key={i} className="col-xs-12 details">

                                <div className="flatDetails">
                                    <h5 className="text-uppercase">Apartment Attributes </h5>
                                </div>
                                <div className="projectDetails">
                                    <div className="col-xs-12 roomHeading">
                                        <h4 className="text-uppercase">{room.room_name}</h4>
                                    </div>

                                    <RoomAttributeList
                                        attributes={room.atributes}
                                    />
                                </div>

                            </div>
                        );

                    });


    domToDisplay = (
            <div role="tabpanel" className="tab-pane active" id="home">
                <div className="col-xs-12 details">
                    <div className="flatDetails">
                        <h4 className="text-uppercase">{basicDetails.name}</h4>
                        <span className="text-muted unitFacing">{basicDetails.direction} Facing</span>

                        <div className="price text-muted"> From <i className="fa fa-inr"></i> {basicDetails.sellingAmount}
                            <span className="availability">{s.humanize(basicDetails.status)}</span>
                        </div>
                    </div>
                    <div className="projectDetails">
                        <div className="row">
                            <div className="col-xs-6 left">
                                Property Type
                            </div>
                            <div className="col-xs-6 right">
                                {basicDetails.propertyTypeName}
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-xs-6 left">
                                Floor
                            </div>
                            <div className="col-xs-6 right">
                                {basicDetails.floor} floor
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-xs-6 left">
                                Area
                            </div>
                            <div className="col-xs-6 right">
                                {basicDetails.superBuiltUpArea} sqft.
                            </div>
                        </div>
                    </div>
                </div>
                {roomCardNodes}
            </div>
        );

}else{

    var roomDataNode;


    roomDataNode = roomData.map(function(room,i){
                    return(
                            <div key={i} className="roomDetails text-uppercase">
                              <div  id={i} className="attributeList">
                                <h5 className="text-uppercase">{room.room_name}</h5>
                                    <RoomAttributeList
                                        attributes={room.atributes}
                                    />
                                </div>
                            </div>
                        );
                    }.bind(this));



   specificationNodes = _.map( basicDetails.variantAttributes , function(val, key){
        return(
        <div key={key} className="textInner col-xs-12 pNone">
              <h5 className="text-uppercase col-xs-2">{key}:</h5>
              <div className="col-xs-10">{val}</div>
            </div>
        );
    });



   domToDisplay = (
        <div className="col-xs-12 detailView outerDivs pNone" id="details_div">
        <div className="row">
          <div className="contentHEader">
            <span className="contentTitle text-uppercase">
              Details
            </span>
            <span className="contentText">
              Explore
            </span>
          </div>
        </div>
        <div className="col-xs-12 unit">
          <div className="row">
            {roomDataNode}
          </div>
          <div className="col-xs-12 specificationOuter pNone">
            <div className="row">
            <div className="contentHEader">
              <div className="row">
              <span className="contentTitle text-uppercase">
                Specification
              </span>
              <span className="contentText">
                Learn more about the specifics of your  apartment.
              </span>
              </div>
            </div>
          </div>

            <div className="row">
                {specificationNodes}
            </div>

          </div>

        </div>
      </div>
   );
}


    return domToDisplay;
  }
});

module.exports = Details;
