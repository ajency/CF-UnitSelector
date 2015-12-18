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
    <meta name="header" content="<?php echo unitSelectorAuthKey;?>" />

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
                <h3 class="text-center text-uppercase">3 Steps for booking your apartment</h3>
                <span class="text-center col-md-12 col-sm-12 col-xs-12 spanText">Complete your booking securely through our payment gateway</span>
                <span class="text-center col-md-12 col-sm-12 col-xs-12 timerText">Current session will restart in <b><br><span id="timeCounter" class="orangeText "><?php echo EXPIREDURATION;echo ":00";?></b> minutes</span>
                <div class="bookAptOuter">
                    <div class="row">
                    <div class="col-md-6 col-sm-6 col-xs-12">
                        <span class="text-uppercase bookApmt">Book your apartment</span>
                        <br>
                        <span class="text-uppercase flatNo"> <?php echo $unitData['project_title']?> <span class="hyphen">-</span> <br><?php echo $unitData['unit']['name']?>  </span>
                    </div>
                    <div class="col-md-6 col-sm-6 col-xs-12">                       
                        <div class="priceOuter">
                            <i class="fa fa-inr orangeText"></i><h4 class="amount"><?php echo formatAmount($totalSaleValue);?></h4>
                            <span class="text-uppercase totalPrice">Total price</span>
                        </div>
                        <div class="borderDiv">&nbsp;</div>
                        <div class="priceOuter">
                            <i class="fa fa-inr orangeText"></i><h4 class="amount"><?php echo $booking_amount;?></h4>
                            <span class="text-uppercase totalPrice">Booking Amount</span>
                        </div>
                    </div>
                    </div>
                </div>

                <div class="">
                 <form onsubmit="return makeUnitPayment();"  method="post" action="/application/controller/payment-gateway.php" id="listingMainForm" data-parsley-validate>
                 <input type="hidden" name="unit_id" value="<?php echo $unitId?>" >
                 <input type="hidden" name="project_id" value="<?php echo $projectId?>" >
                 <input type="hidden" name="merchant_id" value="<?php echo $merchantId?>" >
                 <input type="hidden" name="salt" value="<?php echo $salt ?>" >
                 <input type="hidden" name="bookingId" value="<?php echo $bookingId ?>" >
                 <input type="hidden" name="startTime" value="<?php echo $startTime ?>" >
                 <input type="hidden" name="makePayment" value="0" >
                 <input type="hidden" name="lead" value="0" >
                 
                <div class="panel-group col-md-12 col-sm-12 col-xs-12" id="accordion" role="tablist" aria-multiselectable="true">
                  <div class="panel-inner">
                  <div class="panel panel-default">
                    <div class="panel-heading active" role="tab" id="headingOne">
                      <h4 class="panel-title">
                        <a id="acc-1" class=" plusMinusOuter" role="button" data-toggle="collapse" data-parent="#accordion" href="#collapseOne" aria-expanded="true" aria-controls="collapseOne">
                          1. Basic Information
                          <span class="plusMinusIcon plusIcon"><i class="fa fa-plus-square-o"></i></span>
                          <span class="plusMinusIcon minusIcon"><i class="fa fa-minus-square-o"></i></span>
                        </a>
                      </h4>
                    </div>
                    <div id="collapseOne" class="panel-collapse collapse in" role="tabpanel" aria-labelledby="headingThree" aria-expanded="true">
                      <div class="panel-body">  
                        <div class="col-md-12 col-sm-12 col-xs-12 mandatory mB25">
                            All fields are mandatory
                            <a href="javascript:void(0)" class="closeMandartory">X</a>
                        </div>                  
                        <div class="col-md-12 col-sm-12 col-xs-12 personalDetails buyerDetails">
                        
                            <div class="row">
                                <div class="col-md-4 col-sm-4 col-xs-12">                           
                                    <input class="basic_info form-control" type="text" id="first_name" name="contact_first_name" placeholder="First Name" data-parsley-pattern="^[A-Za-z ]*$" pattern="^[A-Za-z ]*$" data-parsley-required/>
 
                                </div>
                                <div class="col-md-4 col-sm-4 col-xs-12">                                   
                                    <input class="basic_info form-control" type="text" id="last_name" name="contact_last_name" placeholder="Last Name" data-parsley-required data-parsley-pattern="^[A-Za-z ]*$" pattern="^[A-Za-z ]*$"/>
                                </div>
                                <div class="col-md-4 col-sm-4 col-xs-12">                               
                                    <input class="basic_info form-control" type="text"  id="email" name="contact_email" placeholder="Email ID" data-parsley-type="email" data-parsley-required/>
                                </div>
                            </div>
                            <div class="row">
                                <div class="col-md-4 col-sm-4 col-xs-12">                                   
                                    <input class="basic_info form-control" type="text" id="mobile" name="contact_mobile" placeholder="Phone" data-parsley-required data-parsley-type="number" data-parsley-length="[10, 12]"/>
                                </div>
                                <div class="col-md-4 col-sm-4 col-xs-12">                                   
                                   <input class="basic_info form-control" type="text" id="pancard" name="contact_pancard" placeholder="Pan card" data-parsley-pattern="[A-Za-z]{5}[0-9]{4}[A-Za-z]{1}"  data-parsley-maxlength="10" data-parsley-maxlength-message="This value is too long. It should have 10 characters" data-parsley-required/>
                                </div>
                            </div>
                                                            
                            <h4 class="text-uppercase addressHeading">Address information</h4>
                            <div class="row">
                                <div class="col-md-8 col-sm-8 col-xs-12">                                   
                                    <input class="basic_info form-control" type="text" id="city" name="contact_address" placeholder="Address" data-parsley-required/>
                                </div>
                                <div class="col-md-4 col-sm-4 col-xs-12">                                   
                                    <input class="basic_info form-control" type="text" id="city" name="contact_city" placeholder="City" data-parsley-required/>
                                </div>                                                                                          
                            </div>
                            <div class="row">
                                <div class="col-md-4 col-sm-4 col-xs-12">                                   
                                    <input class="basic_info form-control" type="text" id="state" name="contact_state" placeholder="Enter State" data-parsley-required/>
                                </div>
                                <div class="col-md-4 col-sm-4 col-xs-12">                                   
                                     <input class="basic_info form-control" type="text" id="zipcode" name="contact_zipcode" placeholder="Enter Zipcode" data-parsley-required/>
                                </div>  
                                <div class="col-md-4 col-sm-4 col-xs-12">                                   
                                    <select class="basic_info form-control" name="buyer_type" class="form-control" data-parsley-required>
                                        <option value="">Buyer Type</option>
                                        <option value="Indian">Indian</option>
                                        <option value="POI/OCI">POI/OCI</option>
                                        <option value="NRI">NRI</option>
                                    </select>
                                </div>
                                
                            </div>
                            <div class="row">
                                
                                <div class="col-md-4 col-sm-4 col-xs-12">                                   
                                     <input class="basic_info form-control" type="text" id="country" name="contact_country" placeholder="Enter Country" data-parsley-required/>
                                </div>                              
                            </div>
                            
                            <div class="row">
                            <div class="col-md-12 col-sm-12 col-xs-12 buttonOuter">
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
                        <a id="acc-2" class="collapsed plusMinusOuter" role="button"   href="#collapseTwo" data-parent="#accordion" data-toggle="collapse" aria-expanded="false" aria-controls="collapseTwo">
                          2. Property Information
                          <span class="plusMinusIcon plusIcon"><i class="fa fa-plus-square-o"></i></span>
                          <span class="plusMinusIcon minusIcon"><i class="fa fa-minus-square-o"></i></span>
                        </a>
                      </h4>
                    </div>
                    <div id="collapseTwo" class="panel-collapse collapse" role="tabpanel" aria-labelledby="headingTwo">
                      <div class="panel-body">
                     
                        <h4 class="apartmentName col-md-6 col-sm-6 col-xs-12"><?php echo $unitData['project_title']?> <span class="unitName">(<?php echo $unitData['unit']['name']?>)</span></h4>
                        <div class="col-md-6 col-sm-6 col-xs-12 pricepaymentButtons">
                            <div class="col-md-6 col-sm-6 col-xs-6">
                                <a style="cursor:pointer" onclick="getPriceSheet('<?php echo $unitId?>',false,'<?php echo $unitData['project_title'] ." (". $unitData['unit']['name'].")"?>','<?php echo $projectId?>','<?php echo GET_PAYMENT_PLAN_URL?>')">Price Sheet</a>
                            </div>
                            
                            <div class="col-md-6 col-sm-6 col-xs-6">
                                <a  style="cursor:pointer" onclick="getPaymentPlan('<?php echo $unitId?>',false,'<?php echo $unitData['project_title'] ." (". $unitData['unit']['name'].")"?>','<?php echo $projectId?>','<?php echo GET_PAYMENT_PLAN_URL?>')">Payment Plan</a>
                            </div>
                        </div>


                        <div class="col-md-8 col-sm-8 col-xs-12 reviewDetails">                     
                        
                            <div class="col-md-12 col-sm-12 col-xs-12 detailsOuter">
                                <div>
                                    <div class="col-xs-12 unitDetails"><?php echo $unitData['unit']['unit_type']?></div>
                                    <div class="col-xs-12 titleDetails">BHK Type</div>
                                </div>
                                <div>
                                    <div class="col-xs-12 unitDetails"><?php echo $unitData['project_type']?></div>
                                    <div class="col-xs-12 titleDetails">Property Type</div> 
                                </div>
                                <div>
                                    <div class="col-xs-12 unitDetails"><?php echo $unitData['unit']['built_up_area']?> Sq Ft</div>
                                    <div class="col-xs-12 titleDetails">Area</div>
                                </div>
                                <div>
                                     <div class="col-xs-12 unitDetails"><i class="fa fa-inr"></i> <?php echo moneyFormatIndia($unitData['unit']['per_sq_ft_price'])?></div>
                                     <div class="col-xs-12 titleDetails">Price per SQFT.</div>                                   
                                </div>
                                <?php 
                                if(!empty($unitData['building']))
                                {
                                ?>
                                <div>
                                    <div class="col-xs-12 unitDetails"><?php echo ordinalSuffix($unitData['unit']['floor_number'])?> Floor</div>
                                    <div class="col-xs-12 titleDetails">Floor Number</div>
                                </div>
                        
                                <div>
                                    <div class="col-xs-12 unitDetails"><?php echo $unitData['building']['name']?></div>
                                    <div class="col-xs-12 titleDetails">Tower Name</div>
                                </div>
                                <?php 
                                }
                                ?>
                                <div>
                                    <div class="col-xs-12 unitDetails"><i class="fa fa-inr"></i> <?php echo formatAmount($totalSaleValue);?></div>
                                    <div class="col-xs-12 titleDetails">Total Price</div> 
                                </div>
                                <div>
                                    <div class="col-xs-12 unitDetails"><i class="fa fa-inr"></i> <?php echo $booking_amount;?></div>
                                    <div class="col-xs-12 titleDetails">Booking Amount</div>
                                </div>
                                <div>
                                     <?php
                                     if(strlen($unitData['builder_name'])>18)
                                     {
                                        ?>
                                        <div class="col-xs-12 unitDetails builderName" data-toggle="tooltip" data-placement="top" title="" data-original-title="<?php echo $unitData['builder_name']?>"><?php echo $unitData['builder_name']?></div>
                                        <?php
                                     }
                                     else
                                     {
                                        ?>
                                        <div class="col-xs-12 unitDetails builderName" ><?php echo $unitData['builder_name']?></div>
                                        <?php
                                     }
                                     ?>
                                     <div class="col-xs-12 titleDetails">Builder</div>                                   
                                </div>
                                <div>
                                    <div class="col-xs-12 unitDetails"><?php echo $unitData['area_name']?></div>
                                    <div class="col-xs-12 titleDetails">Locality</div>
                                </div>
                            </div>                                              
                      
                        </div>
                        <div class="col-md-4 col-sm-4 col-xs-12 userInfo hidden">
                                                                      
                        </div>
                       <div class="row">
                        <div class="col-md-12 col-sm-12 col-xs-12 btnOuter buttonOuter">
                            <button onclick="goToNextStep('acc-3','unitDetails')" type="button" class="btn btn-default btn-primary btn-sm">Continue to next step</button></div>
                        </div>
                      </div>
                    </div>
                  </div>
                 <!-- <div class="panel panel-default">
                    <div class="panel-heading" role="tab" id="headingThree">
                      <h4 class="panel-title">
                        <a class="collapsed plusMinusOuter" role="button" data-toggle="collapse" data-parent="#accordion" href="#collapseThree" aria-expanded="false" aria-controls="collapseThree">
                          3. Billing Information
                          <span class="plusMinusIcon plusIcon"><i class="fa fa-plus-square-o"></i></span>
                          <span class="plusMinusIcon minusIcon"><i class="fa fa-minus-square-o"></i></span>
                        </a>
                      </h4>
                    </div>
                    <div id="collapseThree" class="panel-collapse collapse" role="tabpanel" aria-labelledby="headingThree">
                      <div class="panel-body">  
                        <div class="col-md-12 col-sm-12 col-xs-12 mandatory mB25">
                            All fields are mandatory
                            <a href="javascript:void(0)" class="closeMandartory">X</a>
                        </div>
                        <div class="col-md-12 col-sm-12 col-xs-12 sameAsAbove mB25">
                            <input type="checkbox" name="copybasicinfo" onclick="copyBillingInfo(this);" data-parsley-multiple="copybasicinfo" data-parsley-id="0723"/>
                            <input type="checkbox"/>
                            <label class="checkboxLabel"></label>
                            <span class="accept">Same as basic information</span>
                             
                        </div>                  
                        <div class="col-md-12 col-sm-12 col-xs-12 personalDetails">
                        
                            <div class="row">
                                <div class="col-md-4 col-sm-4 col-xs-12">                           
                                    <input class="form-control" type="text" placeholder="First Name"/>
                                </div>
                                <div class="col-md-4 col-sm-4 col-xs-12">                                   
                                    <input class="form-control" type="text" placeholder="Last Name"/>
                                </div>
                                <div class="col-md-4 col-sm-4 col-xs-12">                               
                                    <input class="form-control" type="text" placeholder="Email ID"/>
                                </div>
                            </div>
                            <div class="row">
                                <div class="col-md-4 col-sm-4 col-xs-12">                                   
                                    <input class="form-control" type="text" placeholder="Phone"/>
                                </div>
                                <div class="col-md-4 col-sm-4 col-xs-12">                                   
                                    <input class="form-control" type="text" placeholder="Birthdate"/>
                                </div>
                                <div class="col-md-4 col-sm-4 col-xs-12">                                   
                                    <input class="form-control" class="form-control" type="text" placeholder="City"/>
                                </div>                              
                            </div>
                            <div class="row">
                                <div class="col-md-8 col-sm-8 col-xs-12">                                   
                                    <input class="form-control" type="text" placeholder="Address"/>
                                </div>
                                <div class="col-md-4 col-sm-4 col-xs-12">                                   
                                    <input class="form-control" type="text" placeholder="Enter Zipcode"/>
                                </div>                              
                            </div>
                            <div class="row">
                                <div class="col-md-4 col-sm-4 col-xs-12">                                   
                                    <select class="form-control">
                                        <option>Nationality</option>
                                        <option>Indian</option>
                                        <option>POI/OCI</option>
                                        <option>NRI</option>
                                    </select>
                                </div>
                                <div class="col-md-4 col-sm-4 col-xs-12">                                   
                                    <select class="form-control">
                                        <option>State</option>
                                        <option>Goa</option>
                                        <option>Maharashtra</option>
                                        <option>Karnataka</option>
                                    </select>
                                </div>
                                <div class="col-md-4 col-sm-4 col-xs-12">                                   
                                    <select class="form-control">
                                        <option>Country</option>
                                        <option>India</option>                              
                                    </select>
                                </div>                              
                            </div>
                            
                            <div class="row">
                            <div class="col-md-12 col-sm-12 col-xs-12 buttonOuter">
                                <button class="btn btn-default btn-primary btn-sm">Continue to next step</button></div>
                            </div>
                        </div>
                      </div>
                    </div>
                  </div>-->
                  
                  <div class="panel panel-default">
                    <div class="panel-heading" role="tab" id="headingThree">
                      <h4 class="panel-title">
                        <a onclick="addValidation()" id="acc-3" class="collapsed plusMinusOuter" role="button" data-toggle="collapse" data-parent="#accordion" href="#collapseThree" aria-expanded="false" aria-controls="collapseThree">
                          3. Payment
                          <span class="plusMinusIcon plusIcon"><i class="fa fa-plus-square-o"></i></span>
                          <span class="plusMinusIcon minusIcon"><i class="fa fa-minus-square-o"></i></span>
                        </a>
                      </h4>
                    </div>
                    <div id="collapseThree" class="panel-collapse collapse" role="tabpanel" aria-labelledby="headingThree">
                      <div class="panel-body text-center">
                        <div class="col-md-12 col-sm-12 col-xs-12 termsConditions">
                            <div class="row">
                                <div>Complete your booking safely with us. You will be redirected to the payment getway on click of Make Payment button.</div>
                                <label>
                                    <input type="checkbox" name="acceptterm"  id="acceptterm"  />
                                    <label class="checkboxLabel"></label>
                                    <span class="accept">I accept the <a target="_blank" href="termsCondition.php">Terms and Conditions</a></span>
                                </label>
                            </div>
                        </div>
                        
                        <div class="row">
                        <div class="col-md-12 col-sm-12 col-xs-12 buttonOuter">
                            <button onclick="updateTextValue();" type="submit"  class="btn btn-primary btn-default btn-sm">Make payment</button></div>
                        </div>
                      </div>
                    </div>
                  </div>
                  </div>
                  <div class="bottomSection">
                        <div class="col-xs-12">                         
                            <span class="rightContent">                                                         
                                <p class="text-capitalize">
                                    <span class="supportNoText"><i class="fa fa-phone"></i> &nbsp; Support : 1800 180 180 180 </span>
                                    <span class="safePaymentText"><i class="fa fa-lock"></i> &nbsp; Safe and secure payment</span>
                                </p>
                            </span>
                        </div>
                        
                    </div>
                </div>
                
                </div>
                
            </div>
            <div class="bookingFooter">
                   Call <?php echo $unitData['builder_phone']?>
                     <div class="privacyOuter"><a href="https://www.commonfloor.com/">Commonfloor</a> | <a  target="_blank" href="faq.php">FAQ</a> | <a href="https://play.google.com/store/apps/details?id=com.commonfloor&hl=en">Mobile Apps © commonfloor inc. </a>| <a target="_blank" href="privacy.php">Privacy Policy</a></div>
                 </div>
        </div>
        
        
<div class="modal fade col-md-12 col-sm-12 col-xs-12" id="myModalViewFullPaymentPlan" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">
        <div class="modal-dialog" style="margin-top:100px;">
            <div class="modal-content">
                <div class="modal-body">
                </div>
            </div>
        </div>
    </div>

    <div class="modal fade col-md-12 col-sm-12 col-xs-12" id="myModalFullPriceSheet" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">
        <div class="modal-dialog" style="margin-top:100px;">
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
                      $('.plusMinusOuter').addClass('collapsed');
                    }                   
                });
                $('.closeMandartory').click(function() {                
                   $('.mandatory').fadeOut();                                      
                });     

                $(function () {
                  $('[data-toggle="tooltip"]').tooltip()
                })        
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
             var leadUrl = "<?php echo ADDLEAD_URL ;?>";
        </script>

    </body>
</html>