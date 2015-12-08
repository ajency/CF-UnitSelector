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
					<img src="../../images/inner-header-logo.png"/>
				</span>		
				<h3 class="text-center text-uppercase">Privacy policy</h3>

				<div class="mainContent">
					<h6>Last Updated on 1st October, 2014</h6>
					<p>					
						We value the trust you place in maxHeap Technologies Pvt. Ltd. That's why we insist upon the highest standards for secure transactions and customer information privacy. Please read the following statement to learn about our information gathering and dissemination practices. Note: Our privacy policy is subject to change at any time. To make sure you are aware of any changes, please review this policy periodically.
						<br><br>
						<a href="www.commonfloor.com">www.commonfloor.com</a> ("Website") is owned and operated by maxHeap Technologies Pvt. Ltd.; all references to "CommonFloor", "CF", "we", or "us", include maxHeapTechnologoes Pvt. Ltd.						
					</p>
					<h5>1. Creation of Account</h5>										
					<p>						
						<ul>
							<li>
								To access and use some sections on the Website that are restricted only to registered users, you need to create an account on the Website.
							</li>
							<br>
							<li>
								To create an account we need your email address, which could then be used to login to the Website.
							</li>
							<br>
							<li>
								You have to accept the terms of Use before creating an account on Website.
							</li>
							<br>
							<li>
								You are solely liable for maintaining the confidentiality of the user account details.
							</li>
						</ul>										
					</p>
					<h5>2. Invitations to join CommonFloor.com</h5>										
					<p>						
						<ul>
							<li>
								Email addresses to which invitation(s) are sent, are stored in the system for logging purposes.
							</li>
							<br>
							<li>
								We may use these email addresses to send periodic notifications about the service. Receivers can opt out and will never be sent any email from Website
							</li>
						</ul>										
					</p>
					<h5>3. Personal information/Other Information You May Provide</h5>										
					<p>						
						<ul>
							<li>
								We ask for some personal information when you create a CommonFloor account, including your email address and a password, which is used to protect your account from unauthorized access.
							</li>
							<br>
							<li>
								To provide you with access to the appropriate Network, we will require you to provide the name and contact information described above, and may also request that you update or verify this information from time to time. By using the Site, you agree to provide accurate information, and to cooperate with any CommonFloor personnel/Your Apartment Management Committee to ensure accuracy.
							</li>
							<br>
							<li>
								As CommonFloor user, you can create a profile that includes personal information, such as your gender, age, occupation, hobbies, and interests, plus other content, such as photos. This information may be accessed and viewed by other members belonging to your private communities, as determined by your privacy settings.The privacy settings of account may altered as deemed fit by you. You can access the privacy settings at <a href="#">https://www.commonfloor.com/privacy-policy</a>	.
							</li>
							<br>
							<li>
								The Website contains optional profile information, ratings and Other than the Personal Information you provide, you may choose to submit information through any of these tools. .
							</li>
							<br>
							<li>
								When you send messages through CommonFloor, we collect and maintain information associated with those messages, including email addresses and content.
							</li>
							<br>
							<li>
								When you send and receive SMS messages to or from the CommonFloor website, we collect and maintain information associated with those messages, such as the phone number, the wireless carrier associated with the phone number, the content of the message, and the date and time of the transaction, for logging purposes.
							</li>
						</ul>										
					</p>
					<h5>4. HOW WE USE YOUR PERSONAL INFORMATION/OTHER INFORMATION</h5>										
					<p>						
						<ul>
							<li>
								We take the privacy of our users very seriously.
							</li>
							<br>
							<li>
								We use the information provided by you on the Website to provide our services.
							</li>
							<br>
							<li>
								We will never sell, rent, or share your personally identifiable information to any third parties for marketing purposes. CF will have a right to use this information for its business purposes by itself or with its business associates.
							</li>
							<br>
							<li>
								CF will have a right to use the information to provide personalised advertisements and offers, or to include that information in compilations developed by CF, or to develop derivative works based on that information.
							</li>
							<br>
							<li>
								You agree that CF may use personal information about you to improve its marketing and promotional efforts, to analyze site usage, improve the Site's content and product offerings and for its business purposes.
							</li>
							<br>
							<li>
								CF may be required from time to time to disclose users' personal information to Governmental or law enforcing agencies or our regulators.
							</li>
							<br>
							<li>
								We may also disclose personal information to enforce our policies, respond to claims that a posting or other content violates other's rights, or protects anyone's rights, property or safety.
							</li>
							<br>
							<li>
								Do other things for users as described when we collect the information.
							</li>
						</ul>										
					</p>
					<h5>5. COLLECTION OF INFORMATION BY THIRD PARTY SITES</h5>										
					<p>						
						<ul>
							<li>
								The Website may contain links to other sites whose information practices may be different than ours. You should consult the other sites' privacy notices as we have no control over information that is submitted to, or collected by, these third parties.
							</li>							
						</ul>										
					</p>
					<h5>6. INFORMATION POSTED ON THE WEBSITE</h5>										
					<p>						
						<ul>
							<li>
								You shall not submit, upload or post to our forums any content which (1) libels, defames, invades privacy of any person, or is obscene, pornographic, abusive, or threatening; (2) infringes any intellectual property or other right of any person or entity, including but not limited to, violating anyone's copyrights or trademarks; (3) falsifies or deletes author attributions, legal notices or other proprietary designations; (4) violates any law; (5) advocates illegal activity; (6) contains viruses, corrupted files, or other materials that may cause damage to another's computer. By posting any content on our forums, you automatically agree to indemnify CF from and against any and all third party claims, demands, liabilities, costs or expenses, including reasonable attorneys' fees, resulting from your breach of these posting restrictions.
							</li>	
							<br>				
							<li>
								By posting any content in the Website, you automatically grant to CF a perpetual, royalty-free, irrevocable and unrestricted worldwide right and license to use, reproduce, modify, adapt, publish, translate, create derivative works from and distribute the posted content or incorporate the posted content into any form, medium, or technology now known or later developed for any purpose, including advertising and promotion, and you automatically waive all "moral rights" with respect to the posted content.
							</li>		
						</ul>										
					</p>
					<h5>7. General Provisions</h5>										
					<p>						
						<ul>
							<li>
								By agreeing to post a property listing or requirement at the Website or responding to and advertising on commonfloor.com or by using the services of Website, the user hereby acknowledges and allows Website, its partners and other users of the Website to get in touch with him/her from time to time for intimating the users on events, potential buyers, tenants or properties they might be interested in. Website can use the user's email address and/or contact numbers for this purpose irrespective of the user's registration with the "National Do Not Call Registry" and will override any such registrations.
							</li>	
							<br>				
							<li>
								CF may track the IP address of your computer and save certain information on your system in the form of cookies. You have the option of accepting or declining the cookies of this Website by changing the settings of your browser.
							</li>		
						</ul>										
					</p>
					<h5>8. E-mails and Opt-out</h5>										
					<p>						
						<ul>
							<li>
								You may opt-out of receiving notifications from us by changing your notification settings under the "Settings" tab after you log on to Website. Unregistered users who receive e-mails from us may also opt-out of receiving further e-mails by following the instructions contained in our e-mails.
							</li>												
						</ul>										
					</p>
					<h5>9. Security</h5>										
					<p>						
						<ul>
							<li>
								Your account is password protected. We use industry standard measures to protect the personal information that is stored in our database. We limit the access to your personal information to those employees and contractors who need access to perform their job function, such as our customer service personnel. If you have any questions about the security on Website, please contact us. Although we take appropriate measures to safeguard against unauthorized disclosures of information, we cannot assure you that your personal information will never be disclosed in a manner that is inconsistent with this Privacy Policy.
							</li>	
							<br>	
							<li>
								You hereby acknowledge that Website is not responsible for any intercepted information sent via the internet, and you hereby release us from any and all claims arising out of or related to the use of intercepted information in any unauthorized manner.
							</li>	
							<br>
							<li>
								Website will not be responsible for any loss of data / information resulting due to unauthorizedaccess to Website's servers.
							</li>									
						</ul>										
					</p>
					<h5>10. Contacting us</h5>										
					<p>
						You can email us on <a href="mailto:contactus@commonfloor.com">contactus@commonfloor.com</a> or <a href="mailto:support@commonfloor.com">support@commonfloor.com</a>						
						<ul>
							<li>
								Our office address maxHeap Technologies Pvt Ltd, 7th Floor, Tower B, Diamond District, No. 150, Old Airport Road, Kodihalli Bangalore 560008.
							</li>												
						</ul>										
					</p>

				</div>

				<div class="bookingFooter">
                   Call <?php echo $unitData['builder_phone']?>
                     <div class="privacyOuter"><a href="https://www.commonfloor.com/">Commonfloor</a> | <a  target="_blank" href="faq.php">FAQ</a> | <a href="https://play.google.com/store/apps/details?id=com.commonfloor&hl=en">Mobile Apps © commonfloor inc. </a>| <a target="_blank" href="privacy.php">Privacy Policy</a></div>
                 </div>
			</div>
		</div>
 


	</body>
</html>