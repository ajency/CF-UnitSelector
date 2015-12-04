<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
      <meta name='viewport' content='width=device-width, initial-scale=1.0, maximum-scale=1.0'/>
      <link rel="icon" type="image/png" href="{{ asset('images/others/favicon.ico' )}}">
    <!-- The above 3 meta tags *must* come first in the head; any other head content must come *after* these tags -->
    <title>CommonFloor - {{ $project_title }}</title>


    <link rel="stylesheet" href="{{ asset('css/cf-mobile/gh-fork-ribbon.min.css' )}}" />
    <link rel="stylesheet" type="text/css" href="{{ asset('css/cf-mobile/bootstrap.min.css' )}}"/>
    <link rel="stylesheet" type="text/css" href="{{ asset('css/cf-mobile/font-awesome.css' )}}"/>
    <link rel="stylesheet" type="text/css" href="{{ asset('css/cf-mobile/animsition.min.css' )}}"/>
    <link href="{{ asset('bower_components/qtip2/basic/jquery.qtip.min.css' )}}" rel="stylesheet">
    <link rel="stylesheet" type="text/css" href="{{ asset('bower_components/Swiper/dist/css/swiper.min.css' )}}"/>
    <link id="size-stylesheet" href="{{ asset('css/cf-mobile/custom.css' )}}" rel='stylesheet'/>

	<script src="{{ asset('lib/react.js' )}}"></script>

    <script>
      (function(i,s,o,g,r,a,m){i['GoogleAnalyticsObject']=r;i[r]=i[r]||function(){
      (i[r].q=i[r].q||[]).push(arguments)},i[r].l=1*new Date();a=s.createElement(o),
      m=s.getElementsByTagName(o)[0];a.async=1;a.src=g;m.parentNode.insertBefore(a,m)
      })(window,document,'script','//www.google-analytics.com/analytics.js','ga');

      ga('create', 'UA-70708949-1', 'auto');
      ga('send', 'pageview');

    </script>    

</head>
<body>

	<div id="main">

		<!-- The App will be rendered here -->

	</div>



    <script src="{{ asset('bower_components/underscore/underscore-min.js' )}}"></script>
    <script src="{{ asset('bower_components/underscore.string/dist/underscore.string.min.js' )}}"></script>
    <script src="{{ asset('bower_components/jquery/dist/jquery.min.js' )}}"></script>
    <script src="{{ asset('bower_components/mobile-detect/mobile-detect.js') }}"></script>
    <script src="{{ asset('bower_components/bootstrap/dist/js/bootstrap.min.js' )}}"></script>
    <script src="{{ asset('bower_components/Swiper/dist/js/swiper.min.js') }}"></script>
    <script src="{{ asset('bower_components/jquery.panzoom/dist/jquery.panzoom.min.js' )}}"></script>
    <script src="{{ asset('bower_components/spritespin/release/spritespin.min.js' )}}"></script>
    <script src="{{ asset('js/qtip2/basic/jquery.qtip.js' )}}"></script>
    <script src="{{ asset('bower_components/malihu-custom-scrollbar-plugin/jquery.mCustomScrollbar.concat.min.js' )}}"></script>
     <script src="{{ asset('js/animsition.min.js' )}}"></script>
     <script src="{{ asset('js/readmore.js' )}}"></script>

	<!--Global constants -->
	<script type="text/javascript" language="JavaScript">
        var md = new MobileDetect(window.navigator.userAgent);
        var isMobile;

        detectedMobile = md.mobile();

        if(_.isNull(detectedMobile)){
            isMobile = false;
            $("#size-stylesheet").attr("href", "{{ asset('css/cf-mobile/custom-big.css' )}}");

        }else if(!_.isNull(md.tablet())){
            isMobile = false;
            $("#size-stylesheet").attr("href", "{{ asset('css/cf-mobile/custom-big.css' )}}");
        }else{
                isMobile = true;
        }
            


        window.isMobile = isMobile;
    	window.baseUrl = '{{url()}}';
        window.projectId = '{{$id}}';
    	window.unitSelectorAuthKey = '{{$unitSelectorAuthKey}}';
        window.prevShadowState = false;
        window.project_title = "";
        window.builder_email = "";
        window.builder_phone = "";
        window.amenity_title = "Swimming Pool";
        window.amenity_desc = "Swimming Pool";
        window.currentStep = "one";
    </script>


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
    <script type="text/javascript">
        $(document).ready(function() {

            if(self!=top)
            {
                $(window).bind( 'hashchange', function(e) {
                var anchor = document.location.hash;

                //window.parent.updateUrl(anchor);
                    window.parent.postMessage(anchor, "*");
                });
            }
        });

      </script>


</body>
</html>
