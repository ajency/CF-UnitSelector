var classNames = require('classnames');

var Image = React.createClass({
  getInitialState: function() {
    return {
      loaded: false
    };
  },

  onImageLoad: function() {
    if (this.isMounted()) {
      this.setState({loaded: true});
    }
  },

  componentDidMount: function() {
    var imgTag = this.refs.img.getDOMNode();
    var imgSrc = imgTag.getAttribute('src');
    // You may want to rename the component if the <Image> definition
    // overrides window.Image
    var img = new window.Image();
    img.onload = this.onImageLoad;
    img.src = imgSrc;
  },

  render: function() {
    var {className, ...props} = this.props;
    var imgClasses = 'image';
    if (this.state.loaded) {
      imgClasses = joinClasses(imgClasses, 'image-loaded');
    }
    return (
      <img ref="img" {...props} className={joinClasses(className, imgClasses)} />
    );
  }
});