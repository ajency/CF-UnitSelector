<?php
require_once '../includes/include.php';
require_once '../application/controller/indexController.php'; 

if(isset($_GET['unitId']) && isset($_GET['timeout']))
{  
    $unitId = $_GET['unitId'];
    $unit_status = availablity_available;
    updateUnitStatus($unitId ,$unit_status);
    
    header('location:http://unitselector-booking.local/public/timeout.php');
    exit;

}
if(isset($_GET['unitId']) && isset($_GET['projectId']))
{
    $unitId = $_GET['unitId'];
    $projectId = $_GET['projectId'];
}
else
{
    header('location:http://unitselector-booking.local/public/unit.php');
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
 
?>
<!doctype html>
<html>
    <head>
    <meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
      <meta name='viewport' content='width=device-width, initial-scale=1.0, maximum-scale=1.0'/>
    <!-- The above 3 meta tags *must* come first in the head; any other head content must come *after* these tags -->
    <title>Book Now</title>

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
        <div class="container-fluid header mB25">
            <div class="container">
                <h3 class="text-center mT10 mB10">Apply for an Appartment</h3>
            </div>
        </div>
         <form  method="post" action="/application/controller/payment-gateway.php" id="listingMainForm">
         <input type="hidden" name="unit_id" value="<?php echo $unitId?>" >
         <input type="hidden" name="project_id" value="<?php echo $projectId?>" >
         <input type="hidden" name="merchant_id" value="<?php echo $merchantId?>" >
         <input type="hidden" name="salt" value="<?php echo $salt ?>" >
         <input type="hidden" name="bookingId" value="<?php echo $bookingId ?>" >
        <div class="container-fluid content"> 
            <div class="container">
                <h2 class="text-center mT10 text-uppercase mB20">3 Steps to buying your appartment</h2>
                <span class="text-center col-md-12 col-sm-12 col-xs-12 mB20">Complete your booking securely through oour payment gateway.</span>
                <div class="text-center">Current Session will restart in <span id="timeCounter"><?php echo EXPIREDURATION;echo ":00";?></span> minutes!</div>
                
                <div class="panel-group col-md-12 col-sm-12 col-xs-12" id="accordion" role="tablist" aria-multiselectable="true">
                  <div class="panel-inner">
                  <div class="panel panel-default">
                    <div class="panel-heading" role="tab" id="headingThree">
                      <h4 class="panel-title">
                        <a id="acc-1" class="collapsed" role="button" data-toggle="collapse" data-parent="#accordion" href="#collapseThree" aria-expanded="false" aria-controls="collapseThree">
                          1. Basic Information
                        </a>
                      </h4>
                    </div>
                    <div id="collapseThree" class="panel-collapse collapse" role="tabpanel" aria-labelledby="headingThree">
                      <div class="panel-body">
                        <div class="col-md-12 col-sm-12 col-xs-12 mandatory mB25">
                            All fields are mandatory
                        </div>
                        <div class="col-md-12 col-sm-12 col-xs-12 personalDetails">
                        <div class="row">
                            <div class="row">
                                <div class="col-md-4 col-sm-4 col-xs-12">
                                    <label>Name</label>
                                    <input type="text" id="name" name="contact_name" placeholder="Enter First Name"/>
                                </div>
                                <div class="col-md-4 col-sm-4 col-xs-12">
                                    <label>Email</label>
                                    <input type="text" id="email" name="contact_email" placeholder="Enter Email Address"/>
                                </div>
                                <div class="col-md-4 col-sm-4 col-xs-12">
                                    <label>Phone</label>
                                    <input type="text" id="mobile" name="contact_mobile"  placeholder="Enter Phone Number"/>
                                </div>
                            </div>
 
                            </div>
                            <div class="col-md-12 col-sm-12 col-xs-12 text-center mT20 mB15">
                                <button type="button" onclick="goToNextStep('acc-2')" class="btn btnOrange">Continue</button>
                            </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  <div class="panel panel-default">
                    <div class="panel-heading" role="tab" id="headingTwo">
                      <h4 class="panel-title">
                        <a id="acc-2" class="collapsed" role="button" data-toggle="collapse" data-parent="#accordion" href="#collapseTwo" aria-expanded="false" aria-controls="collapseTwo">
                          2. View Property Selected
                        </a>
                      </h4>
                    </div>
                    <div id="collapseTwo" class="panel-collapse collapse" role="tabpanel" aria-labelledby="headingTwo">
                      <div class="panel-body">
                        <div class="col-md-12 col-sm-12 col-xs-12 reviewDetails">
                        <div class="row">
                        <h4 class="orangeText"><?php echo $unitData['project_title']?> <span class="unitName">(<?php echo $unitData['unit']['name']?>)</span></h4>
                        </div>
                        <div class="row">
                            <div class="col-md-12 col-sm-12 col-xs-12 mB15 unitDetails">
                                <div class="col-xs-3">
                                    <?php echo $unitData['unit']['unit_type']?>
                                </div>
                                <div class="col-xs-3">
                                     <?php echo $unitData['project_type']?>
                                </div>
                                <div class="col-xs-3">
                                    <?php echo $unitData['unit']['built_up_area']?> Sq Ft
                                </div>
                                <div class="col-xs-3">
                                     <i class="fa fa-inr"></i> <?php echo $unitData['unit']['per_sq_ft_price']?>
                                </div>
                            </div>
                        </div>
                        <div class="row">   
                            <div class="col-md-12 col-sm-12 col-xs-12 mB15 titleDetails">
                                <div class="col-xs-3">
                                    BHK Type
                                </div>
                                <div class="col-xs-3">
                                     Property Type
                                </div>
                                <div class="col-xs-3">
                                    Area
                                </div>
                                <div class="col-xs-3">
                                    Price per SQFT.
                                </div>
                            </div>
                        </div>
                        <div class="row">
                        <div class="col-md-12 col-sm-12 col-xs-12 mB15 unitDetails">
                        <?php 
                        if(!empty($unitData['building']))
                        {
                        ?>
                            
                                <div class="col-xs-3">
                                    <?php echo $unitData['unit']['floor_number']?> Floor
                                </div>
                                <div class="col-xs-3">
                                     <?php echo $unitData['building']['name']?>
                                </div>
                        <?php 
                        }
                        ?>
                                <div class="col-xs-3">
                                    <i class="fa fa-inr"></i> <?php echo $booking_amount;?>
                                </div>
                                <div class="col-xs-3">
                                     <i class="fa fa-inr"></i> <?php echo $totalSaleValue;?>
                                </div>
                            </div>
                        </div>
                        <div class="row">   
                            <div class="col-md-12 col-sm-12 col-xs-12 mB15 titleDetails">
                        <?php 
                        if(!empty($unitData['building']))
                        {
                        ?>
                                <div class="col-xs-3">
                                    Floor Number
                                </div>
                                <div class="col-xs-3">
                                     Tower Name
                                </div>
                        <?php 
                        }
                        ?>
                                <div class="col-xs-3">
                                    Total Price
                                </div>
                                <div class="col-xs-3">
                                    Booking Amount
                                </div>
                            </div>
                        </div>
                        <div class="row">
                            <div class="col-md-12 col-sm-12 col-xs-12 mB15 unitDetails">
                                <div class="col-xs-3">
                                    <?php echo $unitData['builder_name']?>
                                </div>
                                <div class="col-xs-3">
                                     
                                </div>
                                <div class="col-xs-3">
                                    <?php echo $unitData['area_name']?>
                                </div>
                                <div class="col-xs-3">
                                     
                                </div>
                            </div>
                        </div>
                        <div class="row">   
                            <div class="col-md-12 col-sm-12 col-xs-12 mB15 titleDetails">
                                <div class="col-xs-3">
                                    Builder
                                </div>
                                <div class="col-xs-3">
                                     
                                </div>
                                <div class="col-xs-3">
                                    Locality
                                </div>
                                <div class="col-xs-3">
                                    
                                </div>
                            </div>
                        </div>
                        <div class="row">
                            <div class="col-md-12 col-sm-12 col-xs-12 mB15 unitDetails">
                                <div class="col-xs-3">
                                    <a href="#" data-toggle="modal"   onclick="getPriceSheet('<?php echo $unitId?>',false,'Title','<?php echo $projectId?>','<?php echo GET_PAYMENT_PLAN_URL?>')">Price Sheet</a>
                                </div>
                                <div class="col-xs-3">
                                     
                                </div>
                                <div class="col-xs-3">
                                    <a href="#" data-toggle="modal"  onclick="getPaymentPlan('<?php echo $unitId?>',false,'Title','<?php echo $projectId?>','<?php echo GET_PAYMENT_PLAN_URL?>')">Payment Plan</a>
                                </div>
                                <div class="col-xs-3">
                                     
                                </div>
                            </div>
                        </div>
                        </div>
                       
                        <div class="col-md-12 col-sm-12 col-xs-12 text-center mT20 mB15">
                            <button onclick="goToNextStep('acc-3')" type="button" class="btn btnOrange">Next</button>
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  <div class="panel panel-default">
                    <div class="panel-heading" role="tab" id="headingFour">
                      <h4 class="panel-title">
                        <a id="acc-3" class="collapsed" role="button" data-toggle="collapse" data-parent="#accordion" href="#collapseFour" aria-expanded="false" aria-controls="collapseFour">
                          3. Payment
                        </a>
                      </h4>
                    </div>
                    <div id="collapseFour" class="panel-collapse collapse" role="tabpanel" aria-labelledby="headingFour">
                      <div class="panel-body">
                        <div class="col-md-12 col-sm-12 col-xs-12 text-center mT10 termsConditions">
                            <div>Complete your booking safely with us.</div>
                            <label>
                                <input type="checkbox"/>
                                I accept the <a href="#">Terms and Conditions</a>
                            </label>
                        </div>
                        <div class="col-md-12 col-sm-12 col-xs-12 text-center mT20 mB15">
                            <button onclick="validateForm();" type="button" class="btn btnOrange">Make payment</button>
                        </div>
                      </div>
                    </div>
                  </div>
                  </div>
                </div>
            </div>
        </div>
        </form>
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
             var redirectPropertyUrl ="http://unitselector-booking.local/public/booknow.php?timeout=true&unitId="+unitId;
        </script>
    </body>
</html>