<!DOCTYPE html>
<html>
    <head>
        <title>CommonFloor - {{ $project['project_title'] }}</title>
        <!-- <link type="text/css" rel="stylesheet" href="http://asset1.cfcdn.com/cfassets/css/search.caz.css" /> -->
        <link href="{{ asset('css/frontend/bootstrap.min.css')}}" rel="stylesheet">
        <link href="{{ asset('css/frontend/search.caz.css')}}" rel="stylesheet">

        <link href="{{ asset('css/frontend/custom.css')}}" rel="stylesheet">
        <link rel="icon" type="image/png" href="{{ asset('images/others/favicon.ico')}}">
        <meta name="csrf-token" content="{{ csrf_token() }}" />
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
            <div class="panel-group export_block" id="accordion">
                <div class="panel panel-default">
                    <div class="panel-heading collapsed">
                        <h4 class="panel-title">
<a class="" data-toggle="collapse" data-parent="#accordion" href="#collapseOne" >
<span class="semi-bold">Basic Information  :</span> 
</a>
</h4>
        </div>
                    <div id="collapseOne" class="panel-collapse collapse" style="height: 0;">
                        <div class="panel-body">
                          <h4>Tell us about you </h4> 
                          <form id="frmaddBuyer" name="frmaddBuyer">
                          <input type="hidden" name="unitId" id="unitId" value="{{ $unit['id'] }}">
            			  <input type="hidden" name="projectId" id="projectId" value="{{ $project['id'] }}">
                            <table width="100%" cellpadding="10" cellspacing="10">
                                <tr>
                                <th>Name :</th><td><input type="text" name="buyer_name" value="" class="form-control"></td>
                                <th>Email :</th><td><input type="text" name="buyer_email" value="" class="form-control"></td>
                                </tr>
                                <tr>
                                <th>Mobile :</th><td><input type="text" name="buyer_mobile" value="" class="form-control"></td>
                                <th>Pan card :</th><td><input type="text" name="buyer_email" value="" class="form-control"></td>
                                </tr>
                                <tr>
                                <th>Buyer Type :</th><td><input type="text" name="buyer_type" value="" class="form-control"></td>
                                <th>Address 1 :</th><td><input type="text" name="buyer_address1" value="" class="form-control"></td>
                                </tr>
                                <tr>
                                <th>Address 2 :</th><td><input type="text" name="buyer_address2" value="" class="form-control"></td>
                                <th>City :</th><td><input type="text" name="buyer_city" value="" class="form-control"></td>
                                </tr>
                                <tr>
                                <th>State :</th><td><input type="text" name="buyer_state" value="" class="form-control"></td>
                                <th>Country :</th><td><input type="text" name="buyer_country" value="" class="form-control"></td>
                                </tr>
                                <tr>
                                <th>Pincode :</th><td><input type="text" name="buyer_pincode" value="" class="form-control"></td>
                                </tr>
                                <tr>
                                <th></th><td><button type="button" class="btn btn-primary btn-cons addBuyerToCrm"><i class="fa fa-plus-circle"></i> Continue</button></td>
                                </tr>
                                 
                                </table>
                            </form>    
                        </div>
                    </div>
                </div>
                <div class="panel panel-default">
                    <div class="panel-heading collapsed">
                        <h4 class="panel-title">
<a class="collapsed" data-toggle="collapse" data-parent="#accordion" href="#collapseTwo">
<span class="semi-bold">View Property Selected :</span>
</a>
</h4>
                    </div>
                    <div id="collapseTwo" class="panel-collapse collapse" style="height: 0px;">
                        <div class="panel-body">
                           <h4>{{ $project['project_title'] }} ({{ $unit['unit_name'] }}) </h4>   
                                <table width="100%" cellpadding="5" cellspacing="5">
                                <tr>
                                <th>BHK Type :</th><td>{{ $unit['unit_type'] }}</td>
                                <th>Property Type :</th><td>{{ $unit['property_type'] }}</td>
                                <th>Area :</th><td>{{ $project['area_name'] }}</td>
                                <th>Price sqft :</th><td>{{ $unit['per_sq_ft_price'] }}</td>
                                </tr>
                                <tr>
                                @if($unit['building_id'])
                                <th>Floor no :</th><td>{{ $unit['floor'] }}</td>
                                <th>Tower Name :</th><td>{{ $unit['building']['name'] }}</td>
                                @endif
                                <th>Total Price :</th><td>{{ $unit['selling_amount'] }}</td>
                                <th>Booking Amount :</th><td>{{ $unit['booking_amount'] }}</td>
                                </tr>
                                <tr>
                                <th>Builder :</th><td>{{ $project['builder_name'] }}</td>
                                <th>Locality :</th><td>{{ $project['city'] }}</td>
                                </tr>
                                </table>
                        </div>
                    </div>
                </div>
                <div class="panel panel-default">
                    <div class="panel-heading collapsed">
                        <h4 class="panel-title">
<a class="collapsed" data-toggle="collapse" data-parent="#accordion" href="#collapseThree">
<span class="semi-bold">Payment Details :</span> 
</a>
</h4>
                    </div>
                    <div id="collapseThree" class="panel-collapse collapse" style="height: 0px;">
                        <div class="panel-body">
                            <h4>Payment Details </h4>
                            <form method="post" action="/project/{{ $project['id'] }}/makepayment/{{ $unit['id'] }}">
                            <button type="submit" class="btn btn-primary btn-cons"><i class="fa fa-plus-circle"></i> Make Payment</button>
                            <input type="hidden" value="{{ csrf_token()}}" name="_token"/>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
            
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

<script type="text/javascript">
$('.addBuyerToCrm').click(function (event) { 
    var project_id = $("#unitId").val();
    var unit_id = $("#projectId").val();
    $.ajax({
        url: "/project/" + project_id + "/addbookingtocrm/" + unit_id,
        type: "POST", 
        headers: {
        'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
    	},
        data: {
            buyerData: $("#frmaddBuyer").serialize()
        },
        success: function (response) {
             
        }
    });

});
</script>   
    </body>
</html>