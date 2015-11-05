<?php
require_once '../includes/include.php';
require_once '../application/controller/indexController.php'; 

$buyer_name = $_SESSION['buyer_name'];
$buyer_email = $_SESSION['buyer_email'];
$buyer_phone = $_SESSION['buyer_phone'];
$unitId = $_SESSION['unitId'];
$unitinfo =  json_decode(getUnitInfo($unitId),true); 
$unitData =$unitinfo['data'] ;
$booking_amount=getBookingAmount($unitId,"booking_amount"); 
$totalSaleValue=getBookingAmount($unitId,"sale_value");
$bookingId = $_SESSION['booking_id'];
//unset($_SESSION);
?>
<!doctype html>
<html>
    <head>
    <meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
      <meta name='viewport' content='width=device-width, initial-scale=1.0, maximum-scale=1.0'/>
    <!-- The above 3 meta tags *must* come first in the head; any other head content must come *after* these tags -->
    <title>CF-MOBILE</title>

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
                <div class="col-xs-12 closeIcon"><i class="">X</i>
                <h3 class="text-center text-uppercase">Your Booking has been cancelled</h3>
                </div>
                <div class="successOuter">
                    <div class="successContent col-xs-12 cancelBooking">
                         <div class="col-md-12 col-sm-12 col-xs-12 reviewDetails">                          
                            <div class="col-xs-12">  
                                <div class="row">    
                                <div class="row">  
                                <div class="col-md-8 col-xs-12">
                                    <div class="col-xs-12">
                                        <div class="row">
                                            <span class="text-uppercase bookApmt">Booking ID : </span>
                                            <span class="flatNo"><?php echo $bookingId?></span>
                                        </div>
                                    </div>
                                    <h5 class="text-uppercase"><?php echo $unitData['project_title']?> <span class="unitName orangeText">( <?php echo $unitData['unit']['name']?> )</span></h5>
                                </div>
                              
                                <div class="col-md-4 col-xs-12 bookedUser">
                                    <div class="col-xs-12">             
                                      <span class="title">Name&nbsp; &nbsp; :</span>
                                        <span class="detail"><?php echo $buyer_name;?></span>
                                    </div>
                                    <div class="col-xs-12">             
                                      <span class="title">Email &nbsp; &nbsp; :</span>
                                      <span class="detail"><?php echo $buyer_email;?></span>
                                    </div>
                                    <div class="col-xs-12">             
                                      <span class="title">mobile &nbsp;  :</span>
                                      <span class="detail"><?php echo $buyer_phone;?></span>
                                    </div>
                                </div>                                  
                            
                                </div>
                                </div>
                            </div>
                       
                            <div class="col-md-12 col-sm-12 col-xs-12 detailsOuter">
                                <div class="col-md-2 col-xs-12">
                                    <div class="col-xs-12 unitDetails"> <?php echo $unitData['unit']['unit_type']?></div>
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
                                     <div class="col-xs-12 unitDetails"><i class="fa fa-inr"></i> <?php echo $unitData['unit']['per_sq_ft_price']?></div>
                                     <div class="col-xs-12 titleDetails">Price per SQFT.</div>                                   
                                </div>
                                <?php 
                                if(!empty($unitData['building']))
                                {
                                ?>
                                <div class="col-md-2 col-xs-12">
                                    <div class="col-xs-12 unitDetails"> <?php echo ordinalSuffix($unitData['unit']['floor_number'])?> Floor</div>
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
                                     <div class="col-xs-12 unitDetails builderName" data-toggle="tooltip" data-placement="top" title="" data-original-title="Tooltip on top"><?php echo $unitData['builder_name']?></div>
                                     <div class="col-xs-12 titleDetails">Builder</div>                                   
                                </div>
                                <div class="col-md-2 col-xs-12">
                                    <div class="col-xs-12 unitDetails"><?php echo $unitData['area_name']?></div>
                                    <div class="col-xs-12 titleDetails">Locality</div>
                                </div>
                            </div>                                            

                           <div class="col-xs-12 cancelBookingOuter">
                                <div class="row">
                                    <div class="col-md-8 col-sm-8 col-xs-12 note">
                                        Note : The Refund can be made by cheque or NEFT.
                                    </div>      
                                    <div class="col-md-4 col-sm-4 col-xs-12 text-right">    
                                        <a href="http://www.commonfloor.com/"><button class="btn btn-sm btn-primary btn-default text-uppeercase">Back</button></a>
                                    </div>                                                      
                                </div>
                            </div>
                    </div>

                    <!-- <div class="bottomSection hidden-xs">
                        <div class="col-xs-6">
                            <span class="icon">

                            </span>
                            <span class="rightContent">
                                <h5 class="text-uppercase">Flexible payments</h5>
                                <p>PayUbiz allows you to make easy payment through various payment methods/modes.</p>
                            </span>
                        </div>
                        <div class="col-xs-6">
                            <span class="icon">

                            </span>
                            <span class="rightContent">
                                <h5 class="text-uppercase">Need some help?</h5>
                                <p>For any queries <i class="fa fa-envelope-o"></i>  <a href="mailto:contactus@commonfloor.com">contactus@commonfloor.com</a>/ <a href="mailto:support@commonfloor.com">support@commonfloor.com</a> or feel free to <i class="fa fa-phone"></i>  our helpline number 1800 180 180 180 ON All 7 days of week from 7AM TO 11PM.</p>
                            </span>
                        </div>
                    </div> -->
                    
                </div>
                <div class="bottomSection">
                        <div class="col-xs-12">                         
                            <span class="rightContent">                                                         
                                <p class="text-capitalize">
                                    <span class="supportNoText"><i class="fa fa-phone"></i> Support : 1800 180 180 180 </span>
                                    <span class="safePaymentText"><i class="fa fa-lock"></i> Safe & secure payment</span>
                                </p>
                            </span>
                        </div>
                        
                    </div>
                <div class="bookingFooter">
                    Call 1800 180 180 180
                     <div class="privacyOuter"><a href="https://www.commonfloor.com/">Commonfloor</a> | <a href="#">FAQ</a> | <a href="https://play.google.com/store/apps/details?id=com.commonfloor&hl=en">Mobile Apps © commnfloor inc. </a>| <a href="https://www.commonfloor.com/privacy-policy">Privacy Policy</a></div>
                </div>
            </div>
        </div>
        
         

         <script src="js/jquery.min.js"></script>
    <!-- Include all compiled plugins (below), or include individual files as needed -->
    <script src="js/bootstrap.min.js"></script>
 
 <script type="text/javascript">
        //$('.collapse').collapse()
        $( document ).ready(function() {                          
                $(function () {
                  $('[data-toggle="tooltip"]').tooltip()
                })        
            });
            
        </script>

    </body>                

</html>