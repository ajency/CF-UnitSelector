<?php
require_once '../includes/include.php';
require_once '../application/controller/indexController.php'; 
require_once '../tcpdf/tcpdf.php';

if(!isset($_GET['bookingId']))
{  
    echo 'problrm in loading invoice';
    exit;

}
elseif(isset($_GET['bookingId']) && $_GET['bookingId']=='')
{  
    echo 'problrm in loading invoice';
    exit;

}

 $bookingId = $_GET['bookingId'];
 
 generateInvoice($bookingId , 'I');
