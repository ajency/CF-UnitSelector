<?php
  function bookNow($bookingId,$unitId){

    $unitData = json_decode(getUnitInfo($unitId),true);
    $status = $unitData['data']['unit']['status'];
    if($status=='available')
    {
        saveBookingInfo($bookingId,$unitId,'');

        $old_status=booking_history_status_booking_start;
        $new_status=booking_history_status_booking_initialized;
        $comments=booking_history_comment_buyer_option;
        saveBookingHistory($bookingId,$old_status, $new_status, $comments,'New Buyer');
        updateUnitStatus($unitId ,'blocked',$bookingId);

    }
    else
    {
      header('location:'.SITE_URL.'public/unit.php');
      exit;
    }
    

    return $unitData;
  }

  function ordinalSuffix($number)
  {
      if($number == 1)
      {
         $number = $number .' st';
      }
      elseif($number == 2)
      {
         $number = $number .' nd';
      }
      elseif($number == 3)
      {
         $number = $number .' rd';
      }
      else
      {
         $number = $number .' th';
      }
      return $number;
  }

  function moneyFormatIndia($num){
      $num = explode(".", $num);
      $num = $num[0];


      $explrestunits = "" ;
      if(strlen($num)>3){
          $lastthree = substr($num, strlen($num)-3, strlen($num));
          $restunits = substr($num, 0, strlen($num)-3); // extracts the last three digits
          $restunits = (strlen($restunits)%2 == 1)?"0".$restunits:$restunits; // explodes the remaining digits in 2's formats, adds a zero in the beginning to maintain the 2's grouping.
          $expunit = str_split($restunits, 2);
          for($i=0; $i<sizeof($expunit); $i++){
              // creates each of the 2's group and adds a comma to the end
              if($i==0)
              {
                  $explrestunits .= (int)$expunit[$i].","; // if is first value , convert into integer
              }else{
                  $explrestunits .= $expunit[$i].",";
              }
          }
          $thecash = $explrestunits.$lastthree;
      } else {
          $thecash = $num;
      }
      return $thecash; // writes the final format where $currency is the currency symbol.
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

        //$booking_id = $_SESSION['booking_id'];
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
              return moneyFormatIndia($o);
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

      function updateBuyerToBooking($buyer_id,$booking_id){

        $sql = 'UPDATE booking_engine_bookings set buyer_id = "'.$buyer_id. '" WHERE booking_id = "' . $booking_id . '"';    
        $retval = mysql_query($sql);
        if(! $retval )
        {
        die('Could not enter data: ' . mysql_error());
        }
        return true;
              
      }

      


function saveBuyerInfo($buyer_id,$buyerData ,$billingData){


    $t=time();
    $date= date('Y-m-d H:i:s',$t);
    $billingData = serialize($billingData);

    //mysql_select_db('test', $conn);
    $sql = "INSERT INTO booking_engine_buyers (buyer_id, buyer_name, email, phone, pan_card_number, buyer_type, address_line_1, address_line_2,city,state,country,pincode,biiling_info) VALUES ('".$buyer_id."','".$buyerData["NAME"]."','".$buyerData["EMAIL"]."','".$buyerData["PHONE"]."','".$buyerData["PANCARD"]."','".$buyerData["BUYER_TYPE"]."','".$buyerData["ADDRESS"]."','','".$buyerData["CITY"]."','".$buyerData["STATE"]."','".$buyerData["COUNTRY"]."','".$buyerData["ZIPCODE"]."','".$billingData."')";

    //echo $sql; exit;
    $retval = mysql_query($sql);
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
            $unitinfo = json_decode(getUnitInfo($unit_id),true);
            $unitData =$unitinfo['data'] ; 
            $merchantId =$unitData['merchant_id'] ; 
            $salt =$unitData['salt'] ; 
            $payuUrl=payuUrl;
            $key = $merchantId;
            $salt = $salt;
            $command = "cancel_refund_transaction";//"verify_payment";//cancel_refund_transaction
            $var1 =$_SESSION["mihpayid"]; //echo " mihpayid: ".$var1;
            $var2 = rand(1000000,9999999);//uniqid();
            $booking_id=$_SESSION["booking_id"]; //echo " booking_id: ".$booking_id;
            $booking_payment_id=$_SESSION["booking_payment_id"]; //echo " booking_payment_id: ".$booking_payment_id; exit;
            $var3 = $booking_amount; // Transaction ID//miahpaid  var 2 generate var 3 --full amt
            //$var2 = "4675764";//"7893238"; // to be used in case of refund
            //$var3 = "10"; // to be used in case of refund
            $buyer_name=$_SESSION["buyer_name"];
            $buyer_email=$_SESSION["buyer_email"];
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
                updateUnitStatus($unit_id ,$unit_status,$booking_id);  
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
            
            $txt = "Booking successfully Cancelled.";
            $subject = 'Booking successfully canceled';
          // self::sendEmail($login_id,$name,$txt,$subject);

            sendMail($buyer_email,$buyer_name,$subject,$txt);
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


    function updateUnitStatus($unit_id,$unit_status,$bookingId){
      
        $c = curl_init();
        
        $unitURL=updateUnitStatus;
        $authKey=unitSelectorAuthKey;
        $wsUrl=$unitURL . $unit_id; 
        $params['status'] = $unit_status;
        $params['booking_id'] = $bookingId;
      
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

    function sendMail($to,$name,$subject,$message)
    {
        try {
              $mail = new PHPMailer(true); //New instance, with exceptions enabled

              //$body             = file_get_contents('contents.html');
              //$body             = preg_replace('/\\\\/','', $body); //Strip backslashes
              $body  = mailContent($name ,$subject, $message);

              $mail->IsSMTP();                           // tell the class to use SMTP
              $mail->SMTPAuth   = true;                  // enable SMTP authentication
              $mail->Port       = 587;                    // set the SMTP server port
              $mail->Host       = MAIL_HOST;            // SMTP server
              $mail->Username   = MAIL_USER;             // SMTP server username
              $mail->Password   = MAIL_PASS;            // SMTP server password

              //$mail->IsSendmail();  // tell the class to use Sendmail

              $mail->AddReplyTo("online-booking@commonfloor.com","CommonFloor Unit Selector");

              $mail->From       = "online-booking@commonfloor.com";
              $mail->FromName   = "CommonFloor Unit Selector";

              //$to = "prajay@ajency.in";

              $mail->AddAddress($to);

              $mail->Subject  = $subject;

             // $mail->AltBody    = $message; // optional, comment out and test
              $mail->WordWrap   = 80; // set word wrap

              $mail->MsgHTML($body);

              $mail->IsHTML(true); // send as HTML

              $mail->Send();
              return true;
            } catch (phpmailerException $e) {
              echo $e->errorMessage();
              exit;
              return false;
            }

    }

    function mailContent($name ,$heading, $content)
    {
        $html= '<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
  <head>
        <meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />
        <title>Email</title>
        <style type="text/css">
      
      #outlook a{padding:0;} /* Force Outlook to provide a "view in browser" message */
      .ReadMsgBody{width:100%;} .ExternalClass{width:100%;} /* Force Hotmail to display emails at full width */
      .ExternalClass, .ExternalClass p, .ExternalClass span, .ExternalClass font, .ExternalClass td, .ExternalClass div {line-height: 100%;} /* Force Hotmail to display normal line spacing */
      body, table, td, p, a, li, blockquote{-webkit-text-size-adjust:100%; -ms-text-size-adjust:100%;} /* Prevent WebKit and Windows mobile changing default text sizes */
      table, td{mso-table-lspace:0pt; mso-table-rspace:0pt;} /* Remove spacing between tables in Outlook 2007 and up */
      img{-ms-interpolation-mode:bicubic;} /* Allow smoother rendering of resized image in Internet Explorer */


      body{margin:0; padding:0;}
      img{border:0; height:auto; line-height:100%; outline:none; text-decoration:none;}
      table{border-collapse:collapse !important;}
      body, #bodyTable, #bodyCell{height:100% !important; margin:0; padding:0; width:100% !important;}

      

      #bodyCell{padding:20px;}
      #templateContainer{width:600px;}


      body, #bodyTable{
         background-color:#DEE0E2;
      }

      
      #bodyCell{
        border-top:4px solid #BBBBBB;
      }

      
      #templateContainer{
         border:1px solid #BBBBBB;
      }

      
      h1{
        color:#202020 !important;
        display:block;
        font-family:Arial;
        font-size:26px;
        font-style:normal;
        font-weight:bold;
        line-height:100%;
        letter-spacing:normal;
        margin-top:0;
        margin-right:0;
        margin-bottom:10px;
        margin-left:0;
        text-align:left;
      }


      h2{
        color:#404040 !important;
        display:block;
        font-family:Arial;
        font-size:20px;
        font-style:normal;
        font-weight:bold;
        line-height:100%;
        letter-spacing:normal;
        margin-top:0;
        margin-right:0;
        margin-bottom:10px;
        margin-left:0;
        text-align:left;
      }

      h3,{
        color:#606060 !important;
        display:block;
        font-family:Arial;
        font-size:16px;
        
        font-weight:normal;
        line-height:100%;
        letter-spacing:normal;
        margin-top:0;
        margin-right:0;
        margin-bottom:10px;
        margin-left:0;
        text-align:left;
      }
      .bold{
        color: #f68121 !important;
          font-family:Arial;
          font-size: 15px;
          margin-bottom: 10px;
      }

      h4{
        color:#808080 !important;
        display:block;
        font-family:Arial;
        font-size:14px;
        
        font-weight:normal;
        line-height:100%;
        letter-spacing:normal;
        margin-top:0;
        margin-right:0;
        margin-bottom:10px;
        margin-left:0;
        text-align:left;
      }


      #templatePreheader{
        background-color:#F4F4F4;
        border-bottom:1px solid #CCCCCC;
      }

      .preheaderContent{
        color:#808080;
        font-family:Arial;
        font-size:10px;
        line-height:125%;
        text-align:left;
      }


      .preheaderContent a:link, .preheaderContent a:visited,  .preheaderContent a .yshortcuts {
        color:#606060;
        font-weight:normal;
        text-decoration:underline;
      }


      #templateHeader{
        background-color:#F4F4F4;
        border-top:1px solid #FFFFFF;
        border-bottom:1px solid #CCCCCC;
      }
aderContent{
        color:#505050;
        font-family:Arial;
        font-size:20px;
        font-weight:bold;
        line-height:100%;
        padding-top:10;
        padding-right:10;
        padding-bottom:10;
        padding-left:10;
        text-align:left;
        vertical-align:middle;


      }
      a{
        color:#9E9D9D !important;
        font-size: 13px;
      }
      a:hover{
        color:#f68121!important;
      }

      .headerContent a:link, .headerContent a:visited,  .headerContent a .yshortcuts {
        color:#EB4102;
        font-weight:normal;
        text-decoration:underline;
      }

      #headerImage{
        height:auto;
        max-width:600px;
      }


      #templateBody{
        background-color:#F4F4F4;
        border-top:1px solid #FFFFFF;
        border-bottom:1px solid #CCCCCC;
      }


      .bodyContent{
        color:#505050;
        /*@editable*/font-family:Arial;
        font-size:14px;
        line-height:150%;
        padding-top:20px;
        padding-right:20px;
        padding-bottom:20px;
        padding-left:20px;
        text-align:left;
      }

      .bodyContent a:link, .bodyContent a:visited, .bodyContent a .yshortcuts {
        color:#EB4102;
        font-weight:normal;
        text-decoration:underline;
      }

      .bodyContent img{
        display:inline;
        height:auto;
        max-width:560px;
      }


      #templateFooter{
        background-color:#F4F4F4;
        border-top:1px solid #FFFFFF;
      }


      .footerContent{
        color:#808080;
        font-family:Arial;
        font-size:10px;
        line-height:150%;
        padding-top:20px;
        padding-right:20px;
        padding-bottom:20px;
        padding-left:20px;
        text-align:left;
      }

      .footerContent a:link, .footerContent a:visited, .footerContent a .yshortcuts, .footerContent a span{
        color:#606060;
        font-weight:normal;
        text-decoration:underline;
      }



            @media only screen and (max-width: 480px){
  
        body, table, td, p, a, li, blockquote{-webkit-text-size-adjust:none !important;} /* Prevent Webkit platforms from changing default text sizes */
                body{width:100% !important; min-width:100% !important;} /* Prevent iOS Mail from adding padding to the body */

        #bodyCell{padding:10px !important;}


  
        #templateContainer{
          max-width:600px !important;
          width:100% !important;
        }
        a{
          width: 230px;
          display: block;
          word-wrap: break-word;
        }

        h1{
          font-size:24px !important;
          line-height:100% !important;
        }

        h2{
          font-size:20px !important;
          line-height:100% !important;
        }

        h3{
          font-size:18px !important;
          line-height:100% !important;

        }


        h4{
          font-size:16px !important;
          line-height:100% !important;
        }



        #templatePreheader{display:none !important;} /* Hide the template preheader to save space */

        #headerImage{
          height:auto !important;
          max-width:600px !important;
          width:100% !important;
        }


        .headerContent{
          font-size:20px !important;
          line-height:125% !important;
        }


        .bodyContent{
          font-size:14px !important;
          line-height:125% !important;
          text-align:center;
        }

        .footerContent{
          font-size:14px !important;
          line-height:115% !important;
        }

        .footerContent a{display:block !important;} 
 
        
      }
    </style>
    </head>
    <body leftmargin="0" marginwidth="0" topmargin="0" marginheight="0" offset="0" >
 
       <center>
                    <table align="center" border="0" cellpadding="0" cellspacing="0" height="100%" width="100%" id="bodyTable" >
                        <tr >
                            <td align="center" valign="top" id="bodyCell">
                                <!-- BEGIN TEMPLATE // -->
                                <table border="0" cellpadding="0" cellspacing="0" id="templateContainer" style=" border-bottom: 5px solid #f68121!important;  border: 1px solid #BBBBBB;">
                                    <tr>
                                        <td align="center" valign="top">
                                            <!-- BEGIN PREHEADER // -->

                                            <!-- // END PREHEADER -->
                                        </td>
                                    </tr>
                                    <tr>
                                        <td align="center" valign="top">
                                            <!-- BEGIN HEADER // -->
                                            <table border="0" cellpadding="10px" cellspacing="0" width="100%" id="templateHeader" style="  background-color: #F4F4F4; border-top: 1px solid #FFFFFF; border-bottom: 1px solid #CCCCCC;">
                                                <tr>
                                                    <td valign="top" class="headerContent">
                                                        <img src="http://phase1.cfunitselectortest.com/images/inner-header-logo.png"/>
                                                    </td>

                                                </tr>
                                            </table>
                                            <!-- // END HEADER -->
                                        </td>
                                    </tr>
                                    <tr>
                                        <td align="center" valign="top">
                                            <!-- BEGIN BODY // -->
                                            <table border="0" cellpadding="0" cellspacing="0" width="100%" id="templateBody">
                                                <tr>
                                                    <td valign="top" class="bodyContent" mc:edit="body_content" style="color: #505050;font-family: Arial;font-size: 14px;line-height: 150%;padding-top: 20px;padding-right: 20px;padding-bottom: 20px;padding-left: 20px;text-align: left;">


                                                       Dear '.$name.',
                                                        <br/>
                                                        <h3>'.$heading.'</h3>
                                                          '.$content.'
                                                            <br/>
                                                <br/>
                                                            Thanks,
                                                            <br/>
                                                            Team CommonFloor Unit Selector
                                                     </td>
                                                </tr>
                                            </table>
                                            <!-- // END BODY -->
                                        </td>
                                    </tr>

                                </table>
                                <!-- // END TEMPLATE -->
                            </td>
                        </tr>
                    </table>
                </center>
 
    </body>
</html>';

    return $html;

    }

    function invoiceHtml($bookingId)
    {
        $q= "SELECT * FROM `booking_engine_bookings` WHERE `booking_id`= '".$bookingId."'";
        $r= mysql_query($q);
        $row =mysql_fetch_assoc($r);

        $unitId = $row['unit_id'];
        $buyerId = $row['buyer_id'];

        $buyer_query= "SELECT * FROM `booking_engine_buyers` WHERE `buyer_id`= '".$buyerId."'";
        $buyer_res= mysql_query($buyer_query);
        $buyer_row =mysql_fetch_assoc($buyer_res);

        $buyer_name = $buyer_row['buyer_name'];
        $buyer_email = $buyer_row['email'];
        $buyer_phone = $buyer_row['phone'];
        $buyer_address = $buyer_row['address_line_1'];
        $buyer_city = $buyer_row['city'];
        $buyer_state = $buyer_row['state']; 
        $buyer_country = $buyer_row['country'];
        $buyer_pincode = $buyer_row['pincode'];

        $unitinfo = json_decode(getUnitInfo($unitId),true);
        $unitData =$unitinfo['data'] ; 
        $booking_amount=getBookingAmount($unitId,"booking_amount"); 
        $totalSaleValue=getBookingAmount($unitId,"sale_value");

        $buildingStr ='';
        if(!empty($unitData['building']))
        {
          $buildingStr =':  '.$unitData['building']['name'].' :  '.ordinalSuffix($unitData['unit']['floor_number']).' floor';
 
        }

        $html ='<!DOCTYPE html>
                <html>
                <head>
                <!-- If you delete this meta tag, Half Life 3 will never be released. -->
                <meta name="viewport" content="width=device-width" />

                <meta charset="UTF-8" />
                <title>CF</title>

                </head>
                 
                <body bgcolor="#FFFFFF" style="margin:0; font-family: \'Arail\', sans-serif;">




                <!-- BODY -->
                <table  cellpadding="0" cellspacing="0" style="border-top:2px solid #ccc;">
                  <tr>
                      <td>
                           <table cellpadding="0"  cellspacing="5" >
                        <tr width="700px">
                          <td style="font-size:16px; padding:30px 0 10px 0;">    
                            '.$buyer_name.'
                          </td>         
                        </tr>
                        <tr width="700px">         
                          <td  style="color:#999; font-size:14px;  padding:0px 0 10px 0;">
                            '.$buyer_email.'
                          </td>
                        </tr>
                        <tr width="700px">         
                          <td style="color:#999; font-size:14px;  padding:0px 0 10px 0;">
                             '.$buyer_phone.'
                          </td>
                        </tr>
                     </table>
                      </td>
                       <td><div style="float:right;text-align:right"> common<b>floor</b>.com</div></td>
                  </tr>
                  <tr>
                      <table cellpadding="0"  cellspacing="5" >
                             <tr >         
                          <td   style="color:#999; font-size:14px;  padding:0px 0 10px 0;">
                       '.$buyer_address.', 
                             '.$buyer_city.'-'.$buyer_state.',
                             '.$buyer_country.', <br>
                             '.$buyer_pincode.', <br><br>
                           
                          </td>
                        </tr>
                        <tr >         
                          <td  style="color:#333; font-weight:400; font-size:18px; text-transform:uppercase;">
                        Booking id : <span style="color:#FE943E">( '.$bookingId.' )</span>
                          </td>
                        </tr>
                        <tr>
                        <br>
                     
                          <td   style="color:#999; font-size:14px;  ">
                            <table cellpadding="0" cellspacing="5" style="border-top:1px solid #ccc;">
                                <tr >
                                  <td width="60%" style=" font-weight: 600; font-size:16px; color:#444;">
                                   <b> Description </b>
                                  </td>
                                  <td width="40%" style="font-weight: 600; font-size:16px; color:#444;">
                                    <b> Total </b>
                                  </td>
                                  
                                </tr>
                                <tr >
                                  <td width="60%" style="color:#999;">  <br>   <br>                    
                                    <span style="text-transform:uppercase; color:#333; font-weight:600; font-size:14px; margin: 0 0 10px 0;">'.$unitData['project_title'].' ('.$unitData['unit']['name'].')</span><br>
                                    <span style="margin: 0 0 10px 0; font-size:12px; text-transform:uppercase;">'.$unitData['project_type'].' : '. $unitData['unit']['unit_type'].' : '.$unitData['unit']['built_up_area'].' Sq ft  '.$buildingStr.'</span><br>
                                    <span style="margin: 0 0 10px 0; font-size:12px; text-transform:uppercase;">Price per sqft. : <span style="color:#333;">Rs. 2400</span></span>
                                  </td> 
                                  <td width="40%" style="font-weight: 600; text-transform:uppercase; font-size:14px; vertical-align:middle; color:#444;">
                                  <br>  <br> Rs '.$booking_amount.'
                                  </td>               
                                </tr>      

                              </table> 
                           
                          </td>
                        </tr>
                        <tr>
                          <td>
                          <br> <br>
                           <table cellpadding="0" cellspacing="5" style=" border-top:1px solid #ccc; border-bottom:1px solid #ccc;">
                       <br><br> <tr >         
                          <td  style="font-weight: 600; text-transform:uppercase; font-size:14px; color:#444;">
                            <b>Total Value</b>
                          </td>
                          <td style="font-weight: 600; text-transform:uppercase; font-size:14px; color:#444;">                       <b>  Sub total </b>
                          </td>
                          <td style="font-weight: 600; text-transform:uppercase; font-size:14px; color:#444; ">                      <b>  Total amount </b>
                          </td>                   
                        </tr><br>
                        <tr >         
                          <td  style="font-weight: 600; text-transform:uppercase; font-size:14px; padding:30px 0; color:#444;">
                            Rs '.$totalSaleValue.'
                          </td>
                          <td  style="font-weight: 600; text-transform:uppercase; font-size:14px; padding-top:0px; color:#444;">                       Rs '.$booking_amount.'
                          </td>
                          <td  style="font-weight: 600; text-transform:uppercase; font-size:34px; padding-top:20px; color:#444;">                        Rs '.$booking_amount.'
                          </td>                   
                        </tr>  <br> <br>   
                      </table>
                          </td>
                        </tr>
                        <tr>
                          <td>
                            <table cellpadding="0" cellspacing="0"  style=" padding:10px 0 100px 0;">
                        <tr >         
                          <td style="color:#999; font-size:13px;">
                            * Booking can be cancelled within 7 days. Contact administrator for more details.
                          </td>                       
                        </tr>           
                      </table>
                      <br><br><br><br>
                      <table cellpadding="0" cellspacing="0" width="700px">
                        <tr >         
                          <td width="200px" style="font-size:14px; color:#444;">
                            common<b>floor</b>.com
                          </td> 
                          <td  style="text-transform:uppercase; font-size:11px; padding-left:20px; color:#444;">
                            copyright &copy; 2007-15 commonfloor.com. all rights reserved.
                          </td>                     
                        </tr>           
                      </table>
                          </td>
                        </tr>
                     
                </table>

               


                </body>
                </html>';
 
        
        return $html;

    }


?>
