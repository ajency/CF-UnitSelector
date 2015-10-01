var App = React.createClass({displayName: "App",
    render: function(){
        return (
            React.createElement("div", React.__spread({},  this.props), 
            React.createElement(NavBar, null), 
            React.createElement(SunToggle, null), 
            React.createElement(Rotate, null), 
            React.createElement(ProjectImage, null), 
            React.createElement(CardList, null, 
                React.createElement(CardView, null), 
                React.createElement(CardView, null), 
                React.createElement(CardView, null)
            )
            )

        );
    }
});



var NavBar = React.createClass({displayName: "NavBar",
    render: function(){
            return (
                React.createElement("nav", {className: "navbar navbar-default"}, 
                    React.createElement("div", {className: "container-fluid"}, 
                      React.createElement("div", {className: "navbar-header"}, 
                        React.createElement("div", {className: "row"}, 
                           React.createElement("div", {className: "col-xs-2 p-0"}, 
                                React.createElement("i", {className: "i-back i-icon"})
                            ), 
                            React.createElement("div", {className: "col-xs-6 p-0"}, 
                                React.createElement("h3", {className: "normal margin-none"}, "Purvankara"), 
                                React.createElement("small", null, "200 units in your selection")
                            ), 
                            React.createElement("div", {className: "col-xs-4 p-0"}, 
                              React.createElement("ul", {className: "list-inline"}, 
                                React.createElement("li", null, " ", React.createElement("i", {className: "i-phone i-icon"})), 
                                React.createElement("li", null, " ", React.createElement("i", {className: "i-shortlist i-icon"})), 
                                React.createElement("li", null, " ", React.createElement("i", {className: "i-filter i-icon"}))
                              )
                            )
                        )
                      )
                  )
              )
        );
        }
});

var SunToggle = React.createClass({displayName: "SunToggle",

    render: function(){
            return (
                React.createElement("div", {className: "sun-toggle"}, 
                    React.createElement("i", {className: "i-sun i-icon"})
                )
            );
        }
});

var Rotate = React.createClass({displayName: "Rotate",

    render: function(){
            return (
                React.createElement("div", {className: "rotate"}
                    
                )
            );
        }
});

var ProjectImage = React.createClass({displayName: "ProjectImage",

    render: function(){

            var BASEURL= "http://commonfloorlocal.com";
            var imgUrl= BASEURL+'/images/cf-mobile/FirstSlide.jpg';
            return (
                React.createElement("div", {className: "image"}, 
                    React.createElement("img", {src: imgUrl, className: "img-responsive fit"})
                )
            );
        }
});

var CardList = React.createClass({displayName: "CardList",
    render: function() {

        return (
            React.createElement("div", {className: "bottom-card"}, 
                React.createElement("div", {className: "blue"}, 
                    React.createElement("div", {className: "slider center"}, 
                    this.props.children
                    )
                )
            )
        );
    }
});


var CardView = React.createClass({displayName: "CardView",
    render: function() {
        return (
                React.createElement("div", null, 
                    React.createElement("div", {className: "card-swipe"}, 

                        React.createElement("div", {className: "row"}, 
                            React.createElement("div", {className: "col-xs-5"}, 
                                React.createElement("h4", {className: " margin-none text-left"}, " Tower 1")
                            ), 
                            React.createElement("div", {className: "col-xs-7 text-left text-muted"}, 
                                "Starting Rs 20 lacs"
                            )
                        ), 
                        React.createElement("div", {className: " swipe-unit-info row"}, 
                            React.createElement("div", {className: "col-xs-12 text-muted"}, 
                                "16 Floors     :    2BHK, 3BHK    :    60 Units"
                            )
                        ), 
                        React.createElement("div", {className: "row swipe-footer"}, 
                            React.createElement("div", {className: "col-xs-10"}, 
                                React.createElement("sm", null, "40"), " Units Matching your selection" 
                            ), 
                            React.createElement("div", {className: "col-xs-2"}, 
                                React.createElement("a", {href: "#"}, React.createElement("span", {className: "glyphicon glyphicon-chevron-right  text-right", "aria-hidden": "true"}))
                            )
                        )
                    )
                )
        );
    }
});



React.render(
    React.createElement(App, null),
    document.getElementById('main')
);