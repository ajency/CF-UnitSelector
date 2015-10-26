<?php
require_once '../includes/include.php';
require_once '../application/controller/indexController.php'; 

if(isset($_GET['unitId']) && isset($_GET['timeout']))
{  
    $unitId = $_GET['unitId'];
    $unit_status = availablity_available;
    updateUnitStatus($unitId ,$unit_status);
    
    header('location:'.SITE_URL.'public/timeout.php');
    exit;

}
if(isset($_GET['unitId']) && isset($_GET['projectId']))
{
    $unitId = $_GET['unitId'];
    $projectId = $_GET['projectId'];
}
else
{
    header('location:'.SITE_URL.'public/unit.php');
    exit;
}

$_SESSION['unitId']= $unitId;
$_SESSION['projectId']=$projectId;
$bookingId=uniqid();
$unitinfo = bookNow($bookingId,$unitId); 
$counter = EXPIREDURATION*60;
$unitData =$unitinfo['data'] ; 
$merchantId =$unitData['merchant_id'] ; 
$salt =$unitData['salt'] ; 
$booking_amount=getBookingAmount($unitId,"booking_amount"); 
$totalSaleValue=getBookingAmount($unitId,"sale_value");
$startTime= time();  
?>
<!doctype html>
<html>
    <head>
    <meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
      <meta name='viewport' content='width=device-width, initial-scale=1.0, maximum-scale=1.0'/>
    <!-- The above 3 meta tags *must* come first in the head; any other head content must come *after* these tags -->
    <title>Unit-selector -booknow</title>

    <link href='css/bookflow.css' rel='stylesheet'/>
    <link href='css/font-awesome.css' rel='stylesheet'/>

    <link rel="stylesheet" href="http://cdnjs.cloudflare.com/ajax/libs/github-fork-ribbon-css/0.1.1/gh-fork-ribbon.min.css" />
    <link rel="stylesheet" type="text/css" href="http://cdn.jsdelivr.net/jquery.slick/1.5.7/slick.css"/>
    <!-- Bootstrap -->
    <link href="css/bootstrap.min.css" rel="stylesheet">

    <!-- HTML5 shim and Respond.js for IE8 support of HTML5 elements and media queries -->
    <!-- WARNING: Respond.js doesn't work if you view the page via file:// -->
    <!--[if lt IE 9]>
      <script src="https://oss.maxcdn.com/html5shiv/3.7.2/html5shiv.min.js"></script>
      <script src="https://oss.maxcdn.com/respond/1.4.2/respond.min.js"></script>
    <![endif]-->
  </head>

    <body class="bookingFlow">      
        <div class="container-fluid bookFlowContent">
        <div class="absoluteLayout"></div>
            <div class="container">
                <h3 class="text-center text-uppercase">4 Steps to buy your apartment</h3>
                <span class="text-center col-md-12 col-sm-12 col-xs-12 spanText">Complete your booking securely through our payment gateway!</span>
                <div class="text-center col-md-12 col-sm-12 col-xs-12 timerText">Current Session will restart in <span id="timeCounter"><?php echo EXPIREDURATION;echo ":00";?></span> minutes!</div>
                
                <div class="bookAptOuter">
                    <div class="row">
                    <div class="col-md-6 col-xs-12">
                        <span class="text-uppercase bookApmt">Book your apartment</span>
                        <span class="text-uppercase flatNo">( <?php echo $unitData['project_title']?> - <?php echo $unitData['unit']['name']?> ) </span>
                    </div>
                    <div class="col-md-6 col-xs-12">                        
                        <div class="priceOuter">
                            <i class="fa fa-inr orangeText"></i><h4 class="amount"><?php echo $totalSaleValue;?></h4>
                            <span class="text-uppercase totalPrice">Total price</span>
                        </div>
                        <div class="borderDiv">&nbsp;</div>
                        <div class="priceOuter">
                            <i class="fa fa-inr orangeText"></i><h4 class="amount"><?php echo $booking_amount;?></h4>
                            <span class="text-uppercase totalPrice">Transaction Amount</span>
                        </div>
                    </div>
                    </div>
                </div>
                
                <div class="">
                <form  method="post" action="/application/controller/payment-gateway.php" id="listingMainForm" data-parsley-validate>
                 <input type="hidden" name="unit_id" value="<?php echo $unitId?>" >
                 <input type="hidden" name="project_id" value="<?php echo $projectId?>" >
                 <input type="hidden" name="merchant_id" value="<?php echo $merchantId?>" >
                 <input type="hidden" name="salt" value="<?php echo $salt ?>" >
                 <input type="hidden" name="bookingId" value="<?php echo $bookingId ?>" >
                 <input type="hidden" name="startTime" value="<?php echo $startTime ?>" >

               <div class="panel-group col-md-12 col-sm-12 col-xs-12" id="accordion" role="tablist" aria-multiselectable="true">
                  <div class="panel-inner">
                  <div class="panel panel-default">
                    <div class="panel-heading active" role="tab" id="headingOne">
                      <h4 class="panel-title">
                        <a class="plusMinusOuter" role="button" data-toggle="collapse" data-parent="#accordion" href="#collapseOne" aria-expanded="true" aria-controls="collapseOne">
                          1. Basic Information
                          <span class="plusMinusIcon plusIcon">+</span>
                          <span class="plusMinusIcon minusIcon">-</span>
                        </a>
                      </h4>
                    </div>
                    <div id="collapseOne" class="panel-collapse collapse in" role="tabpanel" aria-labelledby="headingThree" aria-expanded="true">
                      <div class="panel-body">  
                        <div class="col-md-12 col-sm-12 col-xs-12 mandatory mB25">
                            All fields are mandatory
                        </div>                  
                        <div class="col-md-12 col-sm-12 col-xs-12 personalDetails buyerDetails">
                        
                            <div class="row">
                                <div class="col-md-4 col-sm-4 col-xs-12">                           
                                    <input type="text" id="first_name" name="contact_first_name" placeholder="First Name" data-parsley-pattern="^[A-Za-z]*$" pattern="^[A-Za-z]*$" data-parsley-required/>
 
                                </div>
                                <div class="col-md-4 col-sm-4 col-xs-12">                                   
                                    <input type="text" id="last_name" name="contact_last_name" placeholder="Last Name" data-parsley-required data-parsley-pattern="^[A-Za-z]*$" pattern="^[A-Za-z]*$"/>
                                </div>
                                <div class="col-md-4 col-sm-4 col-xs-12">                               
                                    <input type="text"  id="email" name="contact_email" placeholder="Email ID" data-parsley-type="email" data-parsley-required/>
                                </div>
                            </div>
                            <div class="row">
                                <div class="col-md-4 col-sm-4 col-xs-12">                                   
                                    <input type="text" id="mobile" name="contact_mobile" placeholder="Phone" data-parsley-required data-parsley-type="number" data-parsley-length="[10, 12]"/>
                                </div>
                                <div class="col-md-4 col-sm-4 col-xs-12">                                   
                                    <input type="text" id="pancard" name="contact_pancard" placeholder="Pan card" data-parsley-required/>
                                </div>
                                <div class="col-md-4 col-sm-4 col-xs-12">                                   
                                    <input type="text" id="city" name="contact_city" placeholder="City" data-parsley-required/>
                                </div>                              
                            </div>
                            <div class="row">
                                <div class="col-md-8 col-sm-8 col-xs-12">                                   
                                    <input type="text" id="city" name="contact_address" placeholder="Address" data-parsley-required/>
                                </div>
                                <div class="col-md-4 col-sm-4 col-xs-12">                                   
                                    <input type="text" id="zipcode" name="contact_zipcode" placeholder="Enter Zipcode" data-parsley-required/>
                                </div>                              
                            </div>
                            <div class="row">
                                <div class="col-md-4 col-sm-4 col-xs-12">                                   
                                    <select name="buyer_type" data-parsley-required>
                                        <option value="">Buyer Type</option>
                                        <option value="Indian">Indian</option>
                                        <option value="POI/OCI">POI/OCI</option>
                                        <option value="NRI">NRI</option>
                                    </select>
                                </div>
                                <div class="col-md-4 col-sm-4 col-xs-12">                                   
                                    <input type="text" id="state" name="contact_state" placeholder="Enter State" data-parsley-required/>
                                </div>  
                                <div class="col-md-4 col-sm-4 col-xs-12">                                   
                                    <input type="text" id="country" name="contact_country" placeholder="Enter Country" data-parsley-required/>
                                </div>
                                     
                            </div>
                            
                            <div class="row">
                            <div class="col-md-12 col-sm-12 col-xs-12">
                                <button onclick="goToNextStep('acc-2','buyerDetails')" type="button" class="btn btn-default btn-primary btn-sm">Continue to next step</button>
                            </div>
                            </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  <div class="panel panel-default">
                    <div class="panel-heading" role="tab" id="headingTwo">
                      <h4 class="panel-title">
                        <a id="acc-2" class="collapsed plusMinusOuter" role="button" data-toggle="collapse" data-parent="#accordion" href="#collapseTwo" aria-expanded="false" aria-controls="collapseTwo">
                          2. View Property Selected
                          <span class="plusMinusIcon plusIcon">+</span>
                          <span class="plusMinusIcon minusIcon">-</span>
                        </a>
                      </h4>
                    </div>
                    <div id="collapseTwo" class="panel-collapse collapse" role="tabpanel" aria-labelledby="headingTwo">
                      <div class="panel-body">
                        <div class="col-md-12 col-sm-12 col-xs-12 reviewDetails">
                        <div class="row">
                        <h4 class="orangeText"><?php echo $unitData['project_title']?>  <span class="unitName">(<?php echo $unitData['unit']['name']?>)</span></h4>
                        </div>
                        <div class="row">
                            <div class="col-md-12 col-sm-12 col-xs-12 detailsOuter">
                                <div class="col-md-2 col-xs-12">
                                    <div class="col-xs-12 unitDetails"><?php echo $unitData['unit']['unit_type']?></div>
                                    <div class="col-xs-12 titleDetails">BHK Type</div>
                                </div>
                                <div class="col-md-2 col-xs-12">
                                    <div class="col-xs-12 unitDetails"><?php echo $unitData['project_type']?></div>
                                    <div class="col-xs-12 titleDetails">Property Type</div> 
                                </div>
                                <div class="col-md-2 col-xs-12">
                                    <div class="col-xs-12 unitDetails"><?php echo $unitData['unit']['built_up_area']?> Sq Ft</div>
                                    <div class="col-xs-12 titleDetails">Area</div>
                                </div>
                                <div class="col-md-2 col-xs-12">
                                     <div class="col-xs-12 unitDetails"><i class="fa fa-inr"></i> <?php echo moneyFormatIndia($unitData['unit']['per_sq_ft_price'])?></div>
                                     <div class="col-xs-12 titleDetails">Price per SQFT.</div>                                   
                                </div>
                                <?php 
                                if(!empty($unitData['building']))
                                {
                                ?>
                                <div class="col-md-2 col-xs-12">
                                    <div class="col-xs-12 unitDetails"><?php echo ordinalSuffix($unitData['unit']['floor_number'])?> Floor</div>
                                    <div class="col-xs-12 titleDetails">Floor Number</div>
                                </div>
                        
                                <div class="col-md-2 col-xs-12">
                                    <div class="col-xs-12 unitDetails"><?php echo $unitData['building']['name']?></div>
                                    <div class="col-xs-12 titleDetails">Tower Name</div>
                                </div>
                                <?php 
                                }
                                ?>
                                <div class="col-md-2 col-xs-12">
                                    <div class="col-xs-12 unitDetails"><i class="fa fa-inr"></i> <?php echo $totalSaleValue;?></div>
                                    <div class="col-xs-12 titleDetails">Total Price</div> 
                                </div>
                                <div class="col-md-2 col-xs-12">
                                    <div class="col-xs-12 unitDetails"><i class="fa fa-inr"></i> <?php echo $booking_amount;?></div>
                                    <div class="col-xs-12 titleDetails">Booking Amount</div>
                                </div>
                                <div class="col-md-2 col-xs-12">
                                     <div class="col-xs-12 unitDetails"><?php echo $unitData['builder_name']?></div>
                                     <div class="col-xs-12 titleDetails">Builder</div>                                   
                                </div>
                                <div class="col-md-2 col-xs-12">
                                    <div class="col-xs-12 unitDetails"><?php echo $unitData['area_name']?></div>
                                    <div class="col-xs-12 titleDetails">Locality</div>
                                </div>
                            </div>                                              
                            <div class="row detailsOuter">
                                <div class="col-md-6 col-xs-12">
                                    <a style="cursor:pointer" onclick="getPriceSheet('<?php echo $unitId?>',false,'Title','<?php echo $projectId?>','<?php echo GET_PAYMENT_PLAN_URL?>')">Price Sheet</a>
                                </div>
                                
                                <div class="col-md-6 col-xs-12">
                                    <a style="cursor:pointer" onclick="getPaymentPlan('<?php echo $unitId?>',false,'Title','<?php echo $projectId?>','<?php echo GET_PAYMENT_PLAN_URL?>')">Payment Plan</a>
                                </div>
                            </div>                          
                        </div>
                        </div>
                       <div class="row">
                        <div class="col-md-12 col-sm-12 col-xs-12 btnOuter">
                            <button onclick="goToNextStep('acc-3','detailsOuter')" type="button" class="btn btn-default btn-primary btn-sm">Continue to next step</button></div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div class="panel panel-default">
                    <div class="panel-heading" role="tab" id="headingThree">
                      <h4 class="panel-title">
                        <a id="acc-3" class="collapsed plusMinusOuter" role="button" data-toggle="collapse" data-parent="#accordion" href="#collapseThree" aria-expanded="false" aria-controls="collapseThree">
                          3. Billing Information
                          <span class="plusMinusIcon plusIcon">+</span>
                          <span class="plusMinusIcon minusIcon">-</span>
                        </a>
                      </h4>
                    </div>
                    <div id="collapseThree" class="panel-collapse collapse" role="tabpanel" aria-labelledby="headingThree">
                      <div class="panel-body">  
                        <div class="col-md-12 col-sm-12 col-xs-12 mandatory mB25">
                            All fields are mandatory
                        </div> 
                        <div class="col-md-12 col-sm-12 col-xs-12 sameAsAbove mB25">
                            <input type="checkbox" name="copybasicinfo" onclick="copyBillingInfo(this);" > Same as basic information
                        </div>                  
                        <div class="col-md-12 col-sm-12 col-xs-12 personalDetails billingDetails">
                        
                            <div class="row">
                                <div class="col-md-4 col-sm-4 col-xs-12">                           
                                    <input type="text" name="billing_first_name" placeholder="First Name"  data-parsley-pattern="^[A-Za-z]*$" pattern="^[A-Za-z]*$" data-parsley-required/>
                                </div>
                                <div class="col-md-4 col-sm-4 col-xs-12">                                   
                                    <input type="text" name="billing_last_name" placeholder="Last Name"  data-parsley-pattern="^[A-Za-z]*$" pattern="^[A-Za-z]*$" data-parsley-required/>
                                </div>
                                <div class="col-md-4 col-sm-4 col-xs-12">                               
                                    <input type="text" name="billing_email" placeholder="Email ID" data-parsley-required data-parsley-type="email"/>
                                </div>
                            </div>
                            <div class="row">
                                <div class="col-md-4 col-sm-4 col-xs-12">                                   
                                    <input type="text" id="mobile" name="billing_mobile" placeholder="Phone" data-parsley-required data-parsley-type="number"  data-parsley-length="[10, 12]"/>
                                </div>
                                <div class="col-md-4 col-sm-4 col-xs-12">                                   
                                    <input type="text" id="pancard" name="billing_pancard" placeholder="Pan card" data-parsley-required/>
                                </div>
                                <div class="col-md-4 col-sm-4 col-xs-12">                                   
                                    <input type="text" id="city" name="billing_city" placeholder="City" data-parsley-required/>
                                </div>                              
                            </div>
                            <div class="row">
                                <div class="col-md-8 col-sm-8 col-xs-12">                                   
                                    <input type="text" id="city" name="billing_address" placeholder="Address" data-parsley-required/>
                                </div>
                                <div class="col-md-4 col-sm-4 col-xs-12">                                   
                                    <input type="text" id="zipcode" name="billing_zipcode" placeholder="Enter Zipcode" data-parsley-required/>
                                </div>                              
                            </div>
                            <div class="row">
                                <div class="col-md-4 col-sm-4 col-xs-12">                                   
                                    <select name="billing_buyer_type" data-parsley-required>
                                        <option value="">Buyer Type</option>
                                        <option value="Indian">Indian</option>
                                        <option value="POI/OCI">POI/OCI</option>
                                        <option value="NRI">NRI</option>
                                    </select>
                                </div>
                                <div class="col-md-4 col-sm-4 col-xs-12">                                   
                                    <input type="text" id="state" name="billing_state" placeholder="Enter State" data-parsley-required/>
                                </div>  
                                <div class="col-md-4 col-sm-4 col-xs-12">                                   
                                    <input type="text" id="country" name="billing_country" placeholder="Enter Country" data-parsley-required/>
                                </div>
                                     
                            </div>
                            
                            <div class="row">
                            <div class="col-md-12 col-sm-12 col-xs-12">
                                <button onclick="goToNextStep('acc-4','billingDetails')" type="button" class="btn btn-default btn-primary btn-sm">Continue to next step</button></div>
                            </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  <div class="panel panel-default">
                    <div class="panel-heading" role="tab" id="headingFour">
                      <h4 class="panel-title">
                        <a id="acc-4" class="collapsed plusMinusOuter" role="button" data-toggle="collapse" data-parent="#accordion" href="#collapseFour" aria-expanded="false" aria-controls="collapseFour">
                          4. Payment
                          <span class="plusMinusIcon plusIcon">+</span>
                          <span class="plusMinusIcon minusIcon">-</span>
                        </a>
                      </h4>
                    </div>
                    <div  id="collapseFour" class="panel-collapse collapse" role="tabpanel" aria-labelledby="headingFour">
                      <div class="panel-body">
                        <div class="col-md-12 col-sm-12 col-xs-12 termsConditions">
                            <div class="row">
                                <div>Complete your booking safely with us.</div>
                                <label>
                                    <input type="checkbox" name="acceptterm"  id="acceptterm" data-parsley-required />
                                    <label class="checkboxLabel"></label>
                                    <span class="accept">I accept the <a href="#">Terms and Conditions</a></span>
                                </label>
                            </div>
                        </div>
                        
                        <div class="row">
                        <div class="col-md-12 col-sm-12 col-xs-12">
                            <button  type="submit" class="btn btn-primary btn-default btn-small">Make payment</button></div>
                        </div>
                      </div>
                    </div>
                  </div>
                  </div>
                  <div class="bottomSection hidden-xs">
                    <div class="col-xs-6">
                        <span class="icon">

                        </span>
                        <span class="rightContent">
                            <h5 class="text-uppercase">Flexible payments</h5>
                            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do elusmod tempor incididunt.</p>
                        </span>
                    </div>
                    <div class="col-xs-6">
                        <span class="icon">

                        </span>
                        <span class="rightContent">
                            <h5 class="text-uppercase">Need some help?</h5>
                            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do elusmod tempor incididunt.</p>
                        </span>
                    </div>
                </div>
                </div>
                </form>
                </div>

                <div class="bookingFooter">
                    <a href="#">commonfloor.com</a>
                    <div class="privacyOuter"><a href="#">Commonfloor</a> | <a href="#">FAQ</a> | <a href="#">Mobile Apps © commnfloor inc. </a>| <a href="#">Privacy Policy</a></div>
                </div>
            </div>
        </div>
        
        
<div class="modal fade" id="myModalViewFullPaymentPlan" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">
        <div class="modal-dialog" style="width: 850px; margin-top:100px;">
            <div class="modal-content">
                <div class="modal-body">
                </div>
            </div>
        </div>
    </div>

    <div class="modal fade" id="myModalFullPriceSheet" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">
        <div class="modal-dialog" style="width: 850px; margin-top:100px;">
            <div class="modal-content">
                <div class="modal-body">
                </div>
            </div>
        </div>
    </div>
        
     <script src="js/jquery.min.js"></script>
    <script src="js/unit.js"></script>
   
    <!-- Include all compiled plugins (below), or include individual files as needed -->
    <script src="js/bootstrap.min.js"></script>
    <script src="js/jquery.panzoom.js"></script>
    <script src="js/parsleyjs/dist/parsley.js" type="text/javascript"></script>
    <script type="text/javascript">
        //$('.collapse').collapse()
        $( document ).ready(function() {                
            $('#accordion .panel-heading').click(function () {
                if (!$(this).hasClass('active'))
                {
                  // the element clicked was not active, but now is - 
                  $('.panel-heading').removeClass('active');
                  $(this).addClass('active'); 
                  $('.panel-collapse').removeClass('in');
                }                   
            });


            /*function btnClick(){
                alert("hiiiii");
                $(this).parents('.panel-collapse').removeClass('in');
                $(this).parents('.panel-default').find('panel-heading').removeClass('active');                  
            }   */  
            
          
                
        });

       
            
        </script>
        <script>
             jQuery(function($){
                var expireDuration = <?php echo $counter?>;
                display = $('#timeCounter');
                startTimer(expireDuration, display);

             });
             var unitId = $("input[name='unit_id']").val();
             var redirectPropertyUrl = "<?php echo SITE_URL ;?>public/booknow.php?timeout=true&unitId="+unitId;
        </script>

    </body>
</html>