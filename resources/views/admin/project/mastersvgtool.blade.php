<html>

<head>
    <title>Builder</title>
    <meta http-equiv="content-type" content="text/html;charset=UTF-8" />
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no" />
    <meta content="" name="description" />
    <meta content="" name="author" />

    <link href="{{ asset('bower_components/bootstrap/dist/css/bootstrap.min.css')}}" rel="stylesheet" type="text/css" />
    <link href="{{ asset('bower_components/fontawesome/css/font-awesome.css')}}" rel="stylesheet" type="text/css" />
    <link href="{{ asset('css/dashboard/builder.css')}}" rel="stylesheet" type="text/css" />
    <style type="text/css">

    .svg-canvas > svg {
      position: relative;
      top: 0;
      z-index: -1;
      left: 0px;
      width: 100%;
      height: 100%;
      z-index: 0;
    }
/*    .svg-canvas {
      transform: none !important;
    }*/
    canvas{
      z-index: 999;
      position: relative;
    }
    .marked {
      fill: #FFE533  !important;
      border: 2px solid #FFE533 ;
      opacity: 0.5;
    }
/*    .svg-canvas{
   transform: matrix(1, 0, 0, 1, 0,-127) !important;

    }
    .marked {
  fill: #ff3333 !important;
  border: 2px solid #ff3333;
  opacity: 0.5;
}
  */  </style>
</head>

<body>
    <div class="aj-imp-builder container-fluid">
       <div id="header-region"></div>
        <div ui-region></div>
    </div> 
        @include('frontend/templates')
        <script src="{{ asset('bower_components/underscore/underscore-min.js' )}}"></script>
        <script src="{{ asset('bower_components/underscore.string/dist/underscore.string.min.js' )}}"></script>
        <script src="{{ asset('bower_components/jquery/dist/jquery.min.js' )}}"></script>
        <script src="{{ asset('bower_components/backbone/backbone.js' )}}"></script>
        <script src="{{ asset('bower_components/backbone.marionette/lib/backbone.marionette.min.js' )}}"></script>
        <script src="{{ asset('bower_components/handlebars/handlebars.min.js' )}}"></script>
        <script src="{{ asset('bower_components/bootstrap/dist/js/bootstrap.min.js' )}}"></script>
        <script src="{{ asset('bower_components/svg.js/dist/svg.min.js' )}}"></script>
        <script src="{{ asset('bower_components/jquery.panzoom/dist/jquery.panzoom.min.js' )}}"></script>
        <script src="{{ asset('bower_components/bootstrap/dist/js/bootstrap.min.js')}}" type="text/javascript"></script>
        <script src="{{ asset('bower_components/interact/interact.min.js')}}" type="text/javascript"></script>
        <script src="{{ asset('bower_components/marionette.state/dist/marionette.state.js' )}}"></script>
        
        <script src="{{ asset('js/svg.parser.min.js' )}}"></script>
        <script src="{{ asset('js/svg.import.min.js' )}}"></script>
        <script src="{{ asset('js/svg.draggable.min.js' )}}"></script>
        <script src="{{ asset('js/jquery.canvasAreaDraw.min.js' )}}"></script>
        <script src="{{ asset('js/frontend/app.js' )}}"></script>
        
        <!--script src="{{ asset('js/jquery.canvasAreaDraw.js' )}}"></script-->
        
        <script type="text/javascript">
            svgImg = '{{$svgImage}}';
           

        AuthoringTool = new Marionette.Application 
        BASEURL = '{{url()}}'
        </script>

        <script src="{{ asset('js/authoring-tool/common.js' )}}"></script>
        <script src="{{ asset('js/authoring-tool/entities/polygon.entity.js' )}}"></script>
        <script src="{{ asset('js/authoring-tool/svg.authoring.controller.js' )}}"></script>
        <script src="{{ asset('js/authoring-tool/application.js' )}}"></script>
</body>

</html>