<?php
require_once '../../includes/include.php';


    $c = curl_init();  
    $authKey=bookingCrmAuthKey;
    $isBooked = false;
    $isBookedString = $_POST['is_booked']; 
    if($isBookedString=="true"){
        $isBooked = true;
    }
    if($_POST['planType']=="price"){
        if($isBooked==true){
            $wsUrl=getBookedPriceSheet;
        }else{
            $wsUrl=getPriceSheet;
        } 
    }else{
        if($isBooked==true){
            $wsUrl=getBookedpaymentPlan;
        }else{
            $wsUrl=getpaymentPlan;
        }
    }

    if($isBooked==true){
        $params['booking_id']=$_POST['booking_id']; 
    }else{
        $params['unit_id']=$_POST['unit_id'];
        $params['project_id']=$_POST['project_id'];
    }

    $params['user']=USER;
    $params['token']=$authKey;
    $qs= http_build_query($params);

    curl_setopt($c, CURLOPT_URL, $wsUrl);
    curl_setopt($c, CURLOPT_POST, true);
    curl_setopt($c, CURLOPT_POSTFIELDS, $qs);
    curl_setopt($c, CURLOPT_CONNECTTIMEOUT, 30);
    //curl_setopt($c,CURLOPT_HTTPHEADER,array('X-Authorization: '.$authKey));
    curl_setopt($c, CURLOPT_RETURNTRANSFER, 1);
    curl_setopt($c, CURLOPT_SSL_VERIFYHOST, 0);
    curl_setopt($c, CURLOPT_SSL_VERIFYPEER, 0);
    
    $o = curl_exec($c); 
    if (curl_errno($c)) {
      $sad = curl_error($c);
        print_r($sad);
      throw new Exception($sad);
    }   
    $info=curl_getinfo($c,CURLINFO_HTTP_CODE);
    curl_close($c);
    $str=substr($info, 0,1);

    if($str==2){
        print_r($o);
    }else{
        return "Error code";
    }

?>