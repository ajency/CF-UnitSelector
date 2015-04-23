<!doctype html>
<html>
    <head>
        <title>CommonFloor - {{ $project_title }}</title>
        <link type="text/css" rel="stylesheet" href="http://ak.asset1.cfcdn.com/cfassets/css/search.caz.css?ver=1427977000" />
        <link href="{{ asset('css/frontend/custom.css')}}" rel="stylesheet">
        <link rel="icon" type="image/png" href="{{ asset('images/others/favicon.ico')}}">
    </head>
    <body>
                  
      <div class="wrapper">
        <div class="container-fluid component-body">
          <div class="row inner-pages" id="page-header">
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
          </div>
          <div ui-region></div>
        </div>
        <div class="footer-push"></div>
      </div>
        <footer id="footer" class="footer">
          <div class="footer-section1">
            <div class="footer-wrap">
              <div class="container-fluid">
                <div class="row">
                  <div class="col-sm-12 col-md-12 col-xm-12">
                    <ul class="nav navbar-nav footer-nav">
                      <li>
                        <a href="http://www.commonfloor.com/about-us" target="_blank" title="Terms and Conditions">Terms &amp; Conditions</a>
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
                  </div>              
                </div>
              </div>
            </div>
          </div>

          <div class="footer-section4"><!--Footer Section 4 starts from here-->
            <div class="footer-wrap">
              <div class="container-fluid">
                <div class="row">
                  <div class="col-sm-12">
                    <div class="copyright-text">
                      Copyright © 2007-15 CommonFloor.com. All rights reserved.
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </footer>
     @include('frontend/templates')
        <!-- Plugins -->
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
        <script src="{{ asset('bower_components/imagesloaded/imagesloaded.js' )}}"></script>
        <script src="{{ asset('bower_components/fancybox/source/jquery.fancybox.js' )}}"></script>
        <script src="{{ asset('bower_components/malihu-custom-scrollbar-plugin/jquery.mCustomScrollbar.js' )}}"></script>
        <!-- end plugins -->
        <script src="{{ asset('js/frontend/app.js' )}}"></script>
        <script>
        BASERESTURL = '{{ get_rest_api_url() }}';
        PROJECTID = {{ $id }};
        CommonFloor = new Marionette.Application 
        BASEURL = '{{url()}}'
        //global variable to keep track of the filtr the user has selected
        CommonFloor.defaults = {'unit' : ""}
  
        window.locale = {

            "en-US" : <?php echo get_locale_frontend_to_json() ?>

        };

        
        
        </script>
        <script src="{{ asset('js/frontend/entities/project.entity.js' )}}"></script>
        <script src="{{ asset('js/frontend/entities/bunglow.variant.js' )}}"></script>
        <script src="{{ asset('js/frontend/entities/settings.entity.js' )}}"></script>
        <script src="{{ asset('js/frontend/entities/unit.entity.js' )}}"></script>
        <script src="{{ asset('js/frontend/entities/unitType.entity.js' )}}"></script>
        <script src="{{ asset('js/frontend/entities/building.entity.js' )}}"></script>
        <script src="{{ asset('js/frontend/entities/apartment.variant.entity.js' )}}"></script>
        <script src="{{ asset('js/frontend/entities/floor.layout.entity.js' )}}"></script>
        <script src="{{ asset('js/frontend/common/common.js' )}}"></script>
        <script src="{{ asset('js/frontend/project/project.controller.js' )}}"></script>
        <script src="{{ asset('js/frontend/project-master-view/project.master.controller.js' )}}"></script>
        <script src="{{ asset('js/frontend/unit-view/unit.controller.js' )}}"></script>
        <script src="{{ asset('js/frontend/project-list-view/project.list.controller.js' )}}"></script>
        <script src="{{ asset('js/frontend/project-list-view/building.list.controller.js' )}}"></script>
        <script src="{{ asset('js/frontend/project-list-view/villa.list.controller.js' )}}"></script>
        <script src="{{ asset('js/frontend/building-step3/apartments.list.controller.js' )}}"></script>
        <script src="{{ asset('js/frontend/building-step3/apartments.master.controller.js' )}}"></script>
        <script src="{{ asset('js/frontend/master-list-bunglows/master.list.bunglows.controller.js' )}}"></script>
        <script src="{{ asset('js/frontend/master-list-buildings/master.list.buildings.controller.js' )}}"></script>
        <script src="{{ asset('js/frontend/router.js' )}}"></script>
        <script src="{{ asset('js/frontend/application.js' )}}"></script>
        <input type="hidden" id="price" data-m-dec="" data-a-sign="Rs. " data-d-group="2" value="" />
      
    </body>
</html>