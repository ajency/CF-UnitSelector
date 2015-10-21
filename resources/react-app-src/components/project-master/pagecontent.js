var React = require('react');

var PageContent = React.createClass({

render: function(){

	return (
                   <div id="page-content-wrapper">
                        <div className="us-right-content">
                            <div className="footer">
                                <h4 className="primary-txt"> Call 1800 180 180 180</h4>
                                <a href="#"> Commonfloor </a> | <a href="#">FAQ  </a> | <a href="#"> Mobile Apps  </a>
                                <br/> © 2015 Commonfloor Inc. |<a href="#"> Privacy Policy</a>
                            </div>
                            <div className="rotate">
                                <i id="next" className="i-icon i-icon-rotate"></i> Press To Rotate
                            </div>
                            <div className="image-contain">


                                <div className="image  ">
                                    <div className="svg-area">
                                        
                                    </div>
                                    <div id='spritespin' className="no-shadow"></div>
                                    <img src="img/Project.jpg" className="img-responsive shadow fit" />
                                   
                                </div>
                            </div>
                        </div>
                        <div className="container-fluid">
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
                        </div>

                  
                        <div className="modal fade imageModal" id="myModal" tabIndex="-1" role="dialog" aria-labelledby="myModalLabel">
                            <div className="modal-dialog" role="document">
                                <div className="modal-content">
                                    <button type="button" className="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
                                    <div className="modal-body">
                                        <img src="img/bldg-3d.png" />
                                        <div className="imageContent">
                                            <h4 className="text-uppercase">Playground area</h4>
                                            <p>
                                                Lorem Ipsum is simply dummy text of the printing and typesetting industry.
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="modal fade contactModal" id="contactModal" tabIndex="-1" role="dialog" aria-labelledby="myModalLabel">
                            <div className="modal-dialog" role="document">
                                <div className="modal-content col-lg-12 p-0">
                                    <button type="button" className="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
                                    <div className="modal-body">
                                        <h4 className="margin-none text-center">Have us call you</h4>
                                        <p className="text-muted text-center">Please fill this short form to view contact details.</p>
                                        <div className="row">
                                            <div className="col-xs-12 content">
                                                <div className="col-xs-6 text-center">
                                                    <span className="modalLogo"></span>
                                                    <div className="developers">Mantri Energia developers</div>
                                                    <span className="help">Need Help? Contact us</span>
                                                    <h5>Toll free: 1800 121 0000</h5>
                                                </div>
                                                <div className="col-xs-6 rightSide">
                                                    <div className="p-0 col-lg-12 inputOuter">
                                                        <input type="text" placeholder="Name" />
                                                        <input type="email" placeholder="Email ID" />
                                                        <input type="text" placeholder="Mobile" />
                                                    </div>
                                                    <div className="p-0 col-lg-12 proceedBtn text-center">
                                                        <button className="btn btn-primary btn-default text-uppercase">Submit</button>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>		
	);
}
});

module.exports = PageContent;