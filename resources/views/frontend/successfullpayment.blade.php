<!DOCTYPE html>
<html>
    <head>
        <title>CommonFloor</title>
        <!-- <link type="text/css" rel="stylesheet" href="http://asset1.cfcdn.com/cfassets/css/search.caz.css" /> -->
        <link href="{{ asset('css/frontend/bootstrap.min.css')}}" rel="stylesheet">
        <link href="{{ asset('css/frontend/search.caz.css')}}" rel="stylesheet">

        <link href="{{ asset('css/frontend/custom.css')}}" rel="stylesheet">
        <link rel="icon" type="image/png" href="{{ asset('images/others/favicon.ico')}}">
        <meta http-equiv="X-UA-Compatible" content="IE=edge">
        <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no">
        <!-- BEGIN TRACKJS <script type="text/javascript">window._trackJs = { token: 'b47abea606fa443aa8a488c4eaeaaa75' };</script> <script type="text/javascript" src="//d2zah9y47r7bi2.cloudfront.net/releases/current/tracker.js" crossorigin="anonymous"></script> END TRACKJS -->
        <!--[if IE]>
            <link href="{{ asset('css/frontend/ie.css')}}" rel="stylesheet" type="text/css" />
        <![endif]-->
    </head>
    <body>
                  
      <div class="wrapper">
        <div class="component-body">
          <div class="inner-pages" id="page-header">
             <header class="cf-hdr-blk">
                <div class="top-nav-wrp">
                    <nav class="header-nav row">
                        <div class="col-md-4 col-xs-4">
                            <div class="row">
                                <ul class="header-left-content">
                                    <li>
                                        <div class="">
                                            <a title="Unit Selector" href="/" class="cf-us-logo"></a>
                                        </div>
                                    </li>
                                </ul>
                            </div>
                        </div>
                        <div class="col-md-8 col-xs-8">
                            <div class="row">
                                <ul class="header-right-content">
                                    <li>
                                        <div class="cf-sell-wrp">
                                            <span class="cf-btn cf-sell-btn addCft">
                                                Call us 89555444
                                            </span>
                                        </div>
                                      </li>
                                      <li>
                                        <div class="shortlist-wrp"></div>
                                      </li>
                                     
                                </ul>
                            </div>
                        </div>

                    </nav>
                </div>
            </header> 

            <!--/accordion-->
            PAYMENT SUCCESSFULL
            <!--/accordion-->
          </div>
          <div ui-region></div>
        </div>
        <div class="footer-push"></div>
      </div>
      <footer id="footer" class="footer d">

        <div class="footer-section4"><!--Footer Section 4 starts from here-->
          <div class="">
            <div class="container-fluid">
              <div class="row">
                <div class="col-sm-12">
                  <ul class="nav navbar-nav footer-nav">
                    <li>

                      <a href="{{ $property_page_link }}" title="POVP" class="povp" target="_blank"><span class="icon-arrow-right"></span> Property Page</a>

                    </li>
                    <li>
                      <a href="http://www.commonfloor.com/privacy-policy" target="_blank" title="Privacy Policy">Privacy Policy</a>
                    </li>
                    <li>
                      <a href="http://www.commonfloor.com/about-us" target="_blank" title="Contact Us">Contact Us</a>
                    </li>
                    <li>
                      <a href="{{url()}}/admin" target="_blank"  title="Authoring Tool">Authoring Tool</a>
                    </li>
                  </ul>
                  <div class="copyright-text">
                    Copyright © 2007-15 CommonFloor.com. All rights reserved.
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </footer>
     
     @if(getenv('APP_ENV') == 'production')
     <script src="{{ asset('js/production/plugins.min.js' )}}"></script>
        
   
    @else
   

        <script src="{{ asset('bower_components/underscore/underscore-min.js' )}}"></script>
        <script src="{{ asset('bower_components/underscore.string/dist/underscore.string.min.js' )}}"></script>
        <script src="{{ asset('bower_components/jquery/dist/jquery.min.js' )}}"></script>
        <script src="{{ asset('bower_components/backbone/backbone.js' )}}"></script>
        <script src="{{ asset('bower_components/backbone.marionette/lib/backbone.marionette.min.js' )}}"></script>
        <script src="{{ asset('bower_components/handlebars/handlebars.min.js' )}}"></script>
        <script src="{{ asset('bower_components/marionette.state/dist/marionette.state.js' )}}"></script>
        <script src="{{ asset('bower_components/bootstrap/dist/js/bootstrap.min.js' )}}"></script> 
        <script src="{{ asset('bower_components/BttrLazyLoading/dist/jquery.bttrlazyloading.min.js' )}}"></script> 
        <script src="{{ asset('js/frontend/primages.js' )}}"></script> 
        <script src="{{ asset('bower_components/tooltipster/js/jquery.tooltipster.min.js' )}}"></script>
        <script src="{{ asset('bower_components/jquery-easing/jquery.easing.min.js' )}}"></script>
        <script src="{{ asset('bower_components/jquery-touchswipe/jquery.touchSwipe.min.js' )}}"></script>
        <script src="{{ asset('bower_components/liquidslider/js/jquery.liquid-slider.min.js' )}}"></script>
        <script src="{{ asset('bower_components/spritespin/release/spritespin.js' )}}"></script>
        <script src="{{ asset('bower_components/autoNumeric/autoNumeric.js' )}}"></script>
        <script src="{{ asset('bower_components/fancybox/source/jquery.fancybox.js' )}}"></script>
        <script src="{{ asset('bower_components/malihu-custom-scrollbar-plugin/jquery.mCustomScrollbar.js' )}}"></script>
        <script src="{{ asset('bower_components/lazyloadxt/dist/jquery.lazyloadxt.js' )}}"></script>
        <script src="{{ asset('bower_components/jquery.panzoom/dist/jquery.panzoom.min.js' )}}"></script>
        <script src="{{ asset('bower_components/ionrangeslider/js/ion.rangeSlider.min.js' )}}"></script>
        <script src="{{ asset('bower_components/bootstrap-toggle/js/bootstrap-toggle.min.js' )}}"></script>
        <!--<script src="{{ asset('bower_components/svg-pan-zoom/dist/svg-pan-zoom.min.js' )}}"></script>-->
        <script src="{{ asset('js/frontend/jquery.fadeloader.js' )}}"></script> 
        <script src="{{ asset('js/jquery.flexisel.js' )}}"></script>
        <script src="{{ asset('js/jquery.resize.js' )}}"></script>
        <script src="{{ asset('js/jquery.lazy.min.js' )}}"></script>
        <script src="{{ asset('bower_components/jquery-bridget/jquery.bridget.js' )}}"></script>
        <script src="{{ asset('bower_components/jquery-mousewheel/jquery.mousewheel.js' )}}"></script>
        <script src="{{ asset('bower_components/jquery-magnificent/src/js/mag.js' )}}"></script>
        <script src="{{ asset('bower_components/jquery-magnificent/src/js/mag-control.js' )}}"></script>
        <script src="{{ asset('bower_components/jquery-magnificent/src/js/mag-jquery.js' )}}"></script>
        <script src="{{ asset('js/tabs_accordian.js') }}" type="text/javascript"></script>   
       @endif


    </body>
</html>