var React = require('react');

var RoomAttributeList = React.createClass({
  render: function () {
  	attributes = this.props.attributes;

    roomAttribNodes = attributes.map(function(attribute,i){

    					attributeKey = s.humanize(attribute.attribute_key);
    					attributeValue = s.humanize(attribute.attribute_value);
                        return(
                            <div key={i} className="row">
                                <div className="col-xs-6 left">
                                    {attributeKey}
                                </div>
                                <div className="col-xs-6 right">
                                    {attributeValue}
                                </div>
                            </div>
                        ); 
                             
                    });   	
    return (
		<div>
		   {roomAttribNodes}
		</div>
    )
  }
});

module.exports = RoomAttributeList;