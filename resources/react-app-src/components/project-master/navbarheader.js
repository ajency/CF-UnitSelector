var React = require('react');
var PureRenderMixin = require('react-addons-pure-render-mixin');
var classNames = require('classnames');


var NavBarHeader = React.createClass({

render: function(){

	return (
        <div className="navbar-header">
        <div className="row">
            <div className="col-sm-3">
                <a href="#" className="sun-toggle btn btn-default btn-sm">
                    <i className="fa fa-sun-o"></i>
                    <span className="sunText text-uppercase">Sun</span>
                </a>
            </div>
            <div className="col-sm-3 col-sm-offset-3">
                <div className="filterOuter">
                    <nav className="float-nav closed" id="filters">
                        <ul className="filterUl">
                            <li className="filterLiTop">
                                <h5 className="text-uppercase">Filters (<span className="filterHeader"> 2 </span>)&nbsp; &nbsp; &nbsp; <span className="filterHeader">Clear filters</span></h5>
                            </li>
                            <li>
                                <h6 className="text-uppercase">Unit type</h6>
                            </li>
                            <li className="filterCheckbox">
                                <div className="row">
                                    <div className="col-xs-4">
                                        <input type="checkbox" />
                                        <label className="checkboxLabel"></label>
                                        <label>1BHK</label>
                                    </div>
                                    <div className="col-xs-4">
                                        <input type="checkbox" />
                                        <label className="checkboxLabel"></label>
                                        <label>2BHK</label>
                                    </div>
                                    <div className="col-xs-4">
                                        <input type="checkbox" />
                                        <label className="checkboxLabel"></label>
                                        <label>3BHK</label>
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="col-xs-4">
                                        <input type="checkbox" />
                                        <label className="checkboxLabel"></label>
                                        <label>4BHK</label>
                                    </div>
                                    <div className="col-xs-8">
                                        <input type="checkbox" />
                                        <label className="checkboxLabel"></label>
                                        <label>4BHK (Penthouse)</label>
                                    </div>
                                </div>
                            </li>
                            <li>
                                <h6 className="text-uppercase">Budget</h6>
                            </li>
                            <li className="budgetOuter">
                                <div className="col-xs-6">
                                    <select>
                                        <option>MIN</option>
                                        <option>10</option>
                                        <option>20</option>
                                        <option>30</option>
                                        <option>40</option>
                                    </select>
                                </div>
                                <div className="col-xs-6">
                                    <select>
                                        <option>MAX</option>
                                        <option>10</option>
                                        <option>20</option>
                                        <option>30</option>
                                        <option>50</option>
                                    </select>
                                </div>
                            </li>
                            <li>
                                <h6 className="text-uppercase">Area</h6>
                            </li>
                            <li className="budgetOuter">
                                <div className="col-xs-6">
                                    <select>
                                        <option>MIN</option>
                                        <option>10</option>
                                        <option>20</option>
                                        <option>30</option>
                                        <option>40</option>
                                    </select>
                                </div>
                                <div className="col-xs-6">
                                    <select>
                                        <option>MAX</option>
                                        <option>10</option>
                                        <option>20</option>
                                        <option>30</option>
                                        <option>50</option>
                                    </select>
                                </div>
                            </li>
                            <li className="additionalFilters">
                                <h6 className="text-uppercase">Additional Filters <i className="fa fa-angle-down"></i></h6>
                            </li>
                            <li className="filterCheckbox moreFilters">
                                <ul>
                                    <li>
                                        <h6 className="text-uppercase">Flooring</h6>
                                    </li>
                                    <li className="facingContent">
                                        <div className="row">
                                            <div className="col-xs-4">
                                                <input type="checkbox" />
                                                <label className="checkboxLabel"></label>
                                                <label>Wooden</label>
                                            </div>
                                            <div className="col-xs-4">
                                                <input type="checkbox" />
                                                <label className="checkboxLabel"></label>
                                                <label>Vertified Tiles</label>
                                            </div>
                                            <div className="col-xs-4">
                                                <input type="checkbox" />
                                                <label className="checkboxLabel"></label>
                                                <label>Marble</label>
                                            </div>
                                        </div>
                                    </li>
                                    <li>
                                        <h6 className="text-uppercase">Views</h6>
                                    </li>
                                    <li className="facingContent">
                                        <div className="row">
                                            <div className="col-xs-4">
                                                <input type="checkbox" />
                                                <label className="checkboxLabel"></label>
                                                <label>Swimming pool</label>
                                            </div>
                                            <div className="col-xs-4">
                                                <input type="checkbox" />
                                                <label className="checkboxLabel"></label>
                                                <label>Club house</label>
                                            </div>
                                            <div className="col-xs-4">
                                                <input type="checkbox" />
                                                <label className="checkboxLabel"></label>
                                                <label>Playground</label>
                                            </div>
                                        </div>
                                        <div className="row">
                                            <div className="col-xs-4">
                                                <input type="checkbox" />
                                                <label className="checkboxLabel"></label>
                                                <label>Courtyard</label>
                                            </div>
                                            <div className="col-xs-4">
                                                <input type="checkbox" />
                                                <label className="checkboxLabel"></label>
                                                <label>Parking</label>
                                            </div>
                                        </div>
                                    </li>
                                    <li>
                                        <h6 className="text-uppercase">Facings</h6>
                                    </li>
                                    <li className="facingContent">
                                        <div className="row">
                                            <div className="col-xs-4">
                                                <input type="checkbox" />
                                                <label className="checkboxLabel"></label>
                                                <label>North</label>
                                            </div>
                                            <div className="col-xs-4">
                                                <input type="checkbox" />
                                                <label className="checkboxLabel"></label>
                                                <label>South</label>
                                            </div>
                                            <div className="col-xs-4">
                                                <input type="checkbox" />
                                                <label className="checkboxLabel"></label>
                                                <label>East</label>
                                            </div>
                                        </div>
                                        <div className="row">
                                            <div className="col-xs-4">
                                                <input type="checkbox" />
                                                <label className="checkboxLabel"></label>
                                                <label>West</label>
                                            </div>
                                            <div className="col-xs-4">
                                                <input type="checkbox" />
                                                <label className="checkboxLabel"></label>
                                                <label>North-East</label>
                                            </div>
                                            <div className="col-xs-4">
                                                <input type="checkbox" />
                                                <label className="checkboxLabel"></label>
                                                <label>North-West</label>
                                            </div>
                                        </div>
                                        <div className="row">
                                            <div className="col-xs-4">
                                                <input type="checkbox" />
                                                <label className="checkboxLabel"></label>
                                                <label>South-East</label>
                                            </div>
                                        </div>
                                    </li>
                                </ul>
                            </li>
                        </ul>
                        <a className="toggle" href="#"></a>
                    </nav>
                </div>
            </div>
            <div className="col-sm-3">
                <div className="pull-right text-center text-uppercase">
                    <button type="button" className="btn btn-default btn-sm btn-primary" data-toggle="modal" data-target="#contactModal">
                        <i className="fa fa-phone"></i>
                        <span className="enquiryText text-uppercase">Contact Us</span>
                    </button>
                </div>
            </div>

        </div>
    </div>
	);
}

});

module.exports = NavBarHeader;