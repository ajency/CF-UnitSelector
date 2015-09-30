<!DOCTYPE html>
<html>
<html lang="en">
  <head>
    <meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
      <meta name='viewport' content='width=device-width, initial-scale=1.0, maximum-scale=1.0'/>
    <!-- The above 3 meta tags *must* come first in the head; any other head content must come *after* these tags -->
    <title>CommonFloor - {{ $project_title }}</title>

    <link href="{{ asset('css/cf-mobile/custom.css' )}}" rel='stylesheet'/>
    <link rel="stylesheet" href="http://cdnjs.cloudflare.com/ajax/libs/github-fork-ribbon-css/0.1.1/gh-fork-ribbon.min.css" />
    <link rel="stylesheet" type="text/css" href="http://cdn.jsdelivr.net/jquery.slick/1.5.7/slick.css"/>
    <link href="{{ asset('css/cf-mobile/bootstrap.min.css' )}}" rel="stylesheet">
	<script src="{{ asset('lib/react.js' )}}"></script>
</head>
<body>

	<div id="main" class="container">

		<!-- The App will be rendered here -->
		
	</div>

    <nav class="navbar navbar-default">
        <div class="container-fluid">
          <div class="navbar-header">
            <div class="row">
               <div class="col-xs-2 p-0">
                    <i class="i-back i-icon"></i>
                </div>
                <div class="col-xs-6 p-0">
                    <h3 class="normal margin-none">Purvankara</h3>
                    <small>200 units in your selection</small>
                </div>
                <div class="col-xs-4 p-0">
                  <ul class="list-inline">
                    <li> <i class="i-phone i-icon"></i></li>
                    <li> <i class="i-shortlist i-icon"></i></li>
                    <li> <i class="i-filter i-icon"></i></li>
                  </ul>
                </div>
            </div>
          </div>
      </div>
  </nav>

  <!-- Sun-toggle -->
  <div class="sun-toggle">
      <i class="i-sun i-icon"></i>
  </div>

  <!-- Sun-toggle -->
    <div class="rotate">
    
  	</div>


  	<div class="image">
  		<img src="{{url('/images/cf-mobile/FirstSlide.jpg')}}" class="img-responsive fit"/>
  	</div>
  	<div class="bottom-card">
  		<div class="blue">
  			<div class="slider center">
  				<div>

  					<div class="card-swipe">

  						<div class="row">
  							<div class="col-xs-5">
  								<h4 class=" margin-none text-left"> Tower 1</h4>
  							</div>
  							<div class="col-xs-7 text-left text-muted">
  								Starting Rs 20 lacs
  							</div>
  						</div>
  						<div class=" swipe-unit-info row">
  							<div class="col-xs-12 text-muted">
  								16 Floors  &nbsp;&nbsp; : &nbsp;&nbsp; 2BHK, 3BHK &nbsp; &nbsp;: &nbsp;&nbsp; 60 Units
  							</div>  
  						</div>
  						<div class="row swipe-footer">
  							<div class="col-xs-10">
  								<sm>40</sm> Units Matching your selection 
  							</div>
  							<div class="col-xs-2">
  								<a href="#"><span class="glyphicon glyphicon-chevron-right  text-right" aria-hidden="true"></span></a>
  							</div>
  						</div>
  					</div>
  				</div>
  				<div>

  					<div class="card-swipe">

  						<div class="row">
  							<div class="col-xs-5">
  								<h4 class=" margin-none text-left"> Tower 1</h4>
  							</div>
  							<div class="col-xs-7 text-left text-muted">
  								Starting Rs 20 lacs
  							</div>
  						</div>
  						<div class=" swipe-unit-info row">
  							<div class="col-xs-12 text-muted">
  								16 Floors  &nbsp;&nbsp; : &nbsp;&nbsp; 2BHK, 3BHK &nbsp; &nbsp;: &nbsp;&nbsp; 60 Units
  							</div>  
  						</div>
  						<div class="row swipe-footer">
  							<div class="col-xs-10">
  								<sm>40</sm> Units Matching your selection 
  							</div>
  							<div class="col-xs-2">
  								<a href="#"><span class="glyphicon glyphicon-chevron-right  text-right" aria-hidden="true"></span></a>
  							</div>
  						</div>
  					</div>
  				</div>
  				<div>

  					<div class="card-swipe">

  						<div class="row">
  							<div class="col-xs-5">
  								<h4 class=" margin-none text-left"> Tower 1</h4>
  							</div>
  							<div class="col-xs-7 text-left text-muted">
  								Starting Rs 20 lacs
  							</div>
  						</div>
  						<div class=" swipe-unit-info row">
  							<div class="col-xs-12 text-muted">
  								16 Floors  &nbsp;&nbsp; : &nbsp;&nbsp; 2BHK, 3BHK &nbsp; &nbsp;: &nbsp;&nbsp; 60 Units
  							</div>  
  						</div>
  						<div class="row swipe-footer">
  							<div class="col-xs-10">
  								<sm>40</sm> Units Matching your selection 
  							</div>
  							<div class="col-xs-2">
  								<a href="#"><span class="glyphicon glyphicon-chevron-right  text-right" aria-hidden="true"></span></a>
  							</div>
  						</div>
  					</div>
  				</div>






  			</div>
  		</div>
  	</div>




	<!-- Include external libraries here -->
    <script src="{{ asset('bower_components/underscore/underscore-min.js' )}}"></script>
    <script src="{{ asset('bower_components/underscore.string/dist/underscore.string.min.js' )}}"></script>
    <script src="{{ asset('bower_components/jquery/dist/jquery.min.js' )}}"></script>
    <script src="{{ asset('bower_components/bootstrap/dist/js/bootstrap.min.js' )}}"></script>
    <script src="{{ asset('bower_components/slick-carousel/slick/slick.min.js' )}}"></script>

	<!-- Our compiled JavaScript source file -->
    <!--script src="{{ asset('js/frontend-react/build/App.js' )}}"></script-->

	<script TYPE="text/javascript">

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

	</script>
	<script type="text/javascript" language="JavaScript">
	  function set_body_height() { // set body height = window height
	  	$('.image').height($(window).height());
	  }
	  $(document).ready(function() {
	  	$(window).bind('resize', set_body_height);
	  	set_body_height();
	  });
	</script>    

</body>
</html>