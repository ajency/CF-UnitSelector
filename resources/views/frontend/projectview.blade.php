<!doctype html>
<html>
    <head>
        <title>CommonFloor - {{ $project_title }}</title>
    </head>
    <body>
        
        <div ui-region></div>

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
        window.locale = {
            "en-US" : <?php echo get_locale_frontend_to_json() ?>
        };
        </script>
        <script src="{{ asset('js/frontend/header/header.controller.js' )}}"></script>
        <script src="{{ asset('js/frontend/screen-one/project.controller.js' )}}"></script>
        <script src="{{ asset('js/frontend/app.js' )}}"></script>
        <script src="{{ asset('js/frontend/application.js' )}}"></script>
    </body>
</html>