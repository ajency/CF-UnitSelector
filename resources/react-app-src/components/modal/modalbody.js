var React = require('react');
var classNames = require('classnames');

// var ReactMixin = {

//     checkboxCheck:function(evt){

//         $checkBox = $(evt.currentTarget);

//         if($checkBox.is(":checked")){
//             this.state.isFilterChecked = true;
//         }

//     }
// }

var ModalBody = React.createClass({

    // mixins:[ReactMixin],
  
    render: function () {

        var checkOuterDivClass = classNames({
          'col-xs-4': true,
          'checkboxInner': true,
          'selected': true
        }); 

        return (
                <div className="modal-body">
                    <div className="filter-content">
                        <h5 className=" text-center text-uppercase m-t-20">Unit type</h5>
                        <div className="row imagecheckboxOuter">
                            <div className="col-xs-4 checkboxInner text-center ">
                                <input ref="checkboxRef " type="checkBox" />
                                 <img src="../images/icon/1bhk.png" />
                                <span className="text-uppercase col-xs-12 text-center">1bhk</span>
                            </div>
                            <div className="col-xs-4 checkboxInner text-center selected">
                                <input  ref="checkboxRef" type="checkbox" />
                                <img src="../images/icon/2bhk.png" />
                                <span className="text-uppercase col-xs-12 text-center">2bhk</span>
                            </div>
                            <div className="col-xs-4 checkboxInner text-center">
                                <input ref="checkboxRef" type="checkbox" />
                                <img src="../images/icon/3bhk.png" />
                                <span className="text-uppercase col-xs-12 text-center">3bhk</span>
                            </div>
                            <div className="col-xs-4 checkboxInner text-center">
                                <input ref="checkboxRef" type="checkbox" />
                                <img src="../images/icon/4bhk.png" />
                                <span className="text-uppercase col-xs-12 text-center">3bhk <br/> (Penthouse)</span>
                            </div>
                            <div className="col-xs-4 checkboxInner text-center">
                                <input ref="checkboxRef" type="checkbox" />
                                <img src="../images/icon/3bhk.png" />
                                <span className="text-uppercase col-xs-12 text-center">4bhk <br/> (Penthouse)</span>
                            </div>
                        </div>
                        <h5 className=" text-center text-uppercase">Budget</h5>
                        <div className="row p-0 budgetOuter">
                            <div className="col-xs-6">
                                <input type="text" placeholder="MIN" />
                            </div>
                            <div className="col-xs-6">
                                <input type="text" placeholder="MAX" />
                            </div>
                        </div>
                        <h5 className="text-center text-uppercase">Area</h5>
                        <div className="row p-0 budgetOuter">
                            <div className="col-xs-6">
                                <input type="text" placeholder="MIN" />
                            </div>
                            <div className="col-xs-6">
                                <input type="text" placeholder="MAX" />
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
                        <input id="check1" ef="r" type="checkbox" name="check" value="check1"/><label></label>
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
        )
  }
});

module.exports = ModalBody;