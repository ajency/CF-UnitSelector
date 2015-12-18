<?php
require_once '../includes/include.php';
require_once '../application/controller/indexController.php'; 

$buyer_name = $_SESSION['buyer_name'];
$buyer_email = $_SESSION['buyer_email'];
$buyer_phone = $_SESSION['buyer_phone'];
$unitId = $_SESSION['unitId'];
$unitinfo =  json_decode(getUnitInfo($unitId),true); 
$unitData =$unitinfo['data'] ;
$booking_amount=getBookingAmount($unitId,"booking_amount"); 
$totalSaleValue=getBookingAmount($unitId,"sale_value");
$bookingId = $_SESSION['booking_id'];
//unset($_SESSION);

$projectId = $unitData['project_id'];

$backlink = UNITSELECTOR_URL.'project/'.$projectId;
?>
<!doctype html>
<html>
	<head>
    <meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
      <meta name='viewport' content='width=device-width, initial-scale=1.0, maximum-scale=1.0'/>
    <!-- The above 3 meta tags *must* come first in the head; any other head content must come *after* these tags -->
    <title>CF-MOBILE</title>

    <link href='css/faqTermsPrivacy.css' rel='stylesheet'/>
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

	<body>		
		<div class="container-fluid faqTermsPrivacyOuter">
		<div class="absoluteLayout"></div>
			<div class="container">
				<span class="logo text-center">
					<img src="image/inner-header-logo.png"/>
					<br>
					<span class="logoText">commonfloor.com</span>
				</span>
				<h3 class="text-center text-uppercase">Faq</h3>
				
				<div class="">
				<div class="panel-group col-md-12 col-sm-12 col-xs-12" id="accordion" role="tablist" aria-multiselectable="true">
				  <div class="panel-inner">
				  <div class="panel panel-default">
				    <div class="panel-heading" role="tab" id="headingOne">
				      <h4 class="panel-title">
				        <a class="collapsed plusMinusOuter" role="button" data-toggle="collapse" data-parent="#accordion" href="#collapseOne" aria-expanded="false" aria-controls="collapseOne">
				          1. Question
				          <span class="plusMinusIcon plusIcon"><i class="fa fa-plus-square-o"></i></span>
				          <span class="plusMinusIcon minusIcon"><i class="fa fa-minus-square-o"></i></span>
				        </a>
				      </h4>
				    </div>
				    <div id="collapseOne" class="panel-collapse collapse" role="tabpanel" aria-labelledby="headingThree">
				      <div class="panel-body">					      				       
				        <div class="col-md-12 col-sm-12 col-xs-12 personalDetails">
				        	<p>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.</p>
				        </div>
				      </div>
				    </div>
				  </div>
				  
				  <div class="panel panel-default">
				    <div class="panel-heading" role="tab" id="headingTwo">
				      <h4 class="panel-title">
				        <a class="collapsed plusMinusOuter" role="button" data-toggle="collapse" data-parent="#accordion" href="#collapseTwo" aria-expanded="false" aria-controls="collapseTwo">
				          2. Question
				          <span class="plusMinusIcon plusIcon"><i class="fa fa-plus-square-o"></i></span>
				          <span class="plusMinusIcon minusIcon"><i class="fa fa-minus-square-o"></i></span>
				        </a>
				      </h4>
				    </div>
				    <div id="collapseTwo" class="panel-collapse collapse" role="tabpanel" aria-labelledby="headingTwo">
				      <div class="panel-body">
				      	<div class="col-md-12 col-sm-12 col-xs-12 personalDetails">
				        	<p>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.</p>
				        </div>
				      </div>
				    </div>
				  </div>				
				  <div class="panel panel-default">
				    <div class="panel-heading" role="tab" id="headingThree">
				      <h4 class="panel-title">
				        <a class="collapsed plusMinusOuter" role="button" data-toggle="collapse" data-parent="#accordion" href="#collapseThree" aria-expanded="false" aria-controls="collapseThree">
				          3. Question
				          <span class="plusMinusIcon plusIcon"><i class="fa fa-plus-square-o"></i></span>
				          <span class="plusMinusIcon minusIcon"><i class="fa fa-minus-square-o"></i></span>
				        </a>
				      </h4>
				    </div>
				    <div id="collapseThree" class="panel-collapse collapse" role="tabpanel" aria-labelledby="headingThree">
				      <div class="panel-body">
				        <div class="col-md-12 col-sm-12 col-xs-12 personalDetails">
				        	<p>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.</p>
				        </div>
				      </div>
				    </div>
				  </div>
				  <div class="panel panel-default">
				    <div class="panel-heading" role="tab" id="headingFour">
				      <h4 class="panel-title">
				        <a class="collapsed plusMinusOuter" role="button" data-toggle="collapse" data-parent="#accordion" href="#collapseFour" aria-expanded="false" aria-controls="collapseFour">
				          4. Question
				          <span class="plusMinusIcon plusIcon"><i class="fa fa-plus-square-o"></i></span>
				          <span class="plusMinusIcon minusIcon"><i class="fa fa-minus-square-o"></i></span>
				        </a>
				      </h4>
				    </div>
				    <div id="collapseFour" class="panel-collapse collapse" role="tabpanel" aria-labelledby="headingFour">
				      <div class="panel-body">
				        <div class="col-md-12 col-sm-12 col-xs-12 personalDetails">
				        	<p>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.</p>
				        </div>
				      </div>
				    </div>
				  </div>
				  <div class="panel panel-default">
				    <div class="panel-heading" role="tab" id="headingFive">
				      <h4 class="panel-title">
				        <a class="collapsed plusMinusOuter" role="button" data-toggle="collapse" data-parent="#accordion" href="#collapseFive" aria-expanded="false" aria-controls="collapseFive">
				          5. Question
				          <span class="plusMinusIcon plusIcon"><i class="fa fa-plus-square-o"></i></span>
				          <span class="plusMinusIcon minusIcon"><i class="fa fa-minus-square-o"></i></span>
				        </a>
				      </h4>
				    </div>
				    <div id="collapseFive" class="panel-collapse collapse" role="tabpanel" aria-labelledby="headingFive">
				      <div class="panel-body">
				        <div class="col-md-12 col-sm-12 col-xs-12 personalDetails">
				        	<p>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.</p>
				        </div>
				      </div>
				    </div>
				  </div>
				  <div class="panel panel-default">
				    <div class="panel-heading" role="tab" id="headingSix">
				      <h4 class="panel-title">
				        <a class="collapsed plusMinusOuter" role="button" data-toggle="collapse" data-parent="#accordion" href="#collapseSix" aria-expanded="false" aria-controls="collapseSix">
				          6. Question
				          <span class="plusMinusIcon plusIcon"><i class="fa fa-plus-square-o"></i></span>
				          <span class="plusMinusIcon minusIcon"><i class="fa fa-minus-square-o"></i></span>
				        </a>
				      </h4>
				    </div>
				    <div id="collapseSix" class="panel-collapse collapse" role="tabpanel" aria-labelledby="headingSix">
				      <div class="panel-body">
				        <div class="col-md-12 col-sm-12 col-xs-12 personalDetails">
				        	<p>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.</p>
				        </div>
				      </div>
				    </div>
				  </div>
				  <div class="panel panel-default">
				    <div class="panel-heading" role="tab" id="headingSeven">
				      <h4 class="panel-title">
				        <a class="collapsed plusMinusOuter" role="button" data-toggle="collapse" data-parent="#accordion" href="#collapseSeven" aria-expanded="false" aria-controls="collapseSeven">
				          7. Question
				          <span class="plusMinusIcon plusIcon"><i class="fa fa-plus-square-o"></i></span>
				          <span class="plusMinusIcon minusIcon"><i class="fa fa-minus-square-o"></i></span>
				        </a>
				      </h4>
				    </div>
				    <div id="collapseSeven" class="panel-collapse collapse" role="tabpanel" aria-labelledby="headingSeven">
				      <div class="panel-body">
				        <div class="col-md-12 col-sm-12 col-xs-12 personalDetails">
				        	<p>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.</p>
				        </div>
				      </div>
				    </div>
				  </div>
				  <div class="panel panel-default">
				    <div class="panel-heading" role="tab" id="headingEight">
				      <h4 class="panel-title">
				        <a class="collapsed plusMinusOuter" role="button" data-toggle="collapse" data-parent="#accordion" href="#collapseEight" aria-expanded="false" aria-controls="collapseEight">
				          8. Question
				          <span class="plusMinusIcon plusIcon"><i class="fa fa-plus-square-o"></i></span>
				          <span class="plusMinusIcon minusIcon"><i class="fa fa-minus-square-o"></i></span>
				        </a>
				      </h4>
				    </div>
				    <div id="collapseEight" class="panel-collapse collapse" role="tabpanel" aria-labelledby="headingEight">
				      <div class="panel-body">
				        <div class="col-md-12 col-sm-12 col-xs-12 personalDetails">
				        	<p>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.</p>
				        </div>
				      </div>
				    </div>
				  </div>
				  </div>				  
				</div>
				
				</div>
				
			</div>
			<div class="bookingFooter">
                   Call <?php echo $unitData['builder_phone']?>
                     <div class="privacyOuter"><a href="https://www.commonfloor.com/">Commonfloor</a> | <a  target="_blank" href="faq.php">FAQ</a> | <a href="https://play.google.com/store/apps/details?id=com.commonfloor&hl=en">Mobile Apps © commonfloor inc. </a>| <a target="_blank" href="privacy.php">Privacy Policy</a></div>
                 </div>
		</div>
	
		 <script src="js/jquery.min.js"></script>
 
   
    <!-- Include all compiled plugins (below), or include individual files as needed -->
    <script src="js/bootstrap.min.js"></script>
    <script src="js/jquery.panzoom.js"></script>
    <script src="js/parsleyjs/dist/parsley.js" type="text/javascript"></script>
		<script type="text/javascript">
			//$('.collapse').collapse()
			$( document ).ready(function() {			
			    $('#accordion .panel-heading').click(function () {
				    if (!$(this).hasClass('active'))
				    {
				      // the element clicked was not active, but now is - 
				      $('.panel-heading').removeClass('active');
				      $(this).addClass('active'); 
				      $('.panel-collapse').removeClass('in');
				      $('.plusMinusOuter').addClass('collapsed');
				    }				    
				});
					  
			});
		</script>

	</body>
</html>