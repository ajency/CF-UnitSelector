<!DOCTYPE html>
<html>
    <head>
        <title>Dashboard - CommonFloor</title>
        <meta http-equiv="content-type" content="text/html;charset=UTF-8" />
        <meta charset="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no" />
        <meta content="" name="description" />
        <meta content="" name="author" />
        <meta name="csrf-token" content="{{ csrf_token() }}" />
        <link rel="icon" type="image/png" href="{{ asset('images/others/favicon.ico') }}">

        <link href="{{ asset('bower_components/pace/themes/orange/pace-theme-flash.css') }}" rel="stylesheet" type="text/css" media="screen"/>
        <link href="{{ asset('bower_components/jquery.scrollbar/jquery.scrollbar.css') }}" rel="stylesheet" type="text/css"/>
        <link href="{{ asset('bower_components/fontawesome/css/font-awesome.min.css') }}" rel="stylesheet" type="text/css"/>
        <link href="{{ asset('bower_components/DataTables/media/css/jquery.dataTables.min.css') }}" rel="stylesheet" type="text/css">
        <link href="{{ asset('bower_components/datatables-responsive/css/dataTables.responsive.css') }}" rel="stylesheet" type="text/css" media="screen">
        <link href="{{ asset('bower_components/select2/select2.css') }}" rel="stylesheet" type="text/css" media="screen">
        <link href="{{ asset('bower_components/animate.css/animate.min.css') }}" rel="stylesheet" type="text/css"/>
        <link href="{{ asset('bower_components/bootstrap-tagsinput/dist/bootstrap-tagsinput.css') }}" rel="stylesheet" type="text/css"/>
        <link href="{{ asset('bower_components/bootstrap-toggle/css/bootstrap-toggle.min.css') }}" rel="stylesheet" type="text/css"/>

        <link href="{{ asset('css/app.css') }}" rel="stylesheet" type="text/css"/>
        <link href="{{ asset('css/dashboard/style.css') }}" rel="stylesheet" type="text/css"/>
        <link href="{{ asset('css/dashboard/responsive.css') }}" rel="stylesheet" type="text/css"/>
        <link href="{{ asset('css/dashboard/custom-icon-set.css') }}" rel="stylesheet" type="text/css"/>
       <script>
            var BASEURL = '{{ url() }}';
            var FLOORLEVELS = [];
            var variantId = 0;
        </script>
    <body>
 
                <div class="content">  
 
                    @yield('content')

                </div>
 
        <!-- END CONTENT --> 


        <!-- BEGIN CORE JS FRAMEWORK--> 
        <script src="{{ asset('bower_components/lodash/lodash.js') }}"></script>
        <script src="{{ asset('bower_components/jquery/dist/jquery.js') }}"></script>
        <script src="{{ asset('bower_components/jquery-ui/jquery-ui.js' ) }}" type="text/javascript"></script> 
        <script src="{{ asset('bower_components/bootstrap/dist/js/bootstrap.js' ) }}"></script>
        <script src="{{ asset('bower_components/jquery-unveil/jquery.unveil.js' ) }}" type="text/javascript"></script> 
        <script src="{{ asset('bower_components/jquery.scrollbar/jquery.scrollbar.js' ) }}" type="text/javascript"></script>
        <script src="{{ asset('bower_components/pace/pace.js' ) }}" type="text/javascript"></script>  
        <script src="{{ asset('bower_components/handlebars/handlebars.js' ) }}" type="text/javascript"></script> 
        <script src="{{ asset('bower_components/Faker/build/build/faker.js' ) }}" type="text/javascript"></script> 
        <script src="{{ asset('bower_components/lodash/lodash.js' ) }}" type="text/javascript" ></script>
        <script src="{{ asset('bower_components/select2/select2.js' ) }}" type="text/javascript"></script>
        <script src="{{ asset('bower_components/parsleyjs/dist/parsley.js' ) }}" type="text/javascript"></script>
        <script src="{{ asset('bower_components/plupload/js/plupload.full.min.js' ) }}" type="text/javascript"></script>
        <script src="{{ asset('bower_components/bootstrap-file-input/bootstrap.file-input.js' ) }}" type="text/javascript"></script>
        <script src="{{ asset('bower_components/jquery.breakpoints/breakpoints.js' ) }}" type="text/javascript"></script>
        <script src="{{ asset('bower_components/bootstrap-file-input/bootstrap.file-input.js') }}" type="text/javascript"></script>
        <script src="{{ asset('bower_components/notifyjs/dist/notify-combined.min.js') }}" type="text/javascript"></script>
        <script src="{{ asset('bower_components/bootstrap-tagsinput/dist/bootstrap-tagsinput.min.js' ) }}" type="text/javascript"></script>
        <script src="{{ asset('bower_components/bootstrap-toggle/js/bootstrap-toggle.min.js' ) }}" type="text/javascript"></script>
        
        <script src="{{ asset('bower_components/DataTables/media/js/jquery.dataTables.js') }}" type="text/javascript"></script>
        <script src="{{ asset('bower_components/datatables-tabletools/js/dataTables.tableTools.js' ) }}" type="text/javascript"></script>
        <script src="{{ asset('bower_components/datatables-responsive/js/dataTables.responsive.js' ) }}" type="text/javascript"></script>


        <script src="{{ asset('plugins/dashboard-theme-core/core.js') }}" type="text/javascript"></script>
        <script src="{{ asset('plugins/datatables.js') }}" type="text/javascript"></script>
        <script src="{{ asset('js/add.projects.js') }}" type="text/javascript"></script> 
        <script src="{{ asset('js/scripts.js') }}" type="text/javascript"></script>
        
    </body>
</html>