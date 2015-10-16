<?php
require_once '../../includes/include.php';
require_once 'indexController.php'; 
    $unit_id=$_POST['unit_id']; 
    $msg = refund_amount($unit_id);
    echo $msg;
?>