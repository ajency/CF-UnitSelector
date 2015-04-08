<!doctype html>
<html>
    <head>
        <title>CommonFloor - {{ $project_title }}</title>
        <link type="text/css" rel="stylesheet" href="http://ak.asset1.cfcdn.com/cfassets/css/search.caz.css?ver=1427977000" />
        <link href="{{ asset('css/frontend/custom.css')}}" rel="stylesheet">
    </head>
    <body>
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
        <footer id="footer" class="footer">
        <div class="footer-section1">
          <div class="footer-wrap">
            <div class="container-fluid">
              <div class="row">
                <div class="col-sm-12 col-md-12 col-xm-12">
                  <ul class="nav navbar-nav footer-nav">
                    <li>
                      <a href="http://www.commonfloor.com/about-us" title="Terms and Conditions">Terms &amp; Conditions</a>
                    </li>
                    <li>
                      <a href="http://www.commonfloor.com/privacy-policy" title="Privacy Policy">Privacy Policy</a>
                    </li>
                    <li>
                      <a href="http://www.commonfloor.com/about-us" title="Contact Us">Contact Us</a>
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
    </div>
     @include('frontend/templates')
        <!-- Plugins -->
        <script src="{{ asset('bower_components/underscore/underscore-min.js' )}}"></script>
        <script src="{{ asset('bower_components/jquery/dist/jquery.min.js' )}}"></script>
        <script src="{{ asset('bower_components/backbone/backbone.js' )}}"></script>
        <script src="{{ asset('bower_components/marionette/lib/backbone.marionette.min.js' )}}"></script>
        <script src="{{ asset('bower_components/handlebars/handlebars.min.js' )}}"></script>
        <script src="{{ asset('bower_components/marionette.state/dist/marionette.state.js' )}}"></script>
        <script src="{{ asset('bower_components/bootstrap/dist/js/bootstrap.min.js' )}}"></script> 
        <script src="{{ asset('bower_components/BttrLazyLoading/dist/jquery.bttrlazyloading.min.js' )}}"></script> 
        <!-- end plugins -->
        <script src="{{ asset('js/frontend/app.js' )}}"></script>
        <script>
        BASERESTURL = '{{ get_rest_api_url() }}';
        PROJECTID = {{ $id }};
        CommonFloor = new Marionette.Application 
        
        window.locale = {
            "en-US" : {}
        };
        </script>
        <script src="{{ asset('js/frontend/entities/project.entity.js' )}}"></script>
        <script src="{{ asset('js/frontend/common/common.js' )}}"></script>
        <script src="{{ asset('js/frontend/screen-one/project.controller.js' )}}"></script>
        <script src="{{ asset('js/frontend/application.js' )}}"></script>
    </body>
</html>