<?php
session_start();
unset($_SESSION);
?>
<!doctype html>
<html>
    <head>
    <meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
      <meta name='viewport' content='width=device-width, initial-scale=1.0, maximum-scale=1.0'/>
    <!-- The above 3 meta tags *must* come first in the head; any other head content must come *after* these tags -->
    <title>CF-MOBILE</title>

    <link href='css/bookflow.css' rel='stylesheet'/>
    <link href='css/font-awesome.css' rel='stylesheet'/>

    <link rel="stylesheet" href="http://cdnjs.cloudflare.com/ajax/libs/github-fork-ribbon-css/0.1.1/gh-fork-ribbon.min.css" />
    <link rel="stylesheet" type="text/css" href="http://cdn.jsdelivr.net/jquery.slick/1.5.7/slick.css"/>
    <!-- Bootstrap -->
    <link href="css/bootstrap.min.css" rel="stylesheet">

    <!-- HTML5 shim and Respond.js for IE8 support of HTML5 elements and media queries -->
    <!-- WARNING: Respond.js doesn't work if you view the page via file:// -->
    <!--[if lt IE 9]>
      <script src="https://oss.maxcdn.com/html5shiv/3.7.2/html5shiv.min.js"></script>
      <script src="https://oss.maxcdn.com/respond/1.4.2/respond.min.js"></script>
    <![endif]-->
  </head>

    <body class="bookingFlow">
        <div class="container-fluid header mB25">
            <div class="container">
                <h3 class="text-center mT10 mB10">Apply for an Appartment</h3>
            </div>
        </div>
        
        <div class="container-fluid content">
            <div class="container">
                
                <div class="timeoutOuter">
                <i class="fa fa-2x fa-exclamation"></i>                                 
                    <span class="failureMsg">Session has expired</span>
                    <span class="transactionFailed mT20 col-xs-12"> Your Session has timed out because of inactivity.</span>                        
                    <button class="tryAgain text-uppercase">Try Again</button>

                </div>
                
            </div>
        </div>   
        <script src="js/jquery.min.js"></script>
           

        <script src="js/jquery.min.js"></script>
    <!-- Include all compiled plugins (below), or include individual files as needed -->
    <script src="js/bootstrap.min.js"></script>
    <script src="js/jquery.panzoom.js"></script> 
    <script type="text/javascript">
            //$('.collapse').collapse()
            $( document ).ready(function() {    
               window.onbeforeunload = function() {
                    window.setTimeout(function () { // escape function context
                        window.location = 'unit.php';
                    }, 0);
                    window.onbeforeunload = null;   // necessary to prevent infinite loop
                    return "This session is expired and the history altered.";
                }

            });

        </script>          
    </body>
</html>