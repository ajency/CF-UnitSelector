<?php
require_once '../../includes/include.php';
require_once 'indexController.php'; 
require_once 'payu.php';

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
        updateUnitStatus($unitId ,$unit_status);
        $status = booking_history_status_booking_booked;   
        $old_status = booking_history_status_booking_progress;  
        $new_status = booking_history_status_booking_booked;   
        $comments = booking_history_comment_payment_success;  
        $mihpayid_Val = $_POST['mihpayid'];
        $_SESSION["mihpayid"]=$_POST['mihpayid'];
        $_SESSION["booking_id"]= $booking_id;
        $_SESSION["buyer_name"]=$_POST['udf3'];
        
        updatePaymentStructure($booking_id);
        saveBookingHistory($booking_id,$old_status, $new_status, $comments,$buyer_name);
        savePaymentHistory($booking_payment_id,$booking_id,$payment_status,$payment_history_is_active,$mihpayid_Val);
        updateBookingInfo($booking_id,$status); 
    }else{
        $payment_status = payment_status_unsuccessful;  
        $booking_payment_id = $_POST['udf2'];
        $booking_id = $_POST['udf1'];
        $mihpayid_Val = $_POST['mihpayid'];
        $unitId=$_POST['productinfo'];

        $old_status = booking_history_status_booking_progress;  
        $new_status = booking_history_status_booking_failure; 
        $comments = booking_history_comment_payment_failure;  
        $status = "delted";
        // $txt = "Due to some reason payment process has been cancelled to book your property at commonfloor.com";
        // $subject = 'Error while booking your property';
        // self::sendEmail($login_id,$name,$txt,$subject);
        updateBookingInfo($booking_id,$status); 
        $unit_status = availablity_available;
        updateUnitStatus($unitId ,$unit_status);
        saveBookingHistory($booking_id,$old_status, $new_status, $comments,$buyer_name);
        savePaymentHistory($booking_payment_id,$booking_id,$payment_status,$payment_history_is_active,$mihpayid_Val);
    }
    pay_page( array ('key' => $_SESSION["merchant_id"], 'txnid' => $booking_payment_id, 'amount' => $_POST['udf6'],
        'firstname' => $_POST['udf3'], 'email' => $_POST['udf4'], 'phone' => $_POST['udf5'],
        'productinfo' => $_POST['productinfo'], 'surl' => PAYMENT_SUCCESS, 'furl' => PAYMENT_FAILURE, 'udf1'=>$booking_id,'udf2'=>$booking_payment_id), 
        $_SESSION["salt"]);
        
}else{  
    if(isset($_POST['contact_email']) && isset($_POST['contact_name']) && isset($_POST['contact_mobile'])) {  
        
        $buyer_id = $_SESSION["buyer_id"];
        $unit_id = $_POST['unit_id'];
        $_SESSION["unitId"]=$unit_id;
        $email=$_POST['contact_email'];
        $buyer_name=$_POST['contact_name'];
        $phone=$_POST['contact_mobile'];

        $booking_id=$_POST['bookingId'];
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

        $booking_amount=getBookingAmount($unit_id,"booking_amount"); 
        $totalSaleValue=getBookingAmount($unit_id,"sale_value");

        $status =booking_history_status_booking_progress;  
        updateBookingInfo($booking_id,$status); 
        
        $old_status=$new_status;
        $new_status= booking_history_status_booking_progress; 
        $comments = booking_history_comment_payment_initialized;
        $mihpayid_Val = '';
        saveBuyerInfo($buyer_id,$buyer_name,$email,$phone);
        saveBookingHistory($booking_id,$old_status, $new_status, $comments, $buyer_name); 
        savePaymentHistory($booking_payment_id,$booking_id,$payment_status,$payment_history_is_active,$mihpayid_Val);

        $difference = time() - $_SESSION['startTime'];
        if($duration < $difference){
            $unit_status = availablity_available;
            unset($_SESSION);
            //$redirectionUrl = "/public/index.html";
            updateUnitStatus($unitId ,$unit_status);
            $txt = "Due to some reason payment process has been cancelled to book your property at commonfloor.com";
            $subject = 'Thanks for your interest in buying property';
            
            header('location:http://booking.cfunitselectortest.com/public/timeout.php');
            exit;
        }else{
            print_r(array ('key' => $_SESSION["merchant_id"], 'txnid' => $booking_payment_id, 'amount' => $booking_amount,
            'firstname' => $_POST['contact_name'], 'email' => $_POST['contact_email'], 'phone' => $_POST['contact_mobile'],
            'productinfo' => $unit_id, 'surl' => PAYMENT_SUCCESS, 'furl' => PAYMENT_FAILURE, 'udf1'=>$booking_id,'udf2'=>$booking_payment_id, 'udf3'=>$_POST['contact_name'], 'udf4'=>$_POST['contact_email'], 'udf5'=>$_POST['contact_mobile'],'udf6'=>$booking_amount)); exit;
            pay_page( array ('key' => $_SESSION["merchant_id"], 'txnid' => $booking_payment_id, 'amount' => $booking_amount,
            'firstname' => $_POST['contact_name'], 'email' => $_POST['contact_email'], 'phone' => $_POST['contact_mobile'],
            'productinfo' => $unit_id, 'surl' => PAYMENT_SUCCESS, 'furl' => PAYMENT_FAILURE, 'udf1'=>$booking_id,'udf2'=>$booking_payment_id, 'udf3'=>$_POST['contact_name'], 'udf4'=>$_POST['contact_email'], 'udf5'=>$_POST['contact_mobile'],'udf6'=>$booking_amount), 
            $_SESSION["salt"]);
        }

    }

}


  
?>
