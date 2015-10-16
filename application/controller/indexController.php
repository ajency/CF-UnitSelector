<?php
  function bookNow($bookingId,$unitId){
    $_SESSION['startTime']= time();  
    $buyer_id=uniqid();
    $_SESSION['buyer_id']=$buyer_id;

    
    $unitData = json_decode(getUnitInfo($unitId),true);
    $status = $unitData['data']['unit']['status'];
    if($status==='available')
    {
        saveBookingInfo($bookingId,$unitId,$buyer_id);

        $old_status=booking_history_status_booking_start;
        $new_status=booking_history_status_booking_initialized;
        $comments=booking_history_comment_buyer_option;
        saveBookingHistory($bookingId,$old_status, $new_status, $comments,'New Buyer');
        updateUnitStatus($unitId ,'blocked');

    }
    else
    {
      header('location:http://unitselector-booking.local/public/unit.php');
      exit;
    }
    

    return $unitData;
  }

  
  function saveBookingInfo($booking_id,$unitId,$buyer_id){

    $status = booking_history_status_booking_initialized;
 
    $t=time();
    $date= date('Y-m-d H:i:s',$t);

    $sql = 'INSERT INTO booking_engine_bookings'.' (booking_id, buyer_id, unit_id, status, booking_date, payment_plan_id, price_sheet_id) VALUES ("'
                                              .$booking_id.'","'.$buyer_id.'","'.$unitId.'","'.$status.'","'.$date.'",""'.',"")';

    $retval = mysql_query($sql);

    if(! $retval )
    {
      die('Could not enter data: ' . mysql_error());
    }

    //echo "Entered data successfully\n";
    return true;

              
  }

    function saveBookingHistory($booking_id,$old_status, $new_status, $comments,$buyer_name){

        $booking_id = $_SESSION['booking_id'];
        $old_status=booking_history_status_booking_start;
        $new_status=booking_history_status_booking_initialized;
        $comments=booking_history_comment_buyer_option;

        $booking_history_id=rand(100000,999999);
        $updated_by=$buyer_name;
 
        $t=time();
        $date= date('Y-m-d H:i:s',$t);
         

        $sql = 'INSERT INTO booking_engine_booking_history'.' (booking_history_id, booking_id, old_status, new_status, comments, updated_on, updated_by) VALUES ("'
                                                      .$booking_history_id.'","'.$booking_id.'","'.$old_status.'","'.$new_status.'","'.$comments.'","'.$date.'","'.$updated_by.'")';

        $retval = mysql_query($sql );
           
           if(! $retval )
           {
              die('Could not enter data: ' . mysql_error());
           }
 
          return true;
               
    }

    // function saveBookingHistory($booking_id,$old_status, $new_status, $comments,$buyer_name){
    //     $booking_history_id=rand(100000,999999);
    //     $updated_by=$buyer_name;

    //     $ini_array = parse_ini_file("../models/config.ini");
    //     $servername = $ini_array['db.config.host'];
    //     $username = $ini_array['db.config.username'];  
    //     $password = $ini_array['db.config.password'];  
    //     $dbname = $ini_array['db.config.dbname'];  

    //     $t=time();
    //     $date= date('Y-m-d H:i:s',$t);
    //     // Create connection
    //     global $conn;
    //     $conn = mysqli_connect($servername, $username, $password, $dbname);
    //     // Check connection
    //      if(! $conn )
    //        {
    //           die('Could not connect: ' . mysql_error());
    //        }
           
    //     //mysql_select_db('test', $conn);

    //     $sql = 'INSERT INTO booking_engine_booking_history'.' (booking_history_id, booking_id, old_status, new_status, comments, updated_on, updated_by) VALUES ("'
    //                                                   .$booking_history_id.'","'.$booking_id.'","'.$old_status.'","'.$new_status.'","'.$comments.'","'.$date.'","'.$updated_by.'")';

    //     $retval = mysqli_query($conn, $sql );
           
    //        if(! $retval )
    //        {
    //           die('Could not enter data: ' . mysql_error());
    //        }
           
    //        //echo "Entered data successfully\n";
           
    //        mysqli_close($conn);
          
                        
    //     }

    function getBookingAmount($unit_id,$value){
          $c = curl_init();

          $params['user']=USER;  //19;
          $params['token']=bookingCrmAuthKey;
          $getBookingAmt= getBookingAmt;  //"http://stage.bookingcrm.commonfloor.com/get_booking_amount/";
          $getTotalSaleValue=getTotalSaleValue; //"http://stage.bookingcrm.commonfloor.com/get_total_sale_value/";

          if($value=="booking_amount"){
              $wsUrl=$getBookingAmt;
          }else{
              $wsUrl=$getTotalSaleValue;
          }
          $params['unit_id']=$unit_id;

          $qs= http_build_query($params);

          curl_setopt($c, CURLOPT_URL, $wsUrl);
          curl_setopt($c, CURLOPT_POST, true);
          curl_setopt($c, CURLOPT_POSTFIELDS, $qs);
          curl_setopt($c, CURLOPT_CONNECTTIMEOUT, 30);
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
              return ($o);
          }else{
              return "Error code";
          }
      }

      function updateBookingInfo($booking_id,$status){

        $t=time();
        $date= date('Y-m-d H:i:s',$t);

        //mysql_select_db('test', $conn);
        if($status=="deleted"){
         $sql = "DELETE FROM booking_engine_bookings WHERE booking_id=".$booking_id.'"';
        }else{
          $sql = 'UPDATE booking_engine_bookings set status = "'.$status. '" WHERE booking_id = "' . $booking_id . '"';    
        }

        $retval = mysql_query($sql);
         if(! $retval )
          {
            die('Could not enter data: ' . mysql_error());
          }
        return true;
              
      }


function saveBuyerInfo($buyer_id,$buyer_name,$email,$phone){

    $t=time();
    $date= date('Y-m-d H:i:s',$t);


    //mysql_select_db('test', $conn);
    $sql = 'INSERT INTO booking_engine_buyers'.' (buyer_id, buyer_name, email, phone, pan_card_number, buyer_type, address_line_1, address_line_2,city,state,country,pincode) VALUES ("'
                                                      .$buyer_id.'","'.$buyer_name.'","'.$email.'","'.$phone.'","'.null.'","'.null.'","'.null.'","'.null.'","'.null.'","'.null.'","'.null.'","'.null.'")';

    $retval = mysql_query($sql );
     if(! $retval )
    {
      die('Could not enter data: ' . mysql_error());
    }
     return true;  
 
                    
}




    function savePaymentHistory($booking_payment_id,$booking_id,$payment_status,$payment_history_is_active,$mihpayid_Val){

        $t=time();
        $date= date('Y-m-d H:i:s',$t);
                   
        $sql = 'INSERT INTO booking_engine_payment_history'.' (payment_id, booking_id, payment_status, is_active, updated_on, mihpayid) VALUES ("'
                                                      .$booking_payment_id.'","'.$booking_id.'","'.$payment_status.'","'.$payment_history_is_active.'","'.$date.'","'.$mihpayid_Val.'")';

        $retval = mysql_query($sql );
         if(! $retval )
        {
          die('Could not enter data: ' . mysql_error());
        }
          return true;   
                        
        }

        

        function updatePaymentStructure($booking_id){

            $wsUrl=BookPriceStructure;
            $c = curl_init();
            $params['booking_id'] = $booking_id; 
            $params['user']=USER;
            $params['token']=bookingCrmAuthKey;
            $qs= http_build_query($params);

            curl_setopt($c, CURLOPT_URL, $wsUrl);
            curl_setopt($c, CURLOPT_POST, true);
            curl_setopt($c, CURLOPT_POSTFIELDS, $qs);
            curl_setopt($c, CURLOPT_CONNECTTIMEOUT, 30);
            curl_setopt($c, CURLOPT_RETURNTRANSFER, 1);
            curl_setopt($c, CURLOPT_SSL_VERIFYHOST, 0);
            curl_setopt($c, CURLOPT_SSL_VERIFYPEER, 0);

            $o = curl_exec($c); 

            if (curl_errno($c)) {
               
              $sad = curl_error($c);
              print_r($sad);

            }
            $info=curl_getinfo($c,CURLINFO_HTTP_CODE);  
           
            curl_close($c);
        }
        
        function updateUnitInfo($unit_id,$unit_status){
        
            $ini_array = parse_ini_file("../models/config.ini");
            $c = curl_init();
            $getUnitURL=$ini_array["unitSummary"];
            $authKey=$ini_array["unitSelectorAuthKey"];
            $wsUrl=$getUnitURL . $unit_id;
            $params['status'] = $unit_status;
          
            $qs= http_build_query($params);

            curl_setopt($c, CURLOPT_URL, $wsUrl);
            curl_setopt($c, CURLOPT_POST, true);
            curl_setopt($c, CURLOPT_POSTFIELDS, $qs);
            curl_setopt($c, CURLOPT_CONNECTTIMEOUT, 30);
            curl_setopt($c,CURLOPT_HTTPHEADER,array('X-Authorization: '.$authKey));
            curl_setopt($c, CURLOPT_RETURNTRANSFER, 1);
            curl_setopt($c, CURLOPT_SSL_VERIFYHOST, 0);
            curl_setopt($c, CURLOPT_SSL_VERIFYPEER, 0);
            
            $o = curl_exec($c);

            if (curl_errno($c)) {
              $sad = curl_error($c);
              throw new Exception($sad);
            }
            $info=curl_getinfo($c,CURLINFO_HTTP_CODE);
            curl_close($c);
            $str=substr($info, 0,1);
            if($str==2){
                return ($o);
            }else{
                return "Error code";
            } 
                        
        }

        function refund_amount($unit_id){
            $booking_amount=getBookingAmount($unit_id,"booking_amount"); //echo " booking_amount: ".$booking_amount; 
            $payuUrl=payuUrl;
            $key = "gtKFFx";
            $salt = "eCwWELxi";
            $command = "cancel_refund_transaction";//"verify_payment";//cancel_refund_transaction
            $var1 =$_SESSION["mihpayid"]; //echo " mihpayid: ".$var1;
            $var2 = rand(1000000,9999999);//uniqid();
            $booking_id=$_SESSION["booking_id"]; //echo " booking_id: ".$booking_id;
            $booking_payment_id=$_SESSION["booking_payment_id"]; //echo " booking_payment_id: ".$booking_payment_id; exit;
            $var3 = $booking_amount; // Transaction ID//miahpaid  var 2 generate var 3 --full amt
            //$var2 = "4675764";//"7893238"; // to be used in case of refund
            //$var3 = "10"; // to be used in case of refund
            $buyer_name=$_SESSION["buyer_name"];
            //return $buyer_name;
            $hash_str = $key  . '|' . $command . '|' . $var1 . '|' . $salt ;
            $hash = strtolower(hash('sha512', $hash_str));

            $r = array('key' => $key , 'hash' =>$hash , 'var1' => $var1, 'command' => $command,'var2' => $var2,'var3' => $var3);
            
            $qs= http_build_query($r);
            $wsUrl = $payuUrl;//"https://test.payu.in/merchant/postservice.php?form=2";
            //$wsUrl = "https://info.payu.in/merchant/postservice?form=1";

            $c = curl_init();
            curl_setopt($c, CURLOPT_URL, $wsUrl);
            curl_setopt($c, CURLOPT_POST, 1);
            curl_setopt($c, CURLOPT_POSTFIELDS, $qs);
            curl_setopt($c, CURLOPT_CONNECTTIMEOUT, 30);
            curl_setopt($c, CURLOPT_RETURNTRANSFER, 1);
            curl_setopt($c, CURLOPT_SSL_VERIFYHOST, 0);
            curl_setopt($c, CURLOPT_SSL_VERIFYPEER, 0);
            $o = curl_exec($c);
            if (curl_errno($c)) {
              $sad = curl_error($c);
              throw new Exception($sad);
            }
            curl_close($c);
            $valueSerialized = @unserialize($o);
            if($o === 'b:0;' || $valueSerialized !== false) {
              print_r($valueSerialized);
            }
            $data= json_decode($o);
          
            // echo $data->msg;
            //echo $data->status;
            $old_status=booking_history_status_refund_inititated;
            if($data->status==1){   
                $new_status=booking_history_status_refund_completed;
                $comments=booking_history_comment_refund_completed;
                $unit_status= availablity_available;

                $status="deleted";
                updateBookingInfo($booking_id,$old_status); 
                updateUnitStatus($unitId ,$unit_status);  
            }else{
                $new_status=booking_history_status_refund_Error;
                $comments=booking_history_comment_refund_not_completed;
            }
            $payment_history_is_active=payment_history_inactive;
            $payment_status=booking_history_status_refund_completed;
            $booking_payment_id=$_SESSION["booking_payment_id"];
            $mihpayid=$_SESSION["mihpayid"];
            saveBookingHistory($booking_id,$old_status, $new_status, $comments,$buyer_name);
            savePaymentHistory($booking_payment_id,$booking_id,$payment_status,$payment_history_is_active,$mihpayid);
            return $data->status;
    }


    function getUnitInfo($unit_id){
      $c = curl_init();
     // $unitselectorapi;
      $getUnitURL= unitSummary;
      $authKey=unitSelectorAuthKey;
      $wsUrl=$getUnitURL . $unit_id;

      curl_setopt($c, CURLOPT_URL, $wsUrl);
      // curl_setopt($c, CURLOPT_POST, 1);
      // curl_setopt($c, CURLOPT_POSTFIELDS, $qs);
      curl_setopt($c, CURLOPT_CONNECTTIMEOUT, 30);
      curl_setopt($c,CURLOPT_HTTPHEADER,array('X-Authorization: '.$authKey));
      curl_setopt($c, CURLOPT_RETURNTRANSFER, 1);
      curl_setopt($c, CURLOPT_SSL_VERIFYHOST, 0);
      curl_setopt($c, CURLOPT_SSL_VERIFYPEER, 0);
      $o = curl_exec($c); 
      // if (curl_errno($c)) {
      //   $sad = curl_error($c);
      //   throw new Exception($sad);
      // }
      // curl_close($c);
      // return $o;

      if (curl_errno($c)) {
        $sad = curl_error($c);
        throw new Exception($sad);
      }
      $info=curl_getinfo($c,CURLINFO_HTTP_CODE);
      curl_close($c);
      if($info==200)
      {
        $result=$o;
      }
      else
      {
        $result = array();
      }
      
      
      
      return $result;
        
    }


    function updateUnitStatus($unit_id,$unit_status){
      
        $c = curl_init();
        
        $unitURL=updateUnitStatus;
        $authKey=unitSelectorAuthKey;
        $wsUrl=$unitURL . $unit_id; 
        $params['status'] = $unit_status;
      
        $qs= http_build_query($params);

        curl_setopt($c, CURLOPT_URL, $wsUrl);
        curl_setopt($c, CURLOPT_POST, true);
        curl_setopt($c, CURLOPT_POSTFIELDS, $qs);
        curl_setopt($c, CURLOPT_CONNECTTIMEOUT, 30);
        curl_setopt($c,CURLOPT_HTTPHEADER,array('X-Authorization: '.$authKey));
        curl_setopt($c, CURLOPT_RETURNTRANSFER, 1);
        curl_setopt($c, CURLOPT_SSL_VERIFYHOST, 0);
        curl_setopt($c, CURLOPT_SSL_VERIFYPEER, 0);
        
        $o = curl_exec($c); 
        //return ($o);

        if (curl_errno($c)) {
          $sad = curl_error($c);
          throw new Exception($sad);
        }
        $info=curl_getinfo($c,CURLINFO_HTTP_CODE);
    
        curl_close($c);
        $str=substr($info, 0,1);
        if($str==2){
            return ($o);
        }else{
            return "Error code";
        }

        // echo "string";
        // if (curl_errno($c)) {
        //   $sad = curl_error($c);
        //   throw new Exception($sad);
        // }
        // curl_close($c);
        //return $o;
        
    }


?>
