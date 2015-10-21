<?php
require_once '../includes/include.php';
require_once '../application/controller/indexController.php'; 

$buyer_name = $_SESSION['buyer_name'];
$unitId = $_SESSION['unitId'];
$unitinfo =  json_decode(getUnitInfo($unitId),true); 
$unitData =$unitinfo['data'] ;
$booking_amount=getBookingAmount($unitId,"booking_amount"); 
$totalSaleValue=getBookingAmount($unitId,"sale_value");
$bookingId = $_SESSION['booking_id'];

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
    <div class="modal fade" id="myModalViewFullPaymentPlan" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">
            <div class="modal-dialog" style="width: 800px; margin-top:100px;">
                <div class="modal-content">
                    <div class="modal-body">
                    </div>
                </div>
            </div>
        </div>

        <div class="modal fade" id="myModalFullPriceSheet" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">
            <div class="modal-dialog" style="width: 800px; margin-top:100px;">
                <div class="modal-content">
                    <div class="modal-body">
                    </div>
                </div>
            </div>
        </div>
        <div class="container-fluid header mB25">
            <div class="container">
                <h3 class="text-center mT10 mB10">Apply for an Appartment</h3>
            </div>
        </div>
        <div class="container-fluid content">
            <div class="container">
                <h2 class="text-center mT10 text-uppercase mB20">Welcome <?php echo $buyer_name;?></h2>
                <span class="text-center col-md-12 col-sm-12 col-xs-12 mB20">Your property booked at Commonfloor</span>
                <div class="col-xs-12 successOuter">
                    <div class="row">
                        <div class="col-xs-4">
                            <span class="titles">Booking Id:</span> <?php echo $bookingId?>
                        </div>
                        <div class="col-xs-3">
                            <a href="#" data-toggle="modal" onclick="getPriceSheet('<?php echo $bookingId ?>',true,'Title','s6yjsx','<?php echo GET_PAYMENT_PLAN_URL?>')">Price Sheet</a>
                        </div>
                        <div class="col-xs-3">
                            <a href="#" data-toggle="modal" onclick="getPaymentPlan('<?php echo $bookingId ?>',true,'Title','s6yjsx','<?php echo GET_PAYMENT_PLAN_URL?>')">Payment Plan</a>
                        </div>
                        <div class="col-xs-2">
                            <span class="button booked">Booked</span>   
                        </div>
                    </div>
                    <div class="row mT25">
                        <div class="col-xs-12">
                            <span class="unitTitle orangeText text-capitalize"><?php echo $unitData['project_title']?> </span><span class="unitTitle titles">(<?php echo $unitData['unit']['name']?>)</span>
                        </div>
                    </div>
                    <div class="row">
                            <div class="col-md-12 col-sm-12 col-xs-12 mB5 unitDetails">
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
                            <div class="col-md-12 col-sm-12 col-xs-12 mB5 unitDetails">
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
                            <div class="col-md-12 col-sm-12 col-xs-12 mB5 unitDetails">
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
                        <div class="row mT20">
                            <div class="col-xs-9">
                                * Booking can be canclled within 7 days. Contact administrator for more details.  
                            </div>
                            <div class="col-xs-3">
                                <button class="button cancleBooking text-uppercase" onclick="refundAmount('<?php echo $unitId?>','<?php echo REFUND_URL;?>')">Cancle Booking</button>
                            </div>
                        </div>

                </div>
                
            </div>
        </div>
        
            
 <script src="js/jquery.min.js"></script>
    <script src="js/unit.js"></script>
 
    <!-- Include all compiled plugins (below), or include individual files as needed -->
    <script src="js/bootstrap.min.js"></script>
    <script src="js/jquery.panzoom.js"></script>       
    </body>
</html>