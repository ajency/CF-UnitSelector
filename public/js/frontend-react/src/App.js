var SVGComponent = React.createClass({
    render: function(){
        return <svg {...this.props}>{this.props.children}</svg>;
    }
});

var Rectangle = React.createClass({
    render: function() {
        return <rect {...this.props}>{this.props.children}</rect>;
    }
});
React.render(
    <SVGComponent height="50" width="50">
    <Rectangle height="50" width="50" x="25" y="25" />
    </SVGComponent>,
    document.getElementById('main')
);