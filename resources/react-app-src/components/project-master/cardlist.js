var React = require('react');

var CardList = React.createClass({
    render: function() {

        return (
            <div className="bottom-card">
                <div className="blue">
                    <div className="slider center">
                    {this.props.children}
                    </div>
                </div>
            </div>
        );
    }
});

module.exports = CardList;