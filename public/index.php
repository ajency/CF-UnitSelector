<?php 
    session_start();
    require_once '../application/controller/indexController.php'; 
    $unit_id = $_GET['unit_id'];
    $_SESSION['unit_id']= $unit_id;
    $_SESSION['project_id']="s6yjsx";
    $_SESSION['booking_id']=uniqid();
    $counter = counterValue();
?>
<!DOCTYPE html>
<!-- saved from url=(0046)https://www.commonfloor.com/list-your-property -->
<html class="gr__commonfloor_com">
    <head>
        <link type="text/css" rel="stylesheet" href="./css/bootstrap.min.css">
        <link type="text/css" rel="stylesheet" href="./css/listing-management.css">
        <script src="https://ajax.googleapis.com/ajax/libs/jquery/2.1.3/jquery.min.js"></script>
        <script src="js/unit.js"></script>
        <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.5/css/bootstrap.min.css">

<!-- Optional theme -->
<link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.5/css/bootstrap-theme.min.css">

<!-- Latest compiled and minified JavaScript -->
<script src="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.5/js/bootstrap.min.js"></script>
        <script>
             jQuery(function($){
                var expireDuration = <?php echo $counter?>;
                display = $('#timeCounter');
                startTimer(expireDuration, display);

             });
             var redirectPropertyUrl ="https://www.google.co.in";
        </script>
        
    </head>

    <body class="listing-page platform-undefined browser-Chrome">
        <style type="text/css">
            .liveInTourInfoPopupContainer {
            background-color: #fff;
            bottom: 0;
            display: none;
            height: 480px;
            left: 0;
            margin: auto;
            padding: 15px;
            position: fixed;
            right: 0;
            top: 0;
            width: 682px;
            z-index: 9999;
            width: 500px;
            }
        </style>
        <div id="basic-info" class="container-fluid">
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
            <div class="panel panel-default panel-body">
                <form method="post" action="/application/controller/payment-gateway.php" id="listingMainForm">

                    <ul id="whole-form" class="list-group">
                        <li class="list-group-item" id="basicInfo_li">
                            <div class="form-heading" id="basicInfoHead">   
                                <div class="badge-wrpr badge">
                                    <span> 1 </span>
                                </div>
                                <h3>Basic Information</h3>   
                            </div>
                            <div class="step-1">
                                <div class="panel panel-info" id="basicInfobody" style="display: block;">
                                    <div class="panel-body">
                                        <div class="basic-info-wrapper" id="contactDiv" style="display: block;">
                                            <div class="col-md-12 col-sm-12 clearfix">
                                                <h2 class="">
                                                    <span></span>
                                                </h2>
                                            </div>
                                            <div class="form-inline">
                                                <div class="form-group">
                                                    <div class="col-md-6 col-sm-6" id="contactNameDiv">
                                                        <div class="placeholder-selected">Name</div>
                                                        <input type="text" class="form-control error-msg" id="name" name="contact_name" placeholder="Name" value="Ramit Garg" maxlength="100">
                                                    </div>
                                                    <div class="col-md-6 col-sm-6" id="contactEmailDiv">
                                                        <div class="placeholder-selected">E-mail</div>
                                                        <input type="text" class="form-control" id="email" name="contact_email" placeholder="Email" value="ramit_shine@yahoo.co.in">
                                                    </div>
                                                </div>
                                            </div>
                                            <div class="form-inline">
                                                <div class="">

                                                    <div class="col-md-6 col-sm-6" id="contactMobileDiv">
                                                        <input type="text" class="form-control" id="mobile" name="contact_mobile" placeholder="Mobile Number" value="9900071634" maxlength="10">
                                                    </div>
                                                </div>
                                            </div>


                                        </div>
                                    </div>
                                </div>
                            </div>
                        </li>
                    </ul>
                    <div>
                        <div>Current Session will restart in <span id="timeCounter"><?php echo $_SESSION['duration'];echo ":00";?></span> minutes!</div>
                    </div>
                    <button style="background-color:#3487A7;width:100px;height:50px;right: 50px;position: absolute;top: 50%">Submit</button>
                </form>
                <button style="background-color:#3487A7;width:100px;height:30px;" onclick="getPriceSheet('<?php echo $_SESSION['unit_id']?>',false,'Title','<?php echo $_SESSION['project_id']?>','<?php echo $_SESSION['urlredirect']?>')">Price Sheet</button>
                <button style="background-color:#3487A7;width:100px;height:30px;" onclick="getPaymentPlan('<?php echo $_SESSION['unit_id']?>',false,'Title','<?php echo $_SESSION['project_id']?>','<?php echo $_SESSION['urlredirect']?>')">Payment Sheet</button>
            </div>
        </div>
    </body>
</html>
