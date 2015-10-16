<?php
//Database
define('HOST','localhost');
define('DBUSER','root');
define('PASSWORD','Ajency#123');
define('DATABSE','booking_engine');


//constant Variable
define('EXPIREDURATION','15');

define("booking_history_status_booking_start","----");
define('booking_history_status_booking_initialized',"initialized");
define("booking_history_comment_buyer_option","Buyer choose to buy"); 
define("payment_status_successful","captured"); 
define("availablity_sold","sold"); 
define("booking_history_status_booking_booked","Booked");
define("booking_history_status_booking_progress","Booking in Progress");
define("booking_history_comment_payment_success","Payment Success");
define("payment_status_unsuccessful","unsuccessful");
define("booking_history_status_booking_failure","Booking Failure");
define("booking_history_comment_payment_failure","Payment Failure");
define("booking_history_comment_payment_initialized","Payment Initialized");
define("payment_history_active","1");
define("availablity_available","available");
define("booking_history_status_refund_inititated","Refund Initiated");
define("booking_history_status_refund_completed","Refunded");
define("booking_history_comment_refund_completed","Refund back to customer in 7 days");
define("payment_history_inactive","0");
define("booking_history_status_refund_Error","Error while refund process");
define("booking_history_comment_refund_not_completed","Refund is not proccessed due to Payu Error");
 
 
 
define('GET_PAYMENT_PLAN_URL', 'http://unitselector-booking.local/application/controller/getPaymentPlan.php');
define('REFUND_URL', 'http://unitselector-booking.local/application/controller/refundAmount.php');
define('getBookedPriceSheet','http://127.0.0.1:8000/booked_unit_price_sheet/'); 
define('getPriceSheet','http://127.0.0.1:8000/unit_price_sheet/'); 

define('getpaymentPlan','http://127.0.0.1:8000/unit_payment_plan/'); 
define('getBookedpaymentPlan','http://127.0.0.1:8000/booked_unit_payment_plan/'); 
define('BookPriceStructure','http://127.0.0.1:8000/book_payment_structure/');
define('getBookingAmt','http://127.0.0.1:8000/get_booking_amount/');
define('getTotalSaleValue','http://127.0.0.1:8000/get_total_sale_value/');

define('unitSummary','http://commonfloor.local/api/v2/unit/');
define('getUnitStatus','http://commonfloor.local/api/v2/get-unit-status?unit_id=');
define('updateUnitStatus','http://commonfloor.local/api/v2/unit/');
 
define('payuUrl','https://test.payu.in/merchant/postservice.php?form=2'); 
define('unitSelectorAuthKey','957ef76ea1f19aef1af0d341ae18e565f874a4c6'); 
define('bookingCrmAuthKey','43e-22a3c758e02ebdf0472b'); 
define('USER','19');

define('PAYMENT_SUCCESS','http://unitselector-booking.local/public/payment-success.php');
define('PAYMENT_FAILURE','http://unitselector-booking.local/public/payment-failure.php');

 
?>