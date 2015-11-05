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

    function generateInvoice($bookingId , $output)
    {
        $html = invoiceHtml($bookingId);

        // create new PDF document
        $pdf = new TCPDF(PDF_PAGE_ORIENTATION, PDF_UNIT, PDF_PAGE_FORMAT, true, 'UTF-8', false);

        // set document information
        $pdf->SetCreator(PDF_CREATOR);
        $pdf->SetAuthor('Ajency');
        $pdf->SetTitle('Ajency');
        $pdf->SetSubject('Ajency');
        $pdf->SetKeywords('Ajency');

        // remove default header/footer
        $pdf->setPrintHeader(false);
        $pdf->setPrintFooter(false);

        // set default monospaced font
        //$pdf->SetDefaultMonospacedFont(PDF_FONT_MONOSPACED);

        // set margins
        $pdf->SetMargins(5, 5, 5);

        // set auto page breaks
        $pdf->SetAutoPageBreak(TRUE, PDF_MARGIN_BOTTOM);

        // set image scale factor
        $pdf->setImageScale(PDF_IMAGE_SCALE_RATIO);

        // set some language-dependent strings (optional)
        if (@file_exists(dirname(__FILE__).'/lang/eng.php')) {
          require_once(dirname(__FILE__).'/lang/eng.php');
          $pdf->setLanguageArray($l);
        }

        // ---------------------------------------------------------

        // set font
        //$pdf->SetFont('times', 'BI', 20);

        // add a page
        $pdf->AddPage();

        // set text shadow effect
        //$pdf->setTextShadow(array('enabled'=>true, 'depth_w'=>0.2, 'depth_h'=>0.2, 'color'=>array(196,196,196), 'opacity'=>1, 'blend_mode'=>'Normal'));

        // Set some content to print
        // $html = <<<EOD
        // <h1>Commonfloor</h1>
        // <h4 class="orangeText">$unitData['project_title']  <span class="unitName">($unitData['unit']['name'])</span></h4>
        // <i>This is the first example of TCPDF library.</i>
        // <p>This text is printed using the <i>writeHTMLCell()</i> method but you can also use: <i>Multicell(), writeHTML(), Write(), Cell() and Text()</i>.</p>
        // <p>Please check the source code documentation and other examples for further information.</p>
        // <p style="color:#CC0000;">TO IMPROVE AND EXPAND TCPDF I NEED YOUR SUPPORT, PLEASE <a href="http://sourceforge.net/donate/index.php?group_id=128076">MAKE A DONATION!</a></p>
        // EOD;

        // Print text using writeHTMLCell()
        $pdf->writeHTMLCell(0, 0, '', '', $html, 0, 1, 0, true, '', true);

        // ---------------------------------------------------------

        // Close and output PDF document
        // This method has several options, check the source code documentation for more information.
        $path = SITE_PATH.'public/invoice/invoice-'.$bookingId.'.pdf';
        $pdf->Output($path, $output);

        //============================================================+
        // END OF FILE
        //============================================================+
        return $path;

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

            sendMail($buyer_email,$buyer_name,$subject,$booking_id,'cancel');
             
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

    function sendMail($to,$name,$subject,$bookingId,$type)
    {
        try {
              $mail = new PHPMailer(true); //New instance, with exceptions enabled

              //$body             = file_get_contents('contents.html');
              //$body             = preg_replace('/\\\\/','', $body); //Strip backslashes
              $body  =  mailContent($bookingId , $type);

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

              if($type=='success')
              {
                 $invoicePath = generateInvoice($bookingId , 'F');
                 $mail->AddAttachment($invoicePath);
              }
             

             // $mail->AltBody    = $message; // optional, comment out and test
              $mail->WordWrap   = 80; // set word wrap

              $mail->MsgHTML($body);

              $mail->IsHTML(true); // send as HTML

              $mail->Send();

              if($type=='success')
              {
                 unlink($invoicePath);
              }

              return true;
            } catch (phpmailerException $e) {
              echo $e->errorMessage();
              exit;
              return false;
            }

    }

 
    function mailContent($bookingId , $type)
    {
        if($type=='success')
          $bodyContent = sucessEmailContent($bookingId);
        elseif($type=='failure')
          $bodyContent = failureEmailContent($bookingId);
        else
          $bodyContent = cancelEmailContent($bookingId);
          

        $html= '<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
                <html xmlns="http://www.w3.org/1999/xhtml">
                  <head>
                        <meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />
                        <title>Email</title>
                 
                    </head>
                    <body leftmargin="0" marginwidth="0" topmargin="0" marginheight="0" offset="0" style="height:100%; margin:0; padding:0; width:100%; background-color:#DEE0E2;" >
                      <center>
                          <table align="center" border="0" cellpadding="0" cellspacing="0" height="100%" width="100%" style=" margin:0; padding:0; background-color:#DEE0E2;" >
                              <tr >
                                  <td align="center" valign="top" style="height:100%; margin:0; padding:0; width:100%; padding:20px; border-top:4px solid #BBBBBB;">
                                      <!-- BEGIN TEMPLATE // -->
                                      '.$bodyContent.'
                                       <!-- // END TEMPLATE -->
                                    </td>
                                </tr>
                            </table>
                        </center>
                    </body>
                </html>';

    return $html;

    }

    function sucessEmailContent($bookingId)
    { 

        $q= "SELECT * FROM `booking_engine_bookings` WHERE `booking_id`= '".$bookingId."'";
        $r= mysql_query($q);
        $row =mysql_fetch_assoc($r);

        $unitId = $row['unit_id'];
        $buyerId = $row['buyer_id'];
        $date = date('d F Y',strtotime($row['booking_date']));

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

        $buildingName = '';
        $floorNo = '';

        if(!empty($unitData['building']))
        {
          $buildingName = '<tr>
                            <td>
                              Tower Name : <span style="font-weight: 600; font-size: 14px; text-transform: uppercase;">'.$unitData['building']['name'].'</span>
                            </td>
                          </tr>';
          $floorNo = '<tr>
                        <td>
                          Floor Number : <span style="font-weight: 600; font-size: 14px; text-transform: uppercase;">'.ordinalSuffix($unitData['unit']['floor_number']).' Floor</span>
                        </td>
                      </tr>';
        }
        $html ='<table border="0" cellpadding="0" cellspacing="0" style="width:600px; border:1px solid #BBBBBB;">
                          <tr>
                              <td align="center" valign="top">
                                  <!-- BEGIN PREHEADER // -->
                                   
                                    <!-- // END PREHEADER -->
                                </td>
                            </tr>
                          <tr>
                              <td valign="top">
                                  <!-- BEGIN HEADER // -->
                                    <table border="0" cellpadding="10px" cellspacing="0" width="100%" style="background-color:#F4F4F4; border-top:1px solid #FFFFFF; border-bottom:1px solid #CCCCCC;">
                                        <tr>
                                            <td valign="top" style="padding-left: 20px;">
                                              <img style="width:100px" src="'.$unitData['project_image'].'"/>
                                            </td>

                                        </tr>
                                    </table>
                                    <!-- // END HEADER -->
                                </td>
                            </tr>
                            <tr>
                              <td align="center" valign="top">
                                  <!-- BEGIN HEADER // -->
                                    <table border="0" cellpadding="10px" cellspacing="0" width="100%" style="background: #ffffff;">
                                       <tr>
                                        <td style="font-family:Arial; font-size: 14px; padding: 40px 20px 10px;">
                                          <b> Hello '.$buyer_name.',</b>
                                        </td>                                          
                                       </tr>
                                        <tr>
                                            <td valign="top" style="color:#505050; font-family:Arial; font-size:14px; line-height:1.5; padding: 10px 20px 10px; vertical-align:middle;">
                                               Thank you for booking Unit <b>'.$unitData['unit']['name'].'</b> with Booking ID as <b>'.$bookingId.'</b> for Project " '.$unitData['project_title'].'". We have received your booking amount of <i class="fa fa-inr orangeText"></i> <b>'.$booking_amount.'/-</b>.
                                                <br><br>
                          Use your booking ID number for further processing.
                                            </td>                                            
                                        </tr>
                                    </table>
                                    <!-- // END HEADER -->
                                </td>
                            </tr>
                          <tr>
                              <td align="center" valign="top">
                                  <!-- BEGIN BODY // -->
                                    <table border="0" cellpadding="0" cellspacing="0" width="100%" style=" background-color:#ffffff;">
                                        <tr>
                                        <td valign="top" style="color:#505050; font-family:Arial; font-size:14px; padding:10px 0 0px 20px;">
                                          <table>
                                            <tr>
                                              <td>
                                                The booking details of the unit  is as follows:
                                              </td>
                                            </tr>
                                          </table>
                                        </td>
                                        </tr>
                                        <tr>
                                         <td style="color:#505050; font-family:Arial; font-size:14px; line-height:150%; padding-top:15px; padding-right:20px; padding-bottom:0px; padding-left:20px; text-align:left; background: #ffffff;">
                                          <table border="0" cellpadding="0" cellspacing="0" width="100%" style=" background-color:#ffffff;"> 
                                            <tr>  
                                              <td style="padding: 5px; line-height: 2; border-bottom:1px solid #ccc; border-top:1px solid #ccc; text-transform: uppercase;">
                                                <table border="0" cellpadding="0" cellspacing="0" width="100%">
                                                 
                                                  '.$buildingName.'
                                                  <tr>
                                                    <td>
                                                      BHK type : <span style="font-weight: 600; font-size: 14px; text-transform: uppercase;"> '.$unitData['unit']['unit_type'].' </span>
                                                    </td>
                                                  </tr> 
                                                  <tr>
                                                    <td>
                                                       Price per SQFT : <span style="font-weight: 600; font-size: 14px; text-transform: uppercase;"><i class="fa fa-inr orangeText"></i> '. $unitData['unit']['per_sq_ft_price'].'/- </span>
                                                    </td>
                                                  </tr> 
                                                   <tr>
                                                    <td>
                                                      Booking Date : <span style="font-weight: 600; font-size: 14px; text-transform: uppercase;"> '.$date.' </span>
                                                    </td>
                                                  </tr>                                                 
                                                                                                  
                                                </table>                                                
                                              </td>                                           
                                                
                                                <td style="padding: 5px; line-height: 2; border-bottom:1px solid #ccc; border-top:1px solid #ccc; text-transform: uppercase;">
                                                  <table border="0" cellpadding="0" cellspacing="0" width="100%">                                                 
                                                  '.$floorNo.'
                                                  <tr>
                                                    <td>
                                                      Area : <span style="font-weight: 600; font-size: 14px; text-transform: uppercase;">'.$unitData['unit']['built_up_area'].' SQ FT</span>
                                                    </td>
                                                  </tr>
                                                  <tr>
                                                    <td>
                                                      Total Price : <span style="font-weight: 600; font-size: 14px; text-transform: uppercase;"><i class="fa fa-inr orangeText"></i> '.$totalSaleValue.'/-</span>
                                                    </td>
                                                  </tr>
                                                  <tr>
                                                    <td>
                                                        Booking Amount : 
                                                        <span style="font-weight: 600; font-size: 14px; text-transform: uppercase;"><i class="fa fa-inr orangeText"></i> '.$booking_amount.'/-</span>
                                                      </td>
                                                  </tr>
                                                </table>  
                                                </td>
                                                                                                
                                              </tr>
                                             

                                          </table>
                                          </td>
                                        </tr>
                                        <tr>
                                    <td style="color:#505050; font-family:Arial; background: #ffffff; padding: 0 20px 10px 20px; font-size: 14px; line-height: 1.5;">
                                      <table border="0" cellpadding="0" cellspacing="0" width="100%">
                                        <tr>
                                          <td>
                                            <p>For any queries please mail at '.$unitData['builder_email'].' or feel free to call at our helpline number '.$unitData['builder_phone'].' on all 7 days of week from 7AM TO 11PM.</p>
                                          </td>
                                        </tr>
                                      </table>
                                    </td>
                                  </tr>
                                        <tr>
                                          <td style="color:#505050; font-family:Arial; font-size:14px; line-height:150%; padding:0 20px 20px 20px; text-align:left; background: #ffffff;">
                                          <table border="0" cellpadding="0" cellspacing="0" width="100%" style=" background-color:#ffffff;"> 
                                              <tr>
                                                <td>
                                                  Thanks,
                                                      <br/>
                                                      Team '.$unitData['project_title'].'
                                                      <br/><br/>
                                                </td>
                                              </tr>
                                            </table>
                                          </td>
                                        </tr>
                                        
                                    </table>
                                    <!-- // END BODY -->
                                </td>
                            </tr>
                            <tr>
                              <td style="color:#ffffff; font-family:Arial; font-size:10px; line-height:150%; padding: 0; text-align:left; background: #f68121">
                              &nbsp;
                              </td>
                            </tr>
                          
                        </table>';


      
                          return $html;
    }

    function failureEmailContent($bookingId)
    { 

        $q= "SELECT * FROM `booking_engine_bookings` WHERE `booking_id`= '".$bookingId."'";
        $r= mysql_query($q);
        $row =mysql_fetch_assoc($r);

        $unitId = $row['unit_id'];
        $buyerId = $row['buyer_id'];
        $date = date('d F Y',strtotime($row['booking_date']));

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
 
        $html ='<table  border="0" cellpadding="0" cellspacing="0" style="width:600px; border:1px solid #BBBBBB;">
                          <tr>
                              <td align="center" valign="top">
                                  <!-- BEGIN PREHEADER // -->
                                   
                                    <!-- // END PREHEADER -->
                                </td>
                            </tr>
                          <tr>
                              <td valign="top">
                                  <!-- BEGIN HEADER // -->
                                    <table border="0" cellpadding="10px" cellspacing="0" width="100%" style="background-color:#F4F4F4; border-top:1px solid #FFFFFF; border-bottom:1px solid #CCCCCC;">
                                        <tr>
                                            <td valign="top" style="padding-left: 20px;">
                                              <img style="width:100px" src="'.$unitData['project_image'].'"/>
                                            </td>

                                        </tr>
                                    </table>
                                    <!-- // END HEADER -->
                                </td>
                            </tr>
                            <tr>
                              <td align="center" valign="top">
                                  <!-- BEGIN HEADER // -->
                                    <table border="0" cellpadding="10px" cellspacing="0" width="100%" style="background: #ffffff;">
                                       <tr>
                                        <td style="font-family:Arial; font-size: 14px; padding: 40px 20px 10px;">
                                         <b> Hello '.$buyer_name.',</b>
                                        </td>                                          
                                       </tr>
                                        <tr>
                                            <td valign="top" style="color:#505050; font-family:Arial; font-size:14px; line-height:1.5; padding: 10px 20px 10px 20px; vertical-align:middle;">
                                              We regret to inform you that your payment for <b>'.$unitData['unit']['name'].'</b> with Booking ID as <b>'.$bookingId.'</b> for " '.$unitData['project_title'].'" was unsuccessful. Sorry for the inconvenience. The Unit is available and can be booked by visiting '.UNITSELECTOR_URL.'project/1</a>.
                                            </td>                                            
                                        </tr>
                                    </table>
                                    <!-- // END HEADER -->
                                </td>
                            </tr>
                          <tr>
                              <td align="center" valign="top">
                                  <!-- BEGIN BODY // -->
                                    <table border="0" cellpadding="0" cellspacing="0" width="100%" style="background-color:#ffffff;">
                                        <tr>
                                        <td valign="top" style="color:#505050; font-family:Arial; font-size:14px; padding:0px 0 10px 20px;">
                                          <table>
                                            <tr>
                                              <td>
                                              <br>
                                                Sorry for the inconvenience.
                                                <br>
                                                
                                              </td>
                                            </tr>
                                          </table>
                                        </td>
                                        </tr>
                                        <tr>
                                    <td style="color:#505050; font-family:Arial; background: #ffffff; padding: 0px 20px 10px 20px; font-size: 14px; line-height: 1.5;">
                                      <table border="0" cellpadding="0" cellspacing="0" width="100%">
                                        <tr>
                                          <td>
                                            <p>For any queries please mail at '.$unitData['builder_email'].' or feel free to call at our helpline number '.$unitData['builder_phone'].' on all 7 days of week from 7AM TO 11PM.</p>
                                          </td>
                                        </tr>
                                      </table>
                                    </td>
                                  </tr>
                                        <tr>
                                          <td style="color:#505050; font-family:Arial; font-size:14px; line-height:150%; padding:0 20px 20px 20px; text-align:left; background: #ffffff;">
                                          <table border="0" cellpadding="0" cellspacing="0" width="100%" style="background-color:#ffffff;"> 
                                              <tr>
                                                <td>
                                                  Thanks,
                                                      <br/>
                                                      Team '.$unitData['project_title'].'
                                                      <br/>
                                                      <br/>
                                                </td>
                                              </tr>
                                            </table>
                                          </td>
                                        </tr>
                                        
                                    </table>
                                    <!-- // END BODY -->
                                </td>
                            </tr>

                            

                            <tr>
                              <td style="color:#ffffff; font-family:Arial; font-size:10px; line-height:150%; padding: 0; text-align:left; background: #f68121;">
                                &nbsp;
                              </td>
                            </tr>
                          
                        </table>';


      
                          return $html;
    }

    function cancelEmailContent($bookingId)
    { 

        $q= "SELECT * FROM `booking_engine_bookings` WHERE `booking_id`= '".$bookingId."'";
        $r= mysql_query($q);
        $row =mysql_fetch_assoc($r);

        $unitId = $row['unit_id'];
        $buyerId = $row['buyer_id'];
        $date = date('d F Y',strtotime($row['booking_date']));

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

        $buildingName = '';
        $floorNo = '';

        if(!empty($unitData['building']))
        {
          $buildingName = '<tr>
                            <td>
                              Tower Name : <span style="font-weight: 600; font-size: 14px; text-transform: uppercase;">'.$unitData['building']['name'].'</span>
                            </td>
                          </tr>';
          $floorNo = '<tr>
                        <td>
                          Floor Number : <span style="font-weight: 600; font-size: 14px; text-transform: uppercase;">'.ordinalSuffix($unitData['unit']['floor_number']).' Floor</span>
                        </td>
                      </tr>';
        }

        $html ='<table border="0" cellpadding="0" cellspacing="0" style="width:600px; border:1px solid #BBBBBB;">
                          <tr>
                              <td align="center" valign="top">
                                  <!-- BEGIN PREHEADER // -->
                                   
                                    <!-- // END PREHEADER -->
                                </td>
                            </tr>
                          <tr>
                              <td valign="top">
                                  <!-- BEGIN HEADER // -->
                                    <table border="0" cellpadding="10px" cellspacing="0" width="100%" style=" background-color:#F4F4F4; border-top:1px solid #FFFFFF; border-bottom:1px solid #CCCCCC;">
                                        <tr>
                                            <td valign="top" style="padding-left: 20px;">
                                              <img style="width:100px" src="'.$unitData['project_image'].'"/>
                                            </td>

                                        </tr>
                                    </table>
                                    <!-- // END HEADER -->
                                </td>
                            </tr>
                            <tr>
                              <td align="center" valign="top">
                                  <!-- BEGIN HEADER // -->
                                    <table border="0" cellpadding="10px" cellspacing="0" width="100%" style="background: #ffffff;">
                                       <tr>
                                        <td style="font-family:Arial; font-size: 14px; padding: 40px 20px 10px;">
                                        <b> Hello '.$buyer_name.',</b>
                                        </td>                                          
                                       </tr>
                                        <tr>
                                            <td valign="top" style="color:#505050; font-family:Arial; font-size:14px; line-height:1.5; padding: 10px 20px 10px; vertical-align:middle;">
                                              This is to inform you that your booking for Unit <b>'.$unitData['unit']['name'].'</b> with Booking ID as <b>'.$bookingId.'</b> has been cancelled successfully.
                                            </td>                                            
                                        </tr>
                                    </table>
                                    <!-- // END HEADER -->
                                </td>
                            </tr>
                          <tr>
                              <td align="center" valign="top">
                                  <!-- BEGIN BODY // -->
                                    <table border="0" cellpadding="0" cellspacing="0" width="100%" style="background-color:#ffffff;">
                                        <tr>
                                        <td valign="top" style="color:#505050; font-family:Arial; font-size:14px; padding:10px 0 0px 20px;">
                                          <table>
                                            <tr>
                                              <td>
                                                The details of the Cancelled unit  is as follows:
                                              </td>
                                            </tr>
                                          </table>
                                        </td>
                                        </tr>
                                        <tr>
                                        <td style="color:#505050; font-family:Arial; font-size:14px; line-height:150%; padding-top:15px; padding-right:20px; padding-bottom:0px; padding-left:20px; text-align:left; background: #ffffff;">
                                          <table border="0" cellpadding="0" cellspacing="0" width="100%"> 
                                            <tr>  
                                              <td style="padding: 5px; line-height: 2; border-bottom:1px solid #ccc; border-top:1px solid #ccc; text-transform: uppercase;">
                                                <table border="0" cellpadding="0" cellspacing="0" width="100%">
                                                 
                                                  '.$buildingName.'
                                                  <tr>
                                                    <td>
                                                      BHK type : <span style="font-weight: 600; font-size: 14px; text-transform: uppercase;"> '.$unitData['unit']['unit_type'].' </span>
                                                    </td>
                                                  </tr> 
                                                  <tr>
                                                    <td>
                                                       Price per SQFT : <span style="font-weight: 600; font-size: 14px; text-transform: uppercase;"><i class="fa fa-inr orangeText"></i> '. $unitData['unit']['per_sq_ft_price'].'/- </span>
                                                    </td>
                                                  </tr> 
                                                   <tr>
                                                    <td>
                                                      Booking Date : <span style="font-weight: 600; font-size: 14px; text-transform: uppercase;"> '.$date.' </span>
                                                    </td>
                                                  </tr>                                                 
                                                                                                  
                                                </table>                                                   
                                              </td>                                           
                                                
                                                <td style="padding: 5px; line-height: 2; border-bottom:1px solid #ccc; border-top:1px solid #ccc; text-transform: uppercase;">
                                                  <table border="0" cellpadding="0" cellspacing="0" width="100%">                                                 
                                                  '.$floorNo.'
                                                  <tr>
                                                    <td>
                                                      Area : <span style="font-weight: 600; font-size: 14px; text-transform: uppercase;">'.$unitData['unit']['built_up_area'].' SQ FT</span>
                                                    </td>
                                                  </tr>
                                                  <tr>
                                                    <td>
                                                      Total Price : <span style="font-weight: 600; font-size: 14px; text-transform: uppercase;"><i class="fa fa-inr orangeText"></i> '.$totalSaleValue.'/-</span>
                                                    </td>
                                                  </tr>
                                                  <tr>
                                                    <td>
                                                        Booking Amount : 
                                                        <span style="font-weight: 600; font-size: 14px; text-transform: uppercase;"><i class="fa fa-inr orangeText"></i> '.$booking_amount.'/-</span>
                                                      </td>
                                                  </tr>
                                                </table>  
                                                </td>
                                                                                                
                                              </tr>
                                             

                                          </table>
                                          </td>
                                        </tr>  
                                        <tr>
                                    <td style="color:#505050; font-family:Arial; background: #ffffff; padding: 0 20px 0px 20px; font-size: 14px; line-height: 1.5;">
                                      <table border="0" cellpadding="0" cellspacing="0" width="100%">
                                        <tr>
                                          <td>
                                            <p>Your booking amount of Rs.  '.$booking_amount.' will be refunded in 7 days by NEFT or Cheque. For further details mail us at '.$unitData['builder_email'].' or feel free to call at our helpline number '.$unitData['builder_phone'].' on all 7 days of week from 7AM TO 11PM.</p>
                                          </td>
                                        </tr>
                                      </table>
                                    </td>
                                  </tr>
                                         <tr>
                                          <td style="color:#505050; font-family:Arial; font-size:14px; line-height:150%; padding-top:15px; padding:0 20px 20px 20px; text-align:left; background: #ffffff;">
                                          <table border="0" cellpadding="0" cellspacing="0" width="100%" style="background: #ffffff;"> 
                                              <tr>
                                                <td>
                                                <br/>
                                                  Thanks,
                                                      <br/>
                                                      Team '.$unitData['project_title'].'
                                                      <br/><br/>
                                                </td>
                                              </tr>
                                            </table>
                                          </td>
                                        </tr>                                                                            
                                        
                                  
                                    </table>
                                    <!-- // END BODY -->
                                </td>
                            </tr>

                            

                            <tr>
                              <td style="color:#ffffff; font-family:Arial; font-size:10px; line-height:150%; padding: 0; text-align:left; background: #f68121;">
                                 &nbsp;
                              </td>
                            </tr>
                          
                        </table>';


      
                          return $html;
    }

    function invoiceHtml($bookingId)
    {
        $q= "SELECT * FROM `booking_engine_bookings` WHERE `booking_id`= '".$bookingId."'";
        $r= mysql_query($q);
        $row =mysql_fetch_assoc($r);

        $unitId = $row['unit_id'];
        $buyerId = $row['buyer_id'];
        $date = date('d F Y',strtotime($row['booking_date']));

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
        

        
      $html ='<!DOCTYPE html>
              <html>
              <head>
              <!-- If you delete this meta tag, Half Life 3 will never be released. -->
              <meta name="viewport" content="width=device-width" />

              <meta charset="UTF-8" />
              <title>Invoice</title>

              </head>
               
              <body bgcolor="#FFFFFF" style="margin:0; font-family: \'Arail\', sans-serif;">
              <!-- BODY -->
              <table cellpadding="15" cellspacing="0" width="600px" style="margin:0 auto;">
                <tr>
                  <td>
                    <table cellspacing="0" cellpadding="0" width="600px">
                      <tr>
                        <td style="text-transform: uppercase; font-size: 35px; font-weight: bold; color: #333; text-align: center;">
                          <br>Invoice     
                        </td>
                      </tr>
                    </table>
                  </td>
                </tr>
                <tr>
                  <td>
                    <table cellspacing="5" cellpadding="0" style="border-bottom:1px solid #ccc;">
                      <tr>
                        <td width="300px" style="color:#7d7d7d; font-size:16px;"><img src="'.$unitData['project_image'].'" style="width:100px"/><br>'.$unitData['project_address'].',<br>'.$unitData['city'].'  - '.$unitData['area_code'].'<br><br>Tel : '.$unitData['builder_phone'].'<br>
                        </td>
                        <td align="right" width="320px" valign="middle"> <img src="'.SITE_URL.'public/image/inner-header-logo.png"/></td>
                      </tr>
                    </table>
                  </td>
                </tr>
                <tr>
                  <td>
                    <table width="600px" cellpadding="5" cellspacing="0">
                      <tr>
                        <td style="color: #333; font-weight:bold; font-size: 16px; text-transform: capitalize;">Booking details                          
                        </td>
                      </tr>
                      <tr>
                        <td style="color: #7d7d7d; font-size: 16px; text-transform: capitalize;">Booking Date : '.$date.'</td>
                      </tr>
                      <tr>
                        <td style="font-size: 18px; font-weight: 500; color: #333; text-transform: uppercase;">BOOKING ID : <span style="color:#FE943E">'.$bookingId.'</span>
                        </td>
                      </tr>
                      <tr>                        
                        <td style="font-size: 18px; font-weight: 500; color: #333; text-transform: uppercase;">BOOKING Amount : <span style="color:#FE943E">Rs '.$booking_amount.'</span>
                        </td>
                      </tr>
                    </table>
                  </td>
                </tr>
                <tr>
                  <td>
                    <table width="600px" cellpadding="0" cellspacing="0" style="border-bottom:1px solid #ccc;">
                      <tr>
                        <td>
                          <table width="200px" cellspacing="0" cellpadding="0">
                            <tr>
                              <td style="font-size: 16px; color: #333; text-transform: capitalize; line-height:1.5;">'.$buyer_name.'
                              </td>
                            </tr>
                            <tr>
                              <td style="color: #7d7d7d; font-size: 16px; line-height:1.5;">'.$buyer_email.'
                              </td>
                            </tr>
                            <tr>
                              <td style="color: #7d7d7d; font-size: 16px; line-height:1.5;">'.$buyer_phone.'
                                <br>
                              </td>
                            </tr>
                          </table>
                        </td> 
                        <td>
                          <table width="320px" cellspacing="0" cellpadding="0">
                            <tr>
                              <td style="font-size: 16px; color: #333; text-transform: capitalize; line-height:1.5;">Address
                              </td>
                            </tr>
                            <tr>
                              <td style="color: #7d7d7d; font-size: 16px; line-height:1.5;">'.$buyer_address.','.$buyer_city.' '.$buyer_pincode.'<br>'.$buyer_state.','.$buyer_country.' <br>
                              </td>
                            </tr>
                          </table>
                        </td>
                      </tr>
                    </table>
                  </td>
                </tr>
                <tr>
                  <td>
                    <table  width="600px" cellpadding="0" cellspacing="0" style="border-bottom:1px solid #ccc;">
                     <tr>
                      <td  cellpadding="10" style="font-size: 16px; color: #333; font-weight:bold;"> Unit Details                       
                      </td>
                    </tr>
                      <tr>      
                        <td width="300">
                          <table width="300" cellpadding="10" cellspacing="0" style="border-right:1px solid #ccc;">
                          
                            <tr>
                              <td style="font-size: 14px; width:150px; color: #999; text-transform: capitalize; line-height:1;">Unit No</td>
                              <td style="font-size: 14px; width:150px; color: #FE943E; text-transform: capitalize; line-height:1;">'.$unitData['unit']['name'].'</td>
                              
                            </tr>
                            <tr>
                              <td style="font-size: 14px; width:150px; color: #999; text-transform: capitalize; line-height:1;">Tower</td>
                              <td style="font-size: 14px; width:150px; color: #333; text-transform: capitalize; line-height:1;">'.$unitData['building']['name'].'</td>
                              
                            </tr>
                            <tr>
                              <td style="font-size: 14px; width:150px; color: #999; text-transform: capitalize; line-height:1;">Unit Type</td>
                              <td style="font-size: 14px; width:150px; color: #333; text-transform: capitalize; line-height:1;">'.$unitData['unit']['unit_type'].'</td>
                              
                            </tr>
                            <tr>
                              <td style="font-size: 14px; width:150px; color: #999; text-transform: capitalize; line-height:1;">Floor <br><br></td>
                              <td style="font-size: 14px; width:150px; color: #333; text-transform: capitalize; line-height:1;">'.ordinalSuffix($unitData['unit']['floor_number']).' Floor <br><br></td>
                              
                            </tr>
                          </table>
                        </td>
                        <td width="300">
                          <table width="300" cellspacing="10" cellpadding="0">                            
                            <tr>
                              <td style="font-size: 14px; width:150px; color: #999; text-transform: capitalize; line-height:1;">Built-Up Area</td>
                              <td style="font-size: 14px; width:150px; color: #333; text-transform: capitalize; line-height:1;">'.$unitData['unit']['built_up_area'].' sqft</td>
                            </tr>
                            <tr>
                              <td style="font-size: 14px; width:150px; color: #999; text-transform: capitalize; line-height:1;">Super Built Up</td>
                              <td style="font-size: 14px; width:150px; color: #333; text-transform: capitalize; line-height:1;">'.$unitData['unit']['super_built_up_area'].'  sqft</td>
                            </tr>
                            <tr>
                              <td style="font-size: 14px; width:150px; color: #999; text-transform: capitalize; line-height:1;">Price Per Sqft</td>
                              <td style="font-size: 14px; width:150px; color: #333; text-transform: capitalize; line-height:1;">Rs '.moneyFormatIndia($unitData['unit']['per_sq_ft_price']).'</td>
                            </tr>
                            <tr>
                              <td style="font-size: 14px; width:150px; color: #999; text-transform: capitalize; line-height:1;">Total Value <br><br></td>
                              <td style="font-size: 14px; width:150px; color: #333; text-transform: capitalize; line-height:1;">Rs '.$totalSaleValue.'<br><br></td>
                            </tr>
                          </table>
                        </td>
                      </tr>
                    </table>
                  </td>

                </tr>
                <tr>
                  <td>
                    <table width="600px" cellpadding="0" cellspacing="0">
                      <tr>
                        <td style="color: #999; font-size: 14px;">
                          * Booking can be cancelled within 7 days, Please contact administrator for more details.
                        </td>
                      </tr>
                    </table>
                  </td>
                </tr>
                <tr>
                  <td>
                    <table cellpadding="15" cellspacing="0" width="600px">
                      <tr>
                        <td width="100px" style="border-right:1px solid #ccc;">
                          <img src="'.SITE_URL.'public/image/inner-header-logo.png"/>
                        </td>
                        <td width="500px" style="text-transform: uppercase; line-height:3; font-size: 12px; color: #999;">
                          Copyright &copy; 2007-15 commonfloor.com. All rights reserved.
                        </td>
                      </tr>
                    </table>  
                  </td>
                </tr>
              </table><!-- /BODY -->


              </body>
              </html>';
 
        
        return $html;

    }


?>
