<?php
require_once '../includes/include.php';
require_once '../application/controller/indexController.php'; 

$buyer_name = $_SESSION['buyer_name'];
$buyer_email = $_SESSION['buyer_email'];
$buyer_phone = $_SESSION['buyer_phone'];
$unitId = $_SESSION['unitId'];
$unitinfo =  json_decode(getUnitInfo($unitId),true); 
$unitData =$unitinfo['data'] ;
 
$bookingId = $_SESSION['booking_id'];
 
session_start();
unset($_SESSION);
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
                
                <div class="successOuter">
                    <div class="successContent col-xs-12 sessionExpireContent transactionFailed text-center">
                        <i class="fa fa-5x fa-exclamation-circle col-xs-12"></i>
                      <h3 class="text-center text-uppercase"> Sorry! Transaction failed  </h3>
                      <div class="col-xs-12">We regret to inform you that your payment for <b class="orangeText"><?php echo $unitData['unit']['name']?></b>  with Booking ID as <b><?php echo $bookingId;?></b> at <?php echo $unitData['project_title']?> for Project  is unsuccessful. Sorry for the inconvenience. The Unit booking could not proceed and you can still book the unit  by visiting at <a href="www.commonfloor.com">www.commonfloor.com</a>.
                      </div>

                      <a href="unit.php"><button class="btn btn-sm btn-default btn-primary">Try again</button></a>
                      <a href="http://www.commonfloor.com/"> <button class="btn btn-sm btn-default btn-primary">Back to home</button></a>
                    </div>
                  
                </div>
                <div class="bookingFooter sessionExpireFooter">
                  Call <?php echo $unitData['builder_phone']?>        
                    <div class="privacyOuter"><a href="https://www.commonfloor.com/">Commonfloor</a> | <a href="#">FAQ</a> | <a href="https://play.google.com/store/apps/details?id=com.commonfloor&hl=en">Mobile Apps © commnfloor inc. </a>| <a href="https://www.commonfloor.com/privacy-policy">Privacy Policy</a></div>
                </div>
                 
            </div>
        </div>                         
           

        <script src="../cf-mobile/js/jquery.min.js"></script>
    <!-- Include all compiled plugins (below), or include individual files as needed -->
    <script src="../cf-mobile/js/bootstrap.min.js"></script>
    <script src="../cf-mobile/js/jquery.panzoom.js"></script>       
    </body>
</html>