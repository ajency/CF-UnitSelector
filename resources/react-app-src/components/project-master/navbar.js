var React = require('react');
var PureRenderMixin = require('react-addons-pure-render-mixin');


var NavBar = React.createClass({
    mixins: [PureRenderMixin],
    
    render: function(){
            return (
                <nav className="navbar navbar-default">
                    <div className="container-fluid">
                      <div className="navbar-header">
                        <div className="row">
                           <div className="col-xs-2 p-0">
                                <i className="i-back i-icon"></i>
                            </div>
                            <div className="col-xs-6 p-0">
                                <h3 className="normal margin-none">{this.props.projectTitle} </h3>
                                <small>{this.props.unitCount} units in your selection</small>
                            </div>
                            <div className="col-xs-4 p-0">
                              <ul className="list-inline">
                                <li> <i className="i-phone i-icon"></i></li>
                                <li onClick={this.props.showFilterModal}> <i className="i-filter i-icon"></i></li>
                              </ul>
                            </div>
                        </div>
                      </div>
                  </div>
              </nav>
        );
        }
});


module.exports = NavBar;