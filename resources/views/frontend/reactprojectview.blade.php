<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
      <meta name='viewport' content='width=device-width, initial-scale=1.0, maximum-scale=1.0'/>
    <!-- The above 3 meta tags *must* come first in the head; any other head content must come *after* these tags -->
    <title>CommonFloor - {{ $project_title }}</title>


    <link id="size-stylesheet" href="{{ asset('css/cf-mobile/custom.css' )}}" rel='stylesheet'/>
    <link id="size-stylesheet" href="{{ asset('css/cf-mobile/custom-big.css' )}}" rel='stylesheet'/>
    <link rel="stylesheet" href="{{ asset('css/cf-mobile/gh-fork-ribbon.min.css' )}}" />
    <link rel="stylesheet" type="text/css" href="{{ asset('css/cf-mobile/bootstrap.min.css' )}}"/>
    <link rel="stylesheet" type="text/css" href="{{ asset('css/cf-mobile/font-awesome.css' )}}"/> 
    <link href="{{ asset('bower_components/qtip2/basic/jquery.qtip.min.css' )}}" rel="stylesheet">
    <link rel="stylesheet" type="text/css" href="{{ asset('bower_components/Swiper/dist/css/swiper.min.css' )}}"/>
    <link id="size-stylesheet" href="{{ asset('css/cf-mobile/custom.css' )}}" rel='stylesheet'/>
	<script src="{{ asset('lib/react.js' )}}"></script>

    <style type="text/css">
        .swiper-container {
            width: 100%;
        }
        .swiper-slide {
            background-position: center;
            background-size: cover;
            width: 300px;
            
        }
    </style>
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
    <script src="{{ asset('bower_components/qtip2/basic/jquery.qtip.min.js' )}}"></script> 
    <script src="{{ asset('bower_components/malihu-custom-scrollbar-plugin/jquery.mCustomScrollbar.concat.min.js' )}}"></script>

	<!--Global constants -->
	<script type="text/javascript" language="JavaScript">
        var md = new MobileDetect(window.navigator.userAgent);
        var isMobile;

        detectedMobile = md.mobile();

        if(_.isNull(detectedMobile)){
            isMobile = false;
            $("#size-stylesheet").attr("href", "../css/cf-mobile/custom-big.css");
            
        }else{
            isMobile = true;
        }

        window.isMobile = isMobile;
    	window.baseUrl = '{{url()}}';
    	window.projectId = '{{$id}}';
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

      <script type="text/javascript">
      if(!window.isMobile){
        $(document).on('click', '.click', function (e) {
        var theID = $(this).attr('id');
        $('html, body').animate({
            scrollTop: $('#' + theID + '_div').offset().top-60
        }, 1000);
        return false;
      });

      function sticky_relocate() {
          var window_top = $(window).scrollTop();
          var div_top = $('#sticky-anchor').offset().top;
          if (window_top > div_top) {
              $('#stickyHeader').addClass('stick');
          } else {
              $('#stickyHeader').removeClass('stick');
          }
      }

      $(function () {
          $(window).scroll(sticky_relocate);
          sticky_relocate();
      });
      }
      
    </script>   
</body>
</html>