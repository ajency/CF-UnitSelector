<?php require 'inline-templates.php'; ?>
<!doctype html>
<html>
    <head>
      
    </head>
    <body>
        

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
        window.PROJECTID = {{ $id }};
        CommonFloor = new Marionette.Application 


        </script>


        <div ui-region></div>
        </body>

        <script src="{{ asset('js/frontend/entities/project.entity.js' )}}"></script>
        

        <script type="text/javascript">
        window.project = new CommonFloor.Project;
        window.siteurl = '{{ url( "api1/v1/public/project") }}';
        </script>
        <script src="{{ asset('js/frontend/screen-one/project.controller.js' )}}"></script>
        <script src="{{ asset('js/frontend/header/header.controller.js' )}}"></script>
        <script src="{{ asset('js/frontend/app.js' )}}"></script>
        <script src="{{ asset('js/frontend/application.js' )}}"></script>
        
        
        
</html>