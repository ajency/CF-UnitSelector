var App = React.createClass({

    getInitialState: function() {
        return {data: []};
    },

    loadDataFromServer: function() {

        var baseUrl = this.props.baseUrl;

        $.ajax({
          url: baseUrl+"/api/v1/project/25",
          dataType: 'json',
          cache: false,
          success: function(data) {
            this.setState({data:data});
          }.bind(this),
          error: function(xhr, status, err) {
            console.error(this.props.url, status, err.toString());
          }.bind(this)
        });
    },

    componentDidMount: function() {
        this.loadDataFromServer();
    },    

    render: function(){
        return (
            <div {...this.props}>
            <NavBar/>
            <SunToggle/>
            <Rotate/>
            <ProjectImage/>
            <CardList>
                <CardView/>
                <CardView/>
                <CardView/>
            </CardList>
            </div>

        );
    }
});



var NavBar = React.createClass({
    render: function(){
            return (
                <nav className="navbar navbar-default">
                    <div className="container-fluid">
                      <div className="navbar-header">
                        <div className="row">
                           <div className="col-xs-2 p-0">
                                <i className="i-back i-icon"></i>
                            </div>
                            <div className="col-xs-6 p-0">
                                <h3 className="normal margin-none">Purvankara</h3>
                                <small>200 units in your selection</small>
                            </div>
                            <div className="col-xs-4 p-0">
                              <ul className="list-inline">
                                <li> <i className="i-phone i-icon"></i></li>
                                <li> <i className="i-shortlist i-icon"></i></li>
                                <li> <i className="i-filter i-icon"></i></li>
                              </ul>
                            </div>
                        </div>
                      </div>
                  </div>
              </nav>
        );
        }
});

var SunToggle = React.createClass({

    render: function(){
            return (
                <div className="sun-toggle">
                    <i className="i-sun i-icon"></i>
                </div>
            );
        }
});

var Rotate = React.createClass({

    render: function(){
            return (
                <div className="rotate">
                    
                </div>
            );
        }
});

var ProjectImage = React.createClass({

    render: function(){

            var BASEURL= "http://commonfloorlocal.com";
            var imgUrl= BASEURL+'/images/cf-mobile/FirstSlide.jpg';
            return (
                <div className="image">
                    <img src={imgUrl} className="img-responsive fit"/>
                </div>
            );
        }
});

var CardList = React.createClass({
    render: function() {

        $('.center').slick({
            centerMode: true,
            centerPadding: '60px',
            arrows: false,
            slidesToShow: 3,
            responsive: [
            {
                breakpoint: 768,
                settings: {
                    arrows: false,
                    centerMode: true,
                    centerPadding: '40px',
                    slidesToShow: 3
                }
            },
            {
                breakpoint: 480,
                settings: {
                    arrows: false,
                    centerMode: true,
                    centerPadding: '40px',
                    slidesToShow: 1
                }
            }
            ]
        });

        return (
            <div className="bottom-card">
                <div className="blue">
                    <div className="slider center">
                    {this.props.children}
                    </div>
                </div>
            </div>
        );
    }
});


var CardView = React.createClass({
    render: function() {
        return (
                <div>
                    <div className="card-swipe">

                        <div className="row">
                            <div className="col-xs-5">
                                <h4 className=" margin-none text-left"> Tower 1</h4>
                            </div>
                            <div className="col-xs-7 text-left text-muted">
                                Starting Rs 20 lacs
                            </div>
                        </div>
                        <div className=" swipe-unit-info row">
                            <div className="col-xs-12 text-muted">
                                16 Floors  &nbsp;&nbsp; : &nbsp;&nbsp; 2BHK, 3BHK &nbsp; &nbsp;: &nbsp;&nbsp; 60 Units
                            </div>  
                        </div>
                        <div className="row swipe-footer">
                            <div className="col-xs-10">
                                <sm>40</sm> Units Matching your selection 
                            </div>
                            <div className="col-xs-2">
                                <a href="#"><span className="glyphicon glyphicon-chevron-right  text-right" aria-hidden="true"></span></a>
                            </div>
                        </div>
                    </div>
                </div>
        );
    }
});



React.render(
    <App baseUrl="http://commonfloorlocal.com"/>,
    document.getElementById('main')
);