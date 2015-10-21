<?php
session_start();
include('constants.php');
$servername = HOST;
$username = DBUSER;  
$password = PASSWORD;  
$dbname = DATABASE;  


//connection to the database
$dbhandle = mysql_connect($servername, $username, $password) 
 or die("Unable to connect to MySQL");

//select a database to work with
$selected = mysql_select_db($dbname,$dbhandle) 
  or die("Could not select examples");

?>