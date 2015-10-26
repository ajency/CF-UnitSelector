var React = require('react');
var RoomAttributeList = require('../tabs/roomattributelist');

var Details = React.createClass({
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
                                        <span><i className="fa fa-2x fa-bed"></i></span>
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
                        <span className="text-muted">{basicDetails.direction}Facing</span>

                        <div className="price text-muted"> <i className="fa fa-inr"></i> {basicDetails.sellingAmount}
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

    roomCardNodes = roomData.map(function(room,i){
                        return(
                            <div key={i} className="col-md-3 roomDetails text-uppercase">
                                <h5 className="text-uppercase">{room.room_name}</h5>
                                    <RoomAttributeList
                                        attributes={room.atributes}
                                    />
                            </div>
                        ); 
                             
                    });

    /*specificationNodes = basicDetails.variantAttributes.map(function(attribute,i){
        console.log(attribute);
                        return(
                            <div key={i} className="textInner col-xs-3 pNone">
                                <h5 className="text-uppercase col-xs-12">Fittings</h5>
                                <div className="col-xs-12">Kitchen: Stainless Steel Sink with Drain Board</div>
                            </div>
                        ); 
                             
                    });*/

   domToDisplay = (
        <div className="col-xs-12 detailView pNone" id="details_div">
        <div className="row">
          <div className="contentHEader">
            <span className="contentTitle text-uppercase">
              Details
            </span>
            <span className="contentText">
              Simplicity of design and strong construction from the backbone of the Metro.
            </span>
          </div>
        </div>
        <div className="col-xs-12 unit">
          <div className="row">            
            {roomCardNodes}
          </div> 
          <div className="col-xs-12 specificationOuter pNone">
            <div className="row">
            <div className="contentHEader">
              <div className="row">
              <span className="contentTitle text-uppercase">
                Specification
              </span>
              </div>
            </div>
          </div>

           <div className="row">
            <div className="textInner col-xs-4 pNone">
              <h5 className="text-uppercase col-xs-12">Fittings</h5>
              <div className="col-xs-12">Kitchen: Stainless Steel Sink with Drain Board</div>
              <div className="col-xs-12">Toilets: Branded CP Fittings and Sanitary Ware</div>
            </div>
            <div className="textInner col-xs-4 pNone">
              <h5 className="text-uppercase col-xs-12">Doors</h5>
              <div className="col-xs-12">Internal: Wooden Frame</div>
              <div className="col-xs-12">Main: Decorative with Wooden Frame</div>
            </div>
            <div className="textInner col-xs-4 pNone">
              <h5 className="text-uppercase col-xs-12">Windows</h5>
              <div className="col-xs-12">UPVC</div>  
              <div className="col-xs-12">UPVC</div>             
            </div>
            <div className="textInner col-xs-4 pNone">
              <h5 className="text-uppercase col-xs-12">Flooring</h5>
              <div className="col-xs-12">Master Bedroom: Laminated Wooden Flooring</div>
              <div className="col-xs-12">Balcony: Anti Skid Tiles</div>
              <div className="col-xs-12">Kitchen: Anti Skid Tiles</div>
              <div className="col-xs-12">Other Bedroom: RAK/Laminated Wooden Flooring</div>
              <div className="col-xs-12">Living/Dining: Marble Granite Tiles</div>
              <div className="col-xs-12">Toilets: Anti Skid Tiles</div>
            </div>
            
            <div className="textInner col-xs-4 pNone">
              <h5 className="text-uppercase col-xs-12">Walls</h5>
              <div className="col-xs-12">Kitchen: Ceramic Tiles Dado up to 2 Feet Height Above Platform</div>
              <div className="col-xs-12">Toilets: Ceramic Tiles Dado up to 7 Feet Height Above Platform</div>
              <div className="col-xs-12">Interior: Plastic Emulsion Paint</div>
              <div className="col-xs-12">Exterior: Texture Paint</div>
            </div>
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