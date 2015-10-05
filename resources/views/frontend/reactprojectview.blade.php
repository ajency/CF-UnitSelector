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
    <link rel="stylesheet" href="{{ asset('css/cf-mobile/gh-fork-ribbon.min.css' )}}" />
    <link rel="stylesheet" type="text/css" href="{{ asset('css/cf-mobile/slick.css' )}}"/>
    <link href="{{ asset('css/cf-mobile/bootstrap.min.css' )}}" rel="stylesheet">
	<script src="{{ asset('lib/react.js' )}}"></script>
</head>
<body>

	<div id="main">

		<!-- The App will be rendered here -->

	</div>


	<!--Global constants -->
	<script>
    	window.baseUrl = '{{url()}}';
    	window.projectId = '{{$id}}';
    </script>

	<!-- Include external libraries here -->
    <script src="{{ asset('bower_components/underscore/underscore-min.js' )}}"></script>
    <script src="{{ asset('bower_components/underscore.string/dist/underscore.string.min.js' )}}"></script>
    <script src="{{ asset('bower_components/jquery/dist/jquery.min.js' )}}"></script>
    <script src="{{ asset('bower_components/bootstrap/dist/js/bootstrap.min.js' )}}"></script>
    <script src="{{ asset('bower_components/slick-carousel/slick/slick.min.js' )}}"></script>

	<!-- Our compiled JavaScript source file -->
    <!--script src="{{ asset('js/frontend-react/build/App.js' )}}"></script-->
    <script src="{{asset('react-app-dist/main.js')}}"></script>


	<script type="text/javascript" language="JavaScript">
	  function set_body_height() { 
	  	// set body height = window height
	  	$('.image').height($(window).height());
	  }
	  $(document).ready(function() {
	  	$(window).bind('resize', set_body_height);
	  	set_body_height();
	  });

	</script>    

</body>
</html>