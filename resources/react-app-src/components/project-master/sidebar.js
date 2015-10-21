var React = require('react');

var SideBar = React.createClass({
  render: function () {
    return (
             <div id="sidebar-wrapper">
                <div className="logoOuter"><i className="sideBarLogo"></i></div>
                <div className="col-xs-12 unitDetails"><small className="text-uppercase"><b>500 units Available in total</b></small></div>
                <div className="clear"></div>
                <div id="content-1" className="content" >
                    <ul className="sidebar-nav">
                        <li className="sidebar-brand">
                            <div className="card-swipe highlight">
                                <div className="row">
                                    <div className="col-xs-12">
                                        <h4 className=" margin-none text-left text-uppercase"> Tower 1</h4>
                                    </div>
                                    <div className="col-xs-12 text-muted price">
                                        From <span><i className="fa fa-inr"></i> 20 lacs</span>
                                    </div>
                                </div>
                                <div className=" swipe-unit-info row">
                                    <div className="col-xs-12 text-muted">
                                        <span>17 Floors</span>
                                        <ul>
                                            <li></li>
                                        </ul>
                                        <span>2, 3 BHK </span>
                                    </div>
                                </div>
                                <div className="swipe-footer">
                                    <div className="col-xs-12">
                                        <sm>40</sm>
                                        <span className="units"><b>Available</b> <br/> 60 total units</span>
                                        <div className="arrow">
                                            <a href="#">
                                                <h3 className="margin-none"><i className="fa fa-angle-right"></i></h3>
                                            </a>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </li>
                        <li className="sidebar-brand">
                            <div className="card-swipe">
                                <div className="row">
                                    <div className="col-xs-12">
                                        <h4 className=" margin-none text-left text-uppercase">Tower 2</h4>
                                    </div>
                                    <div className="col-xs-12 text-muted price">
                                        From <span><i className="fa fa-inr"></i> 20 lacs</span>
                                    </div>
                                </div>
                                <div className=" swipe-unit-info row">
                                    <div className="col-xs-12 text-muted">
                                        <span>17 Floors</span>
                                        <ul>
                                            <li></li>
                                        </ul>
                                        <span>2, 3 BHK </span>
                                    </div>
                                </div>
                                <div className="swipe-footer">
                                    <div className="col-xs-12">
                                        <sm>50</sm>
                                        <span className="units"><b>Available</b> <br/> 60 total units</span>
                                        <div className="arrow">
                                            <a href="#">
                                                <h3 className="margin-none"><i className="fa fa-angle-right"></i></h3>
                                            </a>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </li>
                        <li className="sidebar-brand">
                            <div className="card-swipe">
                                <div className="row">
                                    <div className="col-xs-12">
                                        <h4 className=" margin-none text-left text-uppercase">Tower 3</h4>
                                    </div>
                                    <div className="col-xs-12 text-muted price">
                                        From <span><i className="fa fa-inr"></i> 20 lacs</span>
                                    </div>
                                </div>
                                <div className=" swipe-unit-info row">
                                    <div className="col-xs-12 text-muted">
                                        <span>17 Floors</span>
                                        <ul>
                                            <li></li>
                                        </ul>
                                        <span>2, 3 BHK </span>
                                    </div>
                                </div>
                                <div className="swipe-footer">
                                    <div className="col-xs-12">
                                        <sm>30</sm>
                                        <span className="units"><b>Available</b> <br/> 60 total units</span>
                                        <div className="arrow">
                                            <a href="#">
                                                <h3 className="margin-none"><i className="fa fa-angle-right"></i></h3>
                                            </a>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </li>
                    </ul>
                </div>

            </div>
    )
  }
});

module.exports = SideBar;