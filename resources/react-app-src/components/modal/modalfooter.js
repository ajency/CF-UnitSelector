var React = require('react');

var ModalFooter = React.createClass({
  render: function () {
    return (
      <div className="modal-footer">
        <button type="button" className="btn btn-primary">Submit</button>
      </div>
    )
  }
});

module.exports = ModalFooter;