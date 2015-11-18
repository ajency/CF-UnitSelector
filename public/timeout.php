<?php
require_once '../includes/include.php';
require_once '../application/controller/indexController.php'; 

$unitId = $_SESSION['unitId'];
$unitinfo =  json_decode(getUnitInfo($unitId),true); 

$unitData =$unitinfo['data'] ;
$projectId = $unitData['project_id'];

$backlink = UNITSELECTOR_URL.'project/'.$projectId.'#/units/'.$unitId;
$backhomelink = UNITSELECTOR_URL.'project/'.$projectId;

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
                                                
                          <a href="<?php echo $backlink;?>"><button class="btn btn-sm btn-default btn-primary">Try again</button></a>
                          <a href="<?php echo $backhomelink;?>"><button class="btn btn-sm btn-default btn-primary">Back to home</button></a>
                    </div>
                    
                </div>
                <div class="bookingFooter sessionExpireFooter">
                     Call <?php echo $unitData['builder_phone']?>
                     <div class="privacyOuter"><a href="https://www.commonfloor.com/">Commonfloor</a> | <a href="#">FAQ</a> | <a href="https://play.google.com/store/apps/details?id=com.commonfloor&hl=en">Mobile Apps © commonfloor inc. </a>| <a href="https://www.commonfloor.com/privacy-policy">Privacy Policy</a></div>
                </div>
            </div>
        </div>                         

        <script src="js/jquery.min.js"></script>
    <!-- Include all compiled plugins (below), or include individual files as needed -->
    <script src="js/bootstrap.min.js"></script>
    <script src="js/jquery.panzoom.js"></script>
    <script type="text/javascript">
            // //$('.collapse').collapse()
            // $( document ).ready(function() {    
            //    window.onbeforeunload = function() {
             
            //         var confirm = confirm("Would you like to stay on the page?");
            //         return "This session is expired and the history altered.";
            //     }

            // });

        </script>   
<script type="text/javascript">
 
    jQuery(document).ready(function($) {

      if (window.history && window.history.pushState) {

        $(window).on('popstate', function() {
          var hashLocation = location.hash;
          var hashSplit = hashLocation.split("#!/");
          var hashName = hashSplit[1];

          if (hashName !== '') {
            var hash = window.location.hash;
            if (hash === '') {
              alert('This session is expired and the history altered.');
                window.location='<?php echo $backlink;?>';
                return false;
            }
          }
        });

        window.history.pushState('timeout', null, './#timeout');
      }

    });
</script>
    </body>
</html>