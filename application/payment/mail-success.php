<?php
    session_start();
    require_once '../controller/indexController.php'; 
?>
<!DOCTYPE html>
<html>
    <head>
        <!--
           $$$$     
        $$    $$$   
        $$     $$$    
        $$        $$$$$$$$$$$$$$$$$$$$$$$$$$  
        $$     $$$                 $$   $$
        $$    $$$                  $$   $$
           $$$$                    $$   $$

        If you see this then You are awesome!!!
        -->
        <meta charset="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1" />
        <meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
        <title>Booked Property</title>
           <script src="https://ajax.googleapis.com/ajax/libs/jquery/2.1.3/jquery.min.js"></script>
        <script src="../../public/js/unit.js"></script>
        <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.5/css/bootstrap.min.css">

<!-- Optional theme -->
<link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.5/css/bootstrap-theme.min.css">

<!-- Latest compiled and minified JavaScript -->
<script src="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.5/js/bootstrap.min.js"></script>
        <link rel="stylesheet" href="../public/css/listing-management.css" />
        <style type="text/css">

            #bouncy{
                
                overflow-y:hidden; 
            }

            #bouncy ul{
                list-style: none !important;

            }

            .booking_wrapper_ul li{
                height: auto;
                overflow: hidden;
                margin-bottom:10px;
                border:1px solid #cdcdcd;
                
            }
            
            .booking_table tr td, .booking_table tr th{
                text-align: center;
            }

            .booking_table tr th{
                font-weight: bold;
                padding-bottom:0px !important;
            }
            .booking_table tr td{
                padding-top: 0px !important;
            }  

            .step-2 #panel-locality{
                height: auto !important;
            }

            .booking_table{
                /*width:54%;*/
                margin-bottom: 0px !important;
            }
            .table2{
                width: 65%;
            }
            
            
            .imagesCol .img-container{
                height:auto;
            }

            .Completed,.Booked,.Completed:hover,.Booked:hover {
                background-color:green;
                color:white;
            }

            .Refund {
                background-color:#999;
                color:white;
            }
            .Cancelled {
                background-color:#A00;
                color:white;
            }
            .Refund:hover,.Cancelled:hover{
                color:white; 
            }

            @media (max-width: 600px) {

                .booking_wrapper_ul li{
                    height: auto;
                    overflow: hidden;
                }

                .booking_wrapper_ul li .booking_table tr td:first-child{
                    width:250px;
                }

                .booking_table, .table2{
                    width:100%;
                }    
            }
            button.close{
                color: black !important;
            }
        </style>
    </head>
    <body id="propertyBooking" style = "background-color: #ffffff;">
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
        <div class="errorPopupContainerBG"></div>
        <div class="errorPopupContainer" style="height:170px;">
            <div class="errorPopupContent"></div>
            <div class="popupClickBtn" style="left:290px">Ok</div>
            <div class="popupClickBtn" style="left:100px">Cancel</div>
        </div>

        <div class="form-heading" id ="locality_head" data-head="locality_head" data-body="toggle_locality" data-next="toggle_upload"> 
            
            <h3>Your property booked at Commonfloor</h3>
            
        </div>
        <div class="step-2"> 
          
          <!--************************ HTML STart ************************-->
            <input type="hidden" id="hidden_id" value=""/>
            <div class="panel panel-info locality_panel" id="toggle_locality">
                <div id="panel-locality">
                    <div class="col-md-12">
                        <ul class="booking_wrapper_ul">
                            
                            <li id="" class="">
                                     <div class="row bookingrow">   
                                        <div class="col-md-4 imagesCol">
                                            <div class="big-img img-container modal-gallery-src" data-cf-mig-type="project" data-cf-mig-isheader="false" data-cf-pid="<?php echo $obj->cf_project_id;?>" data-number="0" >
                                                
                                            </div>
                                        </div> 
                                        <div class="col-md-8" style="padding-top:10px;position:relative">

                                            <div style="top: 5px;position:absolute;">
                                                <span style="font-weight: bold;">Booking Id: </span><span id="booking_id"></span>
                                            <?php echo $_SESSION['booking_id']?>
                                                <button style="background-color:#3487A7;width:100px;height:30px;" onclick="getPriceSheet('<?php echo $_SESSION['booking_id']?>',true,'Title','s6yjsx','<?php echo $_SESSION['urlredirect']?>')">Price Sheet</button>
                                                <button style="background-color:#3487A7;width:100px;height:30px;" onclick="getPaymentPlan('<?php echo $_SESSION['booking_id']?>',true,'Title','s6yjsx','<?php echo $_SESSION['urlredirect']?>')">Payment Sheet</button>
                                                </span>

                                            </div>
                                           
                                            <div style="margin-top:24px">
                                                <a class="addCft prjct-snpt-title booking_Label" data-cftcat="project snippet" data-cftact="click" data-cftlabl="title clicked" data-cftev="click" target="_blank" title="Property Listing Details"></a>
                                                <p class="unit_name"></p>
                                            </div>
                                            <span id="list" class="btn status_class">
                                            </span>

                                           <div class="" style="padding-left:0px">
                                                <table class="table booking_table">
                                                    <tr> 
                                                        <th class=""></th>
                                                        <th class=""></th>
                                                        <th class=""> Sq Ft</th>
                                                        <th class="icon-rupee-icn"></th>
                                                    </tr>
                                                    <tr>
                                                        <td class="contentType">BHK Type</td>
                                                        <td class="contentType">Property Type</td>
                                                        <td class="contentType">Area</td>
                                                        <td class="contentType">Price per SQFT</td>
                                                    </tr>
                                                    <tr>
                                                        
                                                        <th class="">Floor
                                                        </th>
                                                        <th class=""></th>
                                                        <th class="icon-rupee-icn"></th>
                                                        <th class="icon-rupee-icn"></th>
                                                    </tr>
                                                    <tr>
                                                        <td class="contentType">Floor Number</td>
                                                        <td class="contentType">Tower Name</td>
                                                        <td class="contentType">Total Price</td>
                                                        <td class="contentType">Booking Amount</td>
                                                    </tr>
                                                    <tr>
                                                        <th class=""></th>
                                                        <th class=""></th>
                                                        <th class=""></th>
                                                        <th class=""></th>
                                                    </tr>
                                                    <tr>
                                                        <td class="contentType">Builder</td>
                                                        <td class="contentType"></td>
                                                        <td class="contentType">Locality</td>
                                                        <td class="contentType"></td>
                                                    </tr>
                                                   
                                                 </table>
                                            </div>

                                            <div class="col-md-9" style="">
                                                <p class="requiredText padLeft">
                                                <span class="mandatory">* </span>
                                                <small>Booking can be cancelled within days.Contact administrator for more details.</small>
                                                </p>
                                            </div>
                                      
                                                
                                                <div class="col-md-3" style="padding-right:4px;float:right;padding-left:0px;">
                                                    <button class="btn btn-primary btn-md contact_btn pull-right" style="font-weight: bolder;" onclick="refundAmount('<?php echo $_SESSION['unit_id']?>','<?php echo $_SESSION['refundUrl']?>')">Cancel Booking</button>
                                                </div>                                           
                                        
                                        </div> 
                                    </div>
                                    </li>
                  
              
                
                        </ul>    
                    </div>
                </div>
          <!--  ************************** HTML End  ************************   --> 
          
            </div>
        </div>

    </body>
</html>