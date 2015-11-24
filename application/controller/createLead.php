<?php
require_once '../../includes/include.php';
require 'class.phpmailer.php';
require_once 'indexController.php'; 
  
  	$data = $_POST;
    $msg = addLead($data);

    echo $msg;
?>