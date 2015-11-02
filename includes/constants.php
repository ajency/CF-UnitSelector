<?php
//Database
/***LIVE**/
define('HOST','localhost');
define('DBUSER','root');
define('PASSWORD','Ajency#123');
define('DATABASE','booking_engine');

define('SITE_PATH','/var/www/booking.cfunitselectortest.com/');
define('SITE_URL','http://booking.cfunitselectortest.com/');
define('UNITSELECTOR_URL','http://production.cfunitselectortest.com/');
define('BOOKINGCRM_URL','http://bookingcrm.cfunitselectortest.com/');

define('payuUrl','https://test.payu.in/merchant/postservice.php?form=2'); 
//define('unitSelectorAuthKey','117ce294ece0684f69ad92ae450ba370b1259f69'); 
define('unitSelectorAuthKey','4c94a5d1170249b18ce6b4b5ed522fa6fff91dbf'); 
define('bookingCrmAuthKey','43e-22a3c758e02ebdf0472b'); 
define('USER','19');

/***LOCAL**/
// define('HOST','localhost');
// define('DBUSER','root');
// define('PASSWORD','');
// define('DATABASE','booking_engine');

// define('SITE_PATH','D:/myprojects/unit-selector-booking/');
// define('SITE_URL','http://unitselector-booking.local/');
// define('UNITSELECTOR_URL','http://commonfloor.local/');
// define('BOOKINGCRM_URL','http://127.0.0.1:8000/');


// define('payuUrl','https://test.payu.in/merchant/postservice.php?form=2'); 
// define('unitSelectorAuthKey','957ef76ea1f19aef1af0d341ae18e565f874a4c6'); 
// define('bookingCrmAuthKey','43e-22a3c758e02ebdf0472b'); 
// define('USER','19');

//MAIL CONFIG
define('MAIL_HOST','smtp.sendgrid.net');
define('MAIL_USER','shradha');
define('MAIL_PASS','ajency#123');

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
define("payment_in_progress","payment_in_progress");
define("booking_history_status_refund_inititated","Refund Initiated");
define("booking_history_status_refund_completed","Refunded");
define("booking_history_comment_refund_completed","Refund back to customer in 7 days");
define("payment_history_inactive","0");
define("booking_history_status_refund_Error","Error while refund process");
define("booking_history_comment_refund_not_completed","Refund is not proccessed due to Payu Error");
 
 
 
define('GET_PAYMENT_PLAN_URL', SITE_URL.'application/controller/getPaymentPlan.php');
define('REFUND_URL', SITE_URL.'application/controller/refundAmount.php');
define('getBookedPriceSheet',BOOKINGCRM_URL.'booked_unit_price_sheet/'); 
define('getPriceSheet',BOOKINGCRM_URL.'unit_price_sheet/'); 

define('getpaymentPlan',BOOKINGCRM_URL.'unit_payment_plan/'); 
define('getBookedpaymentPlan',BOOKINGCRM_URL.'booked_unit_payment_plan/'); 
define('BookPriceStructure',BOOKINGCRM_URL.'book_payment_structure/');
define('getBookingAmt',BOOKINGCRM_URL.'get_booking_amount/');
define('getTotalSaleValue',BOOKINGCRM_URL.'get_total_sale_value/');

define('unitSummary',UNITSELECTOR_URL.'api/v2/unit/');
define('getUnitStatus',UNITSELECTOR_URL.'api/v2/get-unit-status?unit_id=');
define('updateUnitStatus',UNITSELECTOR_URL.'api/v2/unit/');
 


define('PAYMENT_SUCCESS', SITE_URL.'public/payment-success.php');
define('PAYMENT_FAILURE', SITE_URL.'public/payment-failure.php');

 
?>