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
        <div class="container-fluid bookFlowContent">
        <div class="absoluteLayout"></div>
            <div class="container">
                
                <div class="successOuter">
                    <div class="successContent col-xs-12 sessionExpireContent text-center">
                          <i class="fa fa-5x fa-exclamation-circle col-xs-12"></i>
                          <h3 class="text-center text-uppercase">Your session is expired</h3>
                          <div class="col-xs-12">Sorry for the inconvinience.</div>
                                                
                          <button class="btn btn-sm btn-default btn-primary">Try again</button>
                           <button class="btn btn-sm btn-default btn-gray">Back to home</button>
                    </div>
                    
                </div>
                <div class="bookingFooter sessionExpireFooter">
                    <a href="#">commonfloor.com</a>
                    <div class="privacyOuter"><a href="#">Commonfloor</a> | <a href="#">FAQ</a> | <a href="#">Mobile Apps © commnfloor inc. </a>| <a href="#">Privacy Policy</a></div>
                </div>
            </div>
        </div>                         

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