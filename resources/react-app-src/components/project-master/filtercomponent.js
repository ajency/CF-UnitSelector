var React = require('react');


var FilterComponent = React.createClass({

  render: function(){
      return (
          <div className="modal fade modal-full-width" id="myModal" tabIndex="-1" role="dialog" aria-labelledby="myModalLabel">
            <div className="modal-dialog" role="document">
              <div className="modal-content">
                <div className="modal-header">
                  <div className="row">
                      <div className="col-xs-1"> <i className="i-back i-icon " data-dismiss="modal" aria-label="Close"></i></div>
                       <div className="col-xs-7"> <h4 className="modal-title normal" id="myModalLabel"> Filter By</h4></div>
                        <div className="col-xs-4 text-right"> <h5 className=" normal">RESET</h5></div>
                  </div>
                 
                </div>
                <div className="modal-body">
                <div className="filter-content">     
                      <h5 className=" text-center text-uppercase m-t-20">Unit type</h5>
                      <div className="row imagecheckboxOuter">
                          <div className="col-xs-4 checkboxInner text-center">
                            <input type="checkbox"/>
                            <img src="img/icon/1bhk.png" />
                            <span className="text-uppercase col-xs-12 text-center">1bhk</span>
                          </div>
                           <div className="col-xs-4 checkboxInner text-center selected">
                            <input type="checkbox"/>
                             <img src="img/icon/2bhk.png" />
                            <span className="text-uppercase col-xs-12 text-center">2bhk</span>
                          </div>
                           <div className="col-xs-4 checkboxInner text-center">
                            <input type="checkbox"/>
                            <img src="img/bldg-3d.png" />
                            <span className="text-uppercase col-xs-12 text-center">3bhk</span>
                          </div> 
                          <div className="col-xs-4 checkboxInner text-center">
                            <input type="checkbox"/>
                            <img src="img/bldg-3d.png" />
                            <span className="text-uppercase col-xs-12 text-center">3bhk <br/> (Penthouse)</span>
                          </div>
                           <div className="col-xs-4 checkboxInner text-center">
                            <input type="checkbox"/>
                            <img src="img/bldg-3d.png" />
                            <span className="text-uppercase col-xs-12 text-center">4bhk <br/> (Penthouse)</span>
                          </div>       
                      </div>  
                       <h5 className=" text-center text-uppercase">Budget</h5>      
                  <div className="row p-0 budgetOuter">
                    <div className="col-xs-6">
                       <input type="text" placeholder="MIN"/>     
                    </div>  
                    <div className="col-xs-6">
                       <input type="text" placeholder="MAX"/>     
                    </div> 
                  </div>
                <h5 className="text-center text-uppercase">Area</h5>      
                <div className="row p-0 budgetOuter">
                    <div className="col-xs-6">
                       <input type="text" placeholder="MIN"/>     
                    </div>  
                    <div className="col-xs-6">
                       <input type="text" placeholder="MAX"/>     
                    </div>         
                </div> 
                   <h5 className=" text-center text-uppercase">Flooring</h5>
                <div className="checkboxOuter">  
                  <div className="checkboxnormal"> 
                    <h5 className="col-xs-9 normal">Wooden</h5>
                    <span className="col-xs-3 text-center">
                    <input id="check1" type="checkbox" name="check" value="check1"/><label></label>
                    </span>
                  </div> 
                  <div className="checkboxnormal"> 
                    <h5 className="col-xs-9 normal">Vertified Tiles</h5>
                    <span className="col-xs-3 text-center">
                    <input id="check1" type="checkbox" name="check" value="check1"/><label></label>
                    </span>
                  </div>
                  <div className="checkboxnormal"> 
                    <h5 className="col-xs-9 normal">Marble</h5>
                    <span className="col-xs-3 text-center">
                    <input id="check1" type="checkbox" name="check" value="check1"/><label></label>
                    </span>
                  </div> 
                </div> 
                 <h5 className=" text-center text-uppercase">Views</h5>
                <div className="checkboxOuter">  
                  <div className="checkboxnormal"> 
                    <h5 className="col-xs-9 normal">Swimming Pool</h5>
                    <span className="col-xs-3 text-center">
                    <input id="check1" type="checkbox" name="check" value="check1"/><label></label>
                    </span>
                  </div> 
                  <div className="checkboxnormal"> 
                    <h5 className="col-xs-9 normal">Club house</h5>
                    <span className="col-xs-3 text-center">
                    <input id="check1" type="checkbox" name="check" value="check1"/><label></label>
                    </span>
                  </div> 
                  <div className="checkboxnormal"> 
                    <h5 className="col-xs-9 normal">Playground</h5>
                    <span className="col-xs-3 text-center">
                    <input id="check1" type="checkbox" name="check" value="check1"/><label></label>
                    </span>
                  </div> 
                  <div className="checkboxnormal"> 
                    <h5 className="col-xs-9 normal">Courtyard</h5>
                    <span className="col-xs-3 text-center">
                    <input id="check1" type="checkbox" name="check" value="check1"/><label></label>
                    </span>
                  </div>
                  <div className="checkboxnormal"> 
                    <h5 className="col-xs-9 normal">Parking</h5>
                    <span className="col-xs-3 text-center">
                    <input id="check1" type="checkbox" name="check" value="check1"/><label></label>
                    </span>
                  </div>         
                </div> 
                
                      
                <h5 className=" text-center text-uppercase">Facings</h5>
                <div className="checkboxOuter">  
                  <div className="checkboxnormal"> 
                    <h5 className="col-xs-9 normal">North</h5>
                    <span className="col-xs-3 text-center">
                    <input id="check1" type="checkbox" name="check" value="check1"/><label></label>
                    </span>
                  </div> 
                  <div className="checkboxnormal"> 
                    <h5 className="col-xs-9 normal">South</h5>
                    <span className="col-xs-3 text-center">
                    <input id="check1" type="checkbox" name="check" value="check1"/><label></label>
                    </span>
                  </div>
                  <div className="checkboxnormal"> 
                    <h5 className="col-xs-9 normal">East</h5>
                    <span className="col-xs-3 text-center">
                    <input id="check1" type="checkbox" name="check" value="check1"/><label></label>
                    </span>
                  </div>
                  <div className="checkboxnormal"> 
                    <h5 className="col-xs-9 normal">West</h5>
                    <span className="col-xs-3 text-center">
                    <input id="check1" type="checkbox" name="check" value="check1"/><label></label>
                    </span>
                  </div>
                  <div className="checkboxnormal"> 
                    <h5 className="col-xs-9 normal">North-East</h5>
                    <span className="col-xs-3 text-center">
                    <input id="check1" type="checkbox" name="check" value="check1"/><label></label>
                    </span>
                  </div>
                  <div className="checkboxnormal"> 
                    <h5 className="col-xs-9 normal">North-West</h5>
                    <span className="col-xs-3 text-center">
                    <input id="check1" type="checkbox" name="check" value="check1"/><label></label>
                    </span>
                  </div>
                  <div className="checkboxnormal"> 
                    <h5 className="col-xs-9 normal">South-East</h5>
                    <span className="col-xs-3 text-center">
                    <input id="check1" type="checkbox" name="check" value="check1"/><label></label>
                    </span>
                  </div>        
                </div>  
                   <div className="filterfooter">
                      <div className="row">
                        <button className="col-xs-12 button">
                            Apply
                        </button>            
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

module.exports = FilterComponent;

