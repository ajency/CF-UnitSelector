<html>

<head>
    <title>Builder</title>
    <meta http-equiv="content-type" content="text/html;charset=UTF-8" />
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no" />
    <meta content="" name="description" />
    <meta content="" name="author" />
    <meta name="csrf-token" content="{{ csrf_token() }}" />
    <link href="{{ asset('bower_components/bootstrap/dist/css/bootstrap.min.css')}}" rel="stylesheet" type="text/css" />
    <link href="{{ asset('bower_components/fontawesome/css/font-awesome.css')}}" rel="stylesheet" type="text/css" />
    <link href="{{ asset('css/dashboard/builder.css')}}" rel="stylesheet" type="text/css" />
    <style type="text/css">

/*    .svg-canvas {
      transform: none !important;
    }*/

/*    .svg-canvas{
   transform: matrix(1, 0, 0, 1, 0,-127) !important;

    }
    .marked {
  fill: #ff3333 !important;
  border: 2px solid #ff3333;
  opacity: 0.5;
}
  */ 

   </style>
</head>

<body>
    <div class="aj-imp-builder container-fluid">
        <div id="header-region"></div>
        <div id="builder-region">
            <div class="aj-imp-builder-area">
                <div class="builder-header">
                    <div class="header-sections">
                        <div class="aj-imp-browser-address-bar clearfix">
                            <h4><span>SVG</span> PROJECT MASTER</h4>
                        </div>
                          <div class="zoom-controls pull-left"> Zoom Level &nbsp;
                            <button id="in" class="zoom-in btn btn-primary"><i class="fa fa-search-plus"></i></button>
                            <button id="out" class="zoom-out btn btn-primary"><i class="fa fa-search-minus"></i></button>
                            
                            <input type="hidden" name="svg-element-id">
                        </div>
                        <input type="button" id="clear" name="clear" class="pull-left btn btn-small clear" value="Clear">
                        <button class="color-switch btn btn-default">
                            <i class="fa fa-eye"></i>
                            <div><small>PREVIEW</small>

                        </button>
                        <div class='pending'>

                        </div>

                        </div>
                    </div>
                    <div class="alert alert-info alert-box" style="display:none">
                     
                    </div>
                    <div class="aj-imp-browser-preview">
                        <!-- browser body-->
                      
                        <div id="aj-imp-browser-body">
                              <div class="edit-box hidden">
                   <h4>Unit Details</h4>
                   <form>
                   <div class="form-group">
                     <label for="exampleInputEmail1">Property Type</label>
                    <select class="form-control property_type">
                       
                       
                     </select>
                   </div>
                    <div id="dynamice-region"></div>
                   <!-- <div class="form-group">
                     <label for="exampleInputPassword1">Unit Type</label>
                    <select class="form-control Villas">
                       <option value="1">Villa 1</option>
                       <option value="2">Villa 2</option>
                       <option value="3">Villa 3</option>
                       <option value="4">Villa 4</option>
                       <option value="5">Villa 5</option>
                     </select>
                   </div> -->
                   <br/>
                   <button type="button" class="btn btn-primary submit" >Save</button>
                   <button type="button" class="btn btn-primary edit hidden" >Update</button>
                   <button type="button" class="btn btn-primary delete hidden" >Delete</button>
                   <button type="button" class="btn btn-link close" >Close</button>

                 </form>
               </div>
                 <nav role='navigation' class="aj-navbar">
                  <div class="toggle">
                    <span class="container">
                     <i class="fa fa-plus"></i>
                    </span>
                  </div>
                  <div class="menu">
                    <ul class="menu-block">
                      <li><a class="save"><i class="fa fa-area-chart"></i> Polygon</a></li>
                      <li><a><i class="fa fa-map-marker"></i> Marker</a></li>
                    </ul>
                  </div>
                </nav> 
                         <!--  <button id="save-svg-elem" class="save">save</button> -->
                            <div id="aj-imp-builder-drag-drop" class="svg-canvas">
                                <!-- <button type="button" class="btn btn-primary" data-toggle="modal" data-target=".bs-example-modal-sm2">Small modal</button> -->
                              <textarea name="coords2" rows=3 class="area hidden" disabled placeholder="Shape Coordinates" data-image-url="{{$svgImage}}"></textarea>

                            </div>

                        </div>
                        <!--browser footer-->

                    </div>
                    <div class="aj-imp-browser-footer">
                        <ul class="text-center tags list-inline">
                            <li><span class="tag-sold"></span>&nbsp;&nbsp;SOLD</li>
                            <li><span class="tag-available"></span>&nbsp;&nbsp;AVAILABLE</li>
                            <li><span class="tag-blocked"></span>&nbsp;&nbsp;BLOCKED</li>
                            <li><span class="tag-not"></span>&nbsp;&nbsp;NOT RELEASED</li>
                            <li><span class="tag-marked"></span>&nbsp;&nbsp;MARKED</li>
                        </ul>
                    </div>
                </div>
            </div>
            <div id="elements-box-region">
                <div id="controls-drag" class="aj-imp-drag-menu open hidden" style="position: fixed; line-height: 1; height: 600px; top: 80px; left: -3px;">
                    <div class="handle" style="display: block; outline: none; position: absolute; top: 0px; right: -36px;"><span class="bicon icon-uniF162"><i class="fa fa-comments"></i></span></div>
                    <!-- element box description-->
                    <!-- <p class="desc move-cursor">
                    Drag and drop the elements below on the builder and add your content
                    </p> -->
                    <!-- builder row element-->
                    <li data-element="Row" data-placeholder-height="120" class="aj-imp-add-row builder-element">
                        <span style="color:#ff7e00;">Tools</span>

                        <h6 style="color:#fff;">Smoothslides is an easy jQuery slider plugin.</h6>

                    </li>

                    <!-- tab type-->

                    <!-- tab content-->
                    <div class="help-bar ">
                        <!-- #content elements-->
                        <div id="content-elements">
                            <ul class="aj-imp-builder-items clearfix">
                                <li class="element polygon hidden" data-element="Text">
                                    <a href="#" class="drag builder-element">
                                        <div class="aj-imp-builder-icon bicon icon-uniF111"></div>
                                        <div class="aj-imp-builder-title">POLYGON</div>
                                    </a>

                                </li>
                                <li class="element rectangle hidden" data-element="Title">
                                    <a href="#" class="drag builder-element">
                                        <div class="aj-imp-builder-icon bicon icon-uniF11C"></div>
                                        <div class="aj-imp-builder-title">RECTANGLE</div>
                                    </a>
                                </li>
                                <li class="element square hidden" data-element="Image">
                                    <a href="#" class="drag builder-element">
                                        <div class="aj-imp-builder-icon bicon icon-uniF10E"><i class="fa fa-square-o"></i></div>
                                        <div class="aj-imp-builder-title">SQUARE</div>
                                    </a>

                                </li>
                                <li class="element circle hidden" data-element="ImageWithText">
                                    <a href="#" class="drag builder-element">
                                        <div class="aj-imp-builder-icon bicon icon-uniF112"><i class="fa fa-circle-o"></i></div>
                                        <div class="aj-imp-builder-title">CIRCLE</div>
                                    </a>
                                </li>
                                <li class="element marker hidden " data-element="Table">
                                    <a href="#" class="drag builder-element" data-toggle="modal" data-target=".bs-example-modal-sm">
                                        <div class="aj-imp-builder-icon bicon icon-uniF166"><i class="fa fa-map-marker"></i></div>
                                        <div class="aj-imp-builder-title">MARKER 1</div>
                                    </a>
                                </li>
                                <li class="element marker hidden" data-element="Link">
                                    <a href="#" class="drag builder-element" data-toggle="modal" data-target=".bs-example-modal-sm">
                                        <div class="aj-imp-builder-icon bicon icon-uniF149"><i class="fa fa-map-marker"></i></div>
                                        <div class="aj-imp-builder-title">MARKER 2</div>
                                    </a>
                                </li>
                            </ul>
                        </div>

                    </div>
                </div>
            </div>
        </div>

        <!--MODAL1-->
        <div class="modal fade bs-example-modal-sm marker-modal" tabindex="-1" role="dialog" aria-labelledby="mySmallModalLabel" aria-hidden="true">
            <div class="modal-dialog modal-sm">
                <div class="modal-content">
                    <div class="modal-header">
                        <button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
                        <h4 class="text-left" id="gridSystemModalLabel">Marker Details</h4>
                    </div>
                    <div class="modal-body">
                        <div class="container-fluid">
                            <!--            <div class="markers">
                            <label>Marker Icon</label>
                            <ul class="list-inline text-center">
                               <li><a href="#"><img src="../../images/icon/cake-shop.png"/></a></li>
                               <li><a href="#"><img src="../../images/icon/accountancy.png"/></a></li>
                               <li><a href="#"><img src="../../images/icon/astrology.png"/></a></li>
                               <li><a href="#"><img src="../../images/icon/business.png"/></a></li>
                               <li><a href="#"><img src="../../images/icon/computers.png"/></a></li>
                               <li><a href="#"><img src="../../images/icon/concerts.png"/></a></li>
                            </ul>
                            <ul class="list-inline text-center">
                               <li><a href="#"><img src="../../images/icon/coffee-n-tea.png"/></li>
                               <li><a href="#"><img src="../../images/icon/commercial-places.png"/></li>
                               <li><a href="#"><img src="../../images/icon/clothings.png"/></li>
                               <li><a href="#"><img src="../../images/icon/books-media.png"/></li>
                               <li><a href="#"><img src="../../images/icon/bars.png"/></li>
                               <li><a href="#"><img src="../../images/icon/arts-crafts.png"/></li>
                            </ul>
                           </div> -->
                            <div class="row">
                                <div class="col-md-8">
                                    <a href="#">Upload Custom Marker</a>
                                </div>
                                <div class="col-md-4">
                                    <i class="fa fa-circle"></i>
                                </div>
                            </div>
                            <div class="form-group">
                                <label for="markerTitle">Marker Title</label>
                                <input type="text" class="form-control" id="exampleInputEmail1">
                            </div>
                            <div class="form-group">
                                <label for="Description">Description</label>
                                <textarea class="form-control" rows="3"></textarea>
                            </div>
                            <div>
                                <label for="Image">Image</label>
                                <div class="input-group">
                                    <input type="text" class="form-control">
                                    <span class="input-group-btn">
                                      <button class="btn btn-default btn-orange" type="button">Upload</button>
                                    </span>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="modal-footer">


                        <button type="button" class="btn btn-default">Save Marker</button>


                        <button type="button" class="btn btn-default" data-dismiss="modal">Cancel</button>


                    </div>
                </div>
            </div>
        </div>

        <!--MODAL1-->
        <div class="modal fade bs-example-modal-sm2 marker-modal" tabindex="-1" role="dialog" aria-labelledby="mySmallModalLabel" aria-hidden="true">
            <div class="modal-dialog modal-sm">
                <div class="modal-content">
                    <div class="modal-header">
                        <button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
                        <h4 class="text-left" id="gridSystemModalLabel">Unit Details</h4>
                    </div>
                    <div class="modal-body">
                        <div class="container-fluid">
                            <div class="row">
                                <div class="col-md-6">
                                    <label class="control-label">Property Type</label>
                                    <select class="form-control">

                                        <option>1</option>
                                        <option>2</option>
                                        <option>3</option>
                                        <option>4</option>
                                        <option>5</option>
                                    </select>
                                </div>
                                <div class="col-md-6">
                                    <label class="control-label">Unit Name</label>

                                    <select class="form-control">
                                        <option>1</option>
                                        <option>2</option>
                                        <option>3</option>
                                        <option>4</option>
                                        <option>5</option>
                                    </select>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="modal-footer">


                        <button type="button" class="btn btn-default">Save Marker</button>


                        <button type="button" class="btn btn-default" data-dismiss="modal">Cancel</button>


                    </div>
                </div>
            </div>
        </div>


        
       
        <div ui-region></div>
       
   

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
            types = '{{$supported_types}}';
            supported_types = $('<div/>').html(types).text()
           

           

        AuthoringTool = new Marionette.Application
        CommonFloor = new Marionette.Application 
        BASEURL = '{{url()}}'
        URL = window.location.href.split('/')
        PROJECTID = URL[5]
        IMAGEID = URL[7]
        BASERESTURL = '{{ get_rest_api_url() }}';
        $('#aj-imp-builder-drag-drop').panzoom({
                contain: 'invert',
                minScale: 1,
                maxScale: 2.4,
                increment: 0.4,
                $zoomIn: $('.zoom-in'),
                $zoomOut: $('.zoom-out')

        })
        </script>

        <script src="{{ asset('js/authoring-tool/common.js' )}}"></script>
        <script src="{{ asset('js/frontend/entities/project.entity.js' )}}"></script>
        <script src="{{ asset('js/frontend/entities/bunglow.variant.js' )}}"></script>
        <script src="{{ asset('js/frontend/entities/settings.entity.js' )}}"></script>
        <script src="{{ asset('js/frontend/entities/unit.entity.js' )}}"></script>
        <script src="{{ asset('js/frontend/entities/unitType.entity.js' )}}"></script>
        <script src="{{ asset('js/frontend/entities/building.entity.js' )}}"></script>
        <script src="{{ asset('js/frontend/entities/apartment.variant.entity.js' )}}"></script>
        <script src="{{ asset('js/frontend/entities/floor.layout.entity.js' )}}"></script>
        <script src="{{ asset('js/frontend/entities/plot.variant.entity.js' )}}"></script>
        <script src="{{ asset('js/authoring-tool/entities/polygon.entity.js' )}}"></script>
        <script src="{{ asset('js/authoring-tool/entities/villa.entity.js' )}}"></script>
        <script src="{{ asset('js/authoring-tool/entities/plot.entity.js' )}}"></script>
        <script src="{{ asset('js/authoring-tool/svg.authoring.controller.js' )}}"></script>
        <script src="{{ asset('js/authoring-tool/application.js' )}}"></script>
</body>

</html>