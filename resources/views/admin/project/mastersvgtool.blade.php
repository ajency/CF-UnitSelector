<html>
	<head>
		<title>Builder</title>
		<meta http-equiv="content-type" content="text/html;charset=UTF-8" />
		<meta charset="utf-8" />
		<meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no" />
		<meta content="" name="description" />
		<meta content="" name="author" />

		<link href="{{ asset('bower_components/bootstrap/dist/css/bootstrap.min.css')}}" rel="stylesheet" type="text/css"/>
		<link href="{{ asset('bower_components/fontawesome/css/font-awesome.css')}}" rel="stylesheet" type="text/css"/>
		<link href="{{ asset('css/dashboard/builder.css')}}" rel="stylesheet" type="text/css"/>
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
               
               <button class="color-switch btn btn-default">
                  <i class="fa fa-eye"></i>
                  <div><small>PREVIEW</small>
                  
               </button>
               <div>
               <input type="checkbox" aria-label="...">
               <strong>Display marked units</strong>
               <strong class="pull-right" style="line-height:70px;margin-right: 20px;  color: #FF7E00;">
                  Pending: 46 Villa's | 2 Plot's</strong>
               </div>

            </div>
         </div>

         <div class="aj-imp-browser-preview">
            <!-- browser header-->
            <div class="aj-imp-browser-header">
               <div class="lock-message hidden">
                  <div class="lock-container">
                     <div class="locker">
                        <div class="lockgo">
                           &nbsp;
                        </div>
                        <span class="bicon icon-uniF180 pulse"></span>
                        <div class="message-span">Editing has been locked for this page.</div>
                        <div class="option-msg">
                           You could choose to either take over this page or edit some other page.
                        </div>
                        <div class="row">
                           <div class="col-sm-5 t-a-r">
                              <button id="take-over-button" class="btn btn-lg aj-imp-orange-btn">Take Over</button>
                           </div>
                           <div class="col-sm-2">
                              <span class="or-text">OR</span>
                           </div>
                           <div class="col-sm-5 option-or">
                              Edit:
                              <select id="builder-page-sel-lock" name="builder-page-sel" style="display: none;">
                                 <option data-slug="home" value="9" data-originalid="9">Home</option>
                                 <option data-slug="about-us" value="10" data-originalid="10">About Us</option>
                                 <option data-slug="rooms" value="11" data-originalid="11">Rooms</option>
                                 <option data-slug="single-room" value="12" data-originalid="12">Single Room</option>
                                 <option data-slug="gallery" value="13" data-originalid="13">Gallery</option>
                                 <option data-slug="contact-us" value="14" data-originalid="14">Contact Us</option>
                                 <option data-slug="menu" value="73" data-originalid="73">Menu</option>
                                 <option data-slug="sunday" value="86" data-originalid="86">Sunday</option>
                                 <option data-slug="kids" value="89" data-originalid="89">Kids</option>
                                 <option data-slug="breakfast" value="92" data-originalid="92">Breakfast</option>
                                 <option data-slug="events" value="95" data-originalid="95">Events</option>
                                 <option data-slug="main-3" value="113" data-originalid="113">Main</option>
                                 <option data-slug="test" value="163" data-originalid="163">test</option>
                                 <option data-slug="about-new" value="345" data-originalid="345">about new</option>
                              </select>
                              <div class="btn-group bootstrap-select">
                                 <button type="button" class="btn dropdown-toggle selectpicker btn-xs btn-default" data-toggle="dropdown" data-id="builder-page-sel-lock" title="Home"><span class="filter-option pull-left">Home</span>&nbsp;<span class="caret"></span></button>
                                 <div class="dropdown-menu open">
                                    <ul class="dropdown-menu inner selectpicker" role="menu">
                                       <li rel="0" class="selected"><a tabindex="0" class="" style=""><span class="text">Home</span><i class="glyphicon glyphicon-ok icon-ok check-mark"></i></a></li>
                                       <li rel="1"><a tabindex="0" class="" style=""><span class="text">About Us</span><i class="glyphicon glyphicon-ok icon-ok check-mark"></i></a></li>
                                       <li rel="2"><a tabindex="0" class="" style=""><span class="text">Rooms</span><i class="glyphicon glyphicon-ok icon-ok check-mark"></i></a></li>
                                       <li rel="3"><a tabindex="0" class="" style=""><span class="text">Single Room</span><i class="glyphicon glyphicon-ok icon-ok check-mark"></i></a></li>
                                       <li rel="4"><a tabindex="0" class="" style=""><span class="text">Gallery</span><i class="glyphicon glyphicon-ok icon-ok check-mark"></i></a></li>
                                       <li rel="5"><a tabindex="0" class="" style=""><span class="text">Contact Us</span><i class="glyphicon glyphicon-ok icon-ok check-mark"></i></a></li>
                                       <li rel="6"><a tabindex="0" class="" style=""><span class="text">Menu</span><i class="glyphicon glyphicon-ok icon-ok check-mark"></i></a></li>
                                       <li rel="7"><a tabindex="0" class="" style=""><span class="text">Sunday</span><i class="glyphicon glyphicon-ok icon-ok check-mark"></i></a></li>
                                       <li rel="8"><a tabindex="0" class="" style=""><span class="text">Kids</span><i class="glyphicon glyphicon-ok icon-ok check-mark"></i></a></li>
                                       <li rel="9"><a tabindex="0" class="" style=""><span class="text">Breakfast</span><i class="glyphicon glyphicon-ok icon-ok check-mark"></i></a></li>
                                       <li rel="10"><a tabindex="0" class="" style=""><span class="text">Events</span><i class="glyphicon glyphicon-ok icon-ok check-mark"></i></a></li>
                                       <li rel="11"><a tabindex="0" class="" style=""><span class="text">Main</span><i class="glyphicon glyphicon-ok icon-ok check-mark"></i></a></li>
                                       <li rel="12"><a tabindex="0" class="" style=""><span class="text">test</span><i class="glyphicon glyphicon-ok icon-ok check-mark"></i></a></li>
                                       <li rel="13"><a tabindex="0" class="" style=""><span class="text">about new</span><i class="glyphicon glyphicon-ok icon-ok check-mark"></i></a></li>
                                    </ul>
                                 </div>
                              </div>
                           </div>
                        </div>
                        <div class="lock-help">
                           If this is an unauthorized user, take over and contact us at <a href="mailto:support@impruw.com">support@impruw.com</a>.
                        </div>
                     </div>
                  </div>
               </div>
               
            
            </div>
            <!-- browser body-->
            <div id="aj-imp-browser-body">
               <!-- TODO: remove inline style-->
               <div id="aj-imp-builder-drag-drop" >
                <!-- <button type="button" class="btn btn-primary" data-toggle="modal" data-target=".bs-example-modal-sm2">Small modal</button>
                 --><!--  <textarea name="coords2" rows=3 class="area hidden" disabled 
				        placeholder="Shape Coordinates" data-image-url="{{$svgImage}}"
				       ></textarea> -->
				 

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
      <div id="controls-drag" class="aj-imp-drag-menu open" style="position: fixed; line-height: 1; height: 600px; top: 80px; left: -3px;">
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
         <div class="help-bar">
            <!-- #content elements-->
            <div id="content-elements">
               <ul class="aj-imp-builder-items clearfix">
                  <li class="element" data-element="Text">
                     <a href="#" class="drag builder-element">
                        <div class="aj-imp-builder-icon bicon icon-uniF111"></div>
                        <div class="aj-imp-builder-title">POLYGON</div>
                     </a>
                    
                  </li>
                  <li class="element" data-element="Title">
                     <a href="#" class="drag builder-element">
                        <div class="aj-imp-builder-icon bicon icon-uniF11C"></div>
                        <div class="aj-imp-builder-title">RECTANGLE</div>
                     </a>
                  </li>
                  <li class="element" data-element="Image">
                     <a href="#" class="drag builder-element">
                        <div class="aj-imp-builder-icon bicon icon-uniF10E"><i class="fa fa-square-o"></i></div>
                        <div class="aj-imp-builder-title">SQUARE</div>
                     </a>
                     
                  </li>
                  <li class="element" data-element="ImageWithText">
                     <a href="#" class="drag builder-element">
                        <div class="aj-imp-builder-icon bicon icon-uniF112"><i class="fa fa-circle-o"></i></div>
                        <div class="aj-imp-builder-title">CIRCLE</div>
                     </a>
                  </li>
                  <li class="element" data-element="Table">
                     <a href="#" class="drag builder-element" data-toggle="modal" data-target=".bs-example-modal-sm">
                        <div class="aj-imp-builder-icon bicon icon-uniF166"><i class="fa fa-map-marker"></i></div>
                        <div class="aj-imp-builder-title">MARKER 1</div>
                     </a>
                  </li>
                  <li class="element" data-element="Link">
                     <a href="#" class="drag builder-element"  data-toggle="modal" data-target=".bs-example-modal-sm">
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
           <div class="markers">
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
           </div>
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
<script type="text/javascript">
	
	svgImg = '{{$svgImage}}';

</script>
<script src="{{ asset('bower_components/underscore/underscore-min.js' )}}"></script>
<script src="{{ asset('bower_components/underscore.string/dist/underscore.string.min.js' )}}"></script>
<script src="{{ asset('bower_components/backbone/backbone.js' )}}"></script>
<script src="{{ asset('bower_components/jquery/dist/jquery.min.js' )}}"></script>
<script src="{{ asset('bower_components/svg.js/dist/svg.min.js' )}}"></script>
<script src="{{ asset('js/svg.parser.min.js' )}}"></script>
<script src="{{ asset('js/svg.import.min.js' )}}"></script>
<script src="{{ asset('js/jquery.canvasAreaDraw.min.js' )}}"></script>

<script src="{{ asset('js/authoring-tool/entities/polygon.entity.js' )}}"></script>
<script src="{{ asset('js/authoring-tool/svg.authoring.controller.js' )}}"></script>
<script src="{{ asset('bower_components/bootstrap/dist/js/bootstrap.min.js')}}" type="text/javascript"></script>

	</body>
</html>