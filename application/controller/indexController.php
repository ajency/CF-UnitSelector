<?php
  function bookNow($bookingId,$unitId){
    $_SESSION['startTime']= time();  
    $buyer_id=uniqid();
    $_SESSION['buyer_id']=$buyer_id;

    
    $unitData = json_decode(getUnitInfo($unitId),true);
    $status = $unitData['data']['unit']['status'];
    if($status=='available')
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
      header('location:'.SITE_URL.'public/unit.php');
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


function saveBuyerInfo($buyer_id,$buyerData ,$billingData){


    $t=time();
    $date= date('Y-m-d H:i:s',$t);
    $billingData = serialize($billingData);

    //mysql_select_db('test', $conn);
    $sql = "INSERT INTO booking_engine_buyers (buyer_id, buyer_name, email, phone, pan_card_number, buyer_type, address_line_1, address_line_2,city,state,country,pincode,biiling_info) VALUES ('
                                                      ".$buyer_id."','".$buyerData["NAME"]."','".$buyerData["EMAIL"]."','".$buyerData["PHONE"]."','".$buyerData["PANCARD"]."','".$buyerData["BUYER_TYPE"]."','".$buyerData["ADDRESS"]."','','".$buyerData["CITY"]."','".$buyerData["STATE"]."','".$buyerData["COUNTRY"]."','".$buyerData["ZIPCODE"]."','".$billingData."')";

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
                updateUnitStatus($unit_id ,$unit_status);  
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

    function sendMail($to,$name,$subject,$message)
    {
        try {
              $mail = new PHPMailer(true); //New instance, with exceptions enabled

              //$body             = file_get_contents('contents.html');
              //$body             = preg_replace('/\\\\/','', $body); //Strip backslashes
              $body  = mailContent($name ,$subject, $message)

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


?>
