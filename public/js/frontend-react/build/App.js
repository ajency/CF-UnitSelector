var SVGComponent = React.createClass({displayName: "SVGComponent",
    render: function(){
        return React.createElement("svg", React.__spread({},  this.props), this.props.children);
    }
});

var Rectangle = React.createClass({displayName: "Rectangle",
    render: function() {
        return React.createElement("rect", React.__spread({},  this.props), this.props.children);
    }
});
React.render(
    React.createElement(SVGComponent, {height: "50", width: "50"}, 
    React.createElement(Rectangle, {height: "50", width: "50", x: "25", y: "25"})
    ),
    document.getElementById('main')
);