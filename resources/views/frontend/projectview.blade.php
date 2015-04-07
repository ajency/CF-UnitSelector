<!doctype html>
<html>
    <head>
        <title>CommonFloor - {{ $project_title }}</title>

    </head>
    <body>
        <div>
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
        <!-- Plugins -->
        <script src="{{ asset('bower_components/underscore/underscore-min.js' )}}"></script>
        <script src="{{ asset('bower_components/jquery/dist/jquery.min.js' )}}"></script>
        <script src="{{ asset('bower_components/backbone/backbone.js' )}}"></script>
        <script src="{{ asset('bower_components/marionette/lib/backbone.marionette.min.js' )}}"></script>
        <script src="{{ asset('bower_components/handlebars/handlebars.min.js' )}}"></script>
        <script src="{{ asset('bower_components/marionette.state/dist/marionette.state.js' )}}"></script>
        <script src="{{ asset('bower_components/bootstrap/dist/js/bootstrap.min.js' )}}"></script> 
        <!-- end plugins -->

        <script>
        BASERESTURL = '{{ get_rest_api_url() }}';
        PROJECTID = {{ $id }};
        CommonFloor = new Marionette.Application 

        </script>
        <script src="{{ asset('js/frontend/entities/project.entity.js' )}}"></script>

        <script type="text/javascript">
        window.project = new CommonFloor.Project
        </script>
        <script src="{{ asset('js/frontend/header/header.controller.js' )}}"></script>
        <script src="{{ asset('js/frontend/screen-one/project.controller.js' )}}"></script>
        <script src="{{ asset('js/frontend/header/header.controller.js' )}}"></script>
        <script src="{{ asset('js/frontend/app.js' )}}"></script>
        <script src="{{ asset('js/frontend/application.js' )}}"></script>
    </body>
</html>