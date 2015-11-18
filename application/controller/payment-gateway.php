<?php
require_once '../../includes/include.php';
require 'class.phpmailer.php';
require_once 'indexController.php'; 
require_once 'payu.php';
require_once '../../tcpdf/tcpdf.php';

if ( count( $_POST ) && isset( $_POST['mihpayid'] ) && ! empty( $_POST['mihpayid'] ) ) {
    $buyer_name=$_POST['udf3'];
    $unitId=$_POST['productinfo'];
    if($_POST['status']=="success"){
       
      // $txt = "Please login to check your booked property at commonfloor.com";
      // $subject = 'Thanks for booking your property';
      // self::sendEmail($login_id,$name,$txt,$subject);

        $payment_status = payment_status_successful;
        $booking_payment_id = $_POST['udf2'];
        $booking_id = $_POST['udf1'];

        $unit_status=availablity_sold;
        updateUnitStatus($unitId ,$unit_status,$booking_id);
        $status = booking_history_status_booking_booked;   
        $old_status = booking_history_status_booking_progress;  
        $new_status = booking_history_status_booking_booked;   
        $comments = booking_history_comment_payment_success;  
        $mihpayid_Val = $_POST['mihpayid'];
        $_SESSION["mihpayid"]=$_POST['mihpayid'];
        $_SESSION["booking_id"]= $booking_id;
        $_SESSION["buyer_name"]=$_POST['udf3'];
        $_SESSION["buyer_email"]=$_POST['udf4'];
        $_SESSION["buyer_phone"]=$_POST['udf5'];
        
        $payment_history_is_active=payment_history_active;
        updatePaymentStructure($booking_id);
        saveBookingHistory($booking_id,$old_status, $new_status, $comments,$buyer_name);
        savePaymentHistory($booking_payment_id,$booking_id,$payment_status,$payment_history_is_active,$mihpayid_Val);
        updateBookingInfo($booking_id,$status); 

        //$txt = "Unit successfully boooked.";
        $subject = 'Congratulations on booking your property';
      // self::sendEmail($login_id,$name,$txt,$subject);

        sendMail($_POST['udf4'],$_POST['udf3'],$subject,$booking_id,'success');
    }else{
        $payment_status = payment_status_unsuccessful;  
        $booking_payment_id = $_POST['udf2'];
        $booking_id = $_POST['udf1'];
        $mihpayid_Val = $_POST['mihpayid'];
        $unitId=$_POST['productinfo'];

        $buyer_name=$_POST['udf3'];
        $buyer_email=$_POST['udf4'];
        $buyer_phone=$_POST['udf5'];

        $_SESSION["mihpayid"]=$_POST['mihpayid'];
        $_SESSION["booking_id"]= $booking_id;
        $_SESSION["buyer_name"]=$_POST['udf3'];
        $_SESSION["buyer_email"]=$_POST['udf4'];
        $_SESSION["buyer_phone"]=$_POST['udf5'];

        $old_status = booking_history_status_booking_progress;  
        $new_status = booking_history_status_booking_failure; 
        $comments = booking_history_comment_payment_failure;  
        $payment_history_is_active=payment_history_active;
        $status = "delted";

        updateBookingInfo($booking_id,$status); 
        $unit_status = availablity_available;
        updateUnitStatus($unitId ,$unit_status ,$booking_id);
        saveBookingHistory($booking_id,$old_status, $new_status, $comments,$buyer_name);
        savePaymentHistory($booking_payment_id,$booking_id,$payment_status,$payment_history_is_active,$mihpayid_Val);
        
        // $txt = "Due to some reason payment process has been cancelled to book your property at commonfloor.com";
         $subject = 'Error while booking your property';
        // self::sendEmail($login_id,$name,$txt,$subject);
        sendMail($buyer_email,$buyer_name,$subject,$booking_id,'failure');
      

    }
    pay_page( array ('key' => $_SESSION["merchant_id"], 'txnid' => $booking_payment_id, 'amount' => $_POST['udf6'],
        'firstname' => $_POST['udf3'], 'email' => $_POST['udf4'], 'phone' => $_POST['udf5'],
        'productinfo' => $_POST['productinfo'], 'surl' => PAYMENT_SUCCESS, 'furl' => PAYMENT_FAILURE, 'udf1'=>$booking_id,'udf2'=>$booking_payment_id), 
        $_SESSION["salt"]);
        
}else{  
    if(isset($_POST['contact_email']) && isset($_POST['contact_first_name']) && isset($_POST['contact_mobile'])) {  
        
        $unit_id = $_POST['unit_id'];
        $booking_id=$_POST['bookingId'];
        $startTime = $_POST['startTime'];
        $unitData = json_decode(getUnitInfo($unit_id),true);
        $unitBookingId = $unitData['data']['unit']['booking_id'];
 
         //verify booking id with booking id stored in units tables
        if($booking_id!=$unitBookingId) 
        {
           header('location:'.SITE_URL.'public/timeout.php');
           exit; 
        }

        $buyer_id = uniqid();
        $_SESSION["buyer_id"] = $buyer_id;
        
        
        $_SESSION["unitId"]=$unit_id;

        //BUYER INFO
        $buyer_name= $_POST['contact_first_name'].' '.$_POST['contact_last_name'];
        $email=$_POST['contact_email'];
        $phone=$_POST['contact_mobile'];
        $pancard=$_POST['contact_pancard'];
        $city=$_POST['contact_city'];
        $address=$_POST['contact_address'];
        $zipcode=$_POST['contact_zipcode'];
        $buyer_type=$_POST['buyer_type'];
        $state=$_POST['contact_state'];
        $country=$_POST['contact_country'];

        $buyerData['NAME'] = $buyer_name;
        $buyerData['EMAIL'] = $email;
        $buyerData['PHONE'] = $phone;
        $buyerData['PANCARD'] = $pancard;
        $buyerData['CITY'] = $city;
        $buyerData['ADDRESS'] = $address;
        $buyerData['ZIPCODE'] = $zipcode;
        $buyerData['BUYER_TYPE'] = $buyer_type;
        $buyerData['STATE'] = $state;
        $buyerData['COUNTRY'] = $country;

        $billingData =[];
        // //BILLING INFO
        // $billingData['billing_name']= $_POST['billing_first_name'].' '.$_POST['billing_last_name'];
        // $billingData['billing_email'] =$_POST['billing_email'];
        // $billingData['billing_mobile'] =$_POST['billing_mobile'];
        // $billingData['billing_pancard'] =$_POST['billing_pancard'];
        // $billingData['billing_city'] =$_POST['billing_city'];
        // $billingData['billing_address'] =$_POST['billing_address'];
        // $billingData['billing_zipcode'] =$_POST['billing_zipcode'];
        // $billingData['billing_buyer_type'] =$_POST['billing_buyer_type'];
        // $billingData['billing_state'] =$_POST['billing_state'];
        // $billingData['billing_country'] =$_POST['billing_country'];


        
        $_SESSION["merchant_id"] = $_POST['merchant_id'];
        $_SESSION["salt"] =$_POST['salt'];
        
        $duration= EXPIREDURATION *60;
        $booking_payment_id=uniqid();
        
 

        
        $_SESSION['booking_payment_id']=$booking_payment_id;

        $old_status=booking_history_status_booking_start;
        $new_status= booking_history_status_booking_initialized;
        $comments = booking_history_comment_buyer_option; 
        $booking_history_comment= booking_history_comment_payment_initialized; 
        $payment_status= booking_history_status_booking_initialized;
        $payment_history_is_active=payment_history_active;
        $payment_plan_id="";
        $price_sheet_id="";

        $booking_amount=getBookingAmount($unit_id,"booking_amount",'0'); 
        //$totalSaleValue=getBookingAmount($unit_id,"sale_value",fasle);

        $status =booking_history_status_booking_progress;  
        updateBookingInfo($booking_id,$status); 
        
        $old_status=$new_status;
        $new_status= booking_history_status_booking_progress; 
        $comments = booking_history_comment_payment_initialized;
        $mihpayid_Val = '';
        saveBuyerInfo($buyer_id,$buyerData ,$billingData);
        updateBuyerToBooking($buyer_id,$booking_id);
        saveBookingHistory($booking_id,$old_status, $new_status, $comments, $buyer_name); 
        savePaymentHistory($booking_payment_id,$booking_id,$payment_status,$payment_history_is_active,$mihpayid_Val);

        $difference = time() - $startTime;

        if($duration < $difference){ //echo $duration .' < '. $difference; exit;
            $unit_status = availablity_available;
            unset($_SESSION);
            //$redirectionUrl = "/public/index.html";
            updateUnitStatus($unit_id ,$unit_status,$booking_id);
            $txt = "Due to some reason payment process has been cancelled to book your property at commonfloor.com";
            $subject = 'Thanks for your interest in buying property';
            
            header('location:'.SITE_URL.'public/timeout.php');
            exit;
        }else{
            
            updateUnitStatus($unit_id ,payment_in_progress ,$booking_id);
            pay_page( array ('key' => $_SESSION["merchant_id"], 'txnid' => $booking_payment_id, 'amount' => $booking_amount,
            'firstname' => $buyer_name, 'email' => $email, 'phone' => $phone,
            'productinfo' => $unit_id, 'surl' => PAYMENT_SUCCESS, 'furl' => PAYMENT_FAILURE, 'udf1'=>$booking_id,'udf2'=>$booking_payment_id, 'udf3'=>$buyer_name, 'udf4'=>$email, 'udf5'=>$phone,'udf6'=>$booking_amount), 
            $_SESSION["salt"]);
        }

    }

}


  
?>
