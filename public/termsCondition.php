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
				</span>		
				<h3 class="text-center text-uppercase">Terms and conditions</h3>

				<div class="mainContent">
					<h6>Last Updated on 1st October, 2014</h6>
					<p>					
						In terms of Information Technology Act, 2000, this document is an electronic record. Being generated by a computer system it does not require any physical or digital signature. This document is published in accordance with the provisions of Rule 3 (1) of the Information Technology (Intermediaries guidelines) Rules, 2011 that require publishing the rules and regulations, privacy policy and Terms of Use for access or usage of the website Commonfloor.com
						<br><br>
						The domain name <strong>Commonfloor.com</strong> (hereinafter referred to as "Website") is owned by maxHeap Technologies Private Limited, registered under the Company's Act,1956 (hereinafter referred to as "Company" or "CommonFloor" or "Commonfloor" or "commonfloor" #298,299 SGR Towers, 7th Cross, Domlur, Bangalore-560071
						<br><br>
						For the purpose of these Terms of Use, wherever the context so requires <strong>"You"</strong> or <strong>"User"</strong> shall mean any legitimate person who is viewing/browsing the Website and/or has agreed to avail the Services provided through the Website by providing the required information while registering on the Website. The term "We", "Us", "Our", "Common Floor", "CF" used in these Terms shall mean maxHeap Technologies India Private Limited.
					</p>
					<h5 class="text-uppercase">1. ACCEPTANCE TO TERMS OF USE</h5>
					<p>
						The use of this Website by You is solely governed by these Terms of Use ("Terms" or "Terms of Use") and any policy/terms so mentioned by terms of reference. Browsing the Website or use of the services offered through the Website shall be taken to mean that You have read and agreed to Terms of Use so binding in You and that You are contracting with CommonFloor and have undertaken binding obligations with CommonFloor. By impliedly or expressly accepting these Terms of Use, You also accept and agree to be bound by Privacy Policy available at /privacy-policy, which may be amended from time to time.
						<br><br>
						You will be subject to the rules, guidelines, policies, terms, and conditions applicable to any service that is provided by this Website, and they shall be deemed to be incorporated into this Terms of Use and shall be considered as part of Terms of Use.
					</p>
					<h5 class="text-uppercase">2. AMENDMENT/MODIFICATION OF TERMS/SERVICES</h5>
					<p>
						We hold the sole right to modify the Terms of Use without prior permission from You or informing You. The relationship creates on You, a duty to periodically check these Terms and stay updated on its requirements. If You continue to browse/use the Website following such a change, this is deemed as consent by You to the so amended policies.
						<br><br>
						CommonFloor, reserves its right to withdraw wholly or partly, without assigning any reason, any of Services offered through the Website with or without any notice.
					</p>
					<h5 class="text-uppercase">3. SCOPE OF SERVICES</h5>
					<p>
						MaxHeap offers an array of online services including but not limited to listing of properties on the website for sale, lease, purchase, creating a network for an apartment complex/building whereby. You can interact with your neighbours, apartment complex accounting, registration of society, posting classified advertisements, services offered by various third party vendors ("Services"). The services offered by CommonFloor / third party vendors may be availed by both individuals and organizations such as builders or brokers. You are permitted to post your requirements / advertisements on our website as long as such posting is genuine and is in accordance with the Terms. Further, with your consent, You may authorize any person, including CommonFloor, to carry out the postings on your behalf and such postings shall also be in accordance with the Terms. You shall be solely liable for any posting done by you or by any person on your behalf or with your consent.
					</p>
					<h5 class="text-uppercase">4. REGISTRATION OBLIGATION AND MEMBERSHIP</h5>
					<p>
						In order to avail the various services offered by us, you are required to register with CommonFloor. If you represent an organization and wish to use the Services for your organization, we recommend that You, and all other users from your organization, sign up for user accounts by providing your corporate contact information. The membership of this website is available only to those above the age of 18 barring those Incompetent to Contract™ which inter alias include insolvents and the same is not allowed to minors as described by the Indian Contract Act, 1872. If you are a minor and wish to browse/use the Website, you may do so through your legal guardian and CommonFloor reserves the right to terminate your account on knowledge of You being a minor and using the membership of the Website.
						<br><br>
						Further, you are solely responsible for protecting the confidentiality of your username and password and any activity under the account will be deemed to have been done by you. You agree to: a) provide true, accurate, current and complete information about yourself as prompted by the sign up process; and b) maintain and promptly update the information provided during sign up to keep it true, accurate, current, and complete. In the event you provide us with false and inaccurate details or Common Floor has a valid reason to believe that false and inaccurate information has been furnished, we hold the rights to permanently suspend your account and levy penalty (esp. for brokers who list as owners or builders providing fake info).
					</p>
					<h5 class="text-uppercase">5. PAYMENT OBLIGATION</h5>
					<p>
						The charges/fees for the various Services offered by CommonFloor have been clearly set forth in the Website. There are both paid services and free services offered thorough the Website. The details of the Services that are offered without charges and with charges are clearly set out in Website or You may communicate with us at <a href="#">contactus@commonfloor.com</a> to get more information.You understand that the Services offered without any charges are restricted (as per the information you may have obtained from CF or as may be seen while availing the said Services). Hence You may be required to pay the amounts, communicated by us or set forth in the Website, if you wish to avail any Services other than the free Services offered. CommonFloor reserves the right to alter/modify the amounts payable for the Services without any prior notice. The details of cancellation and refund is provided in <a href="#">/public-pages/cancellation-and-refund</a>. There will be no refund of any amounts paid by you for availing the various Services offered through the Website, except expressly stated else where CommonFloor may offer certain discounts or other offers for the various Services. The terms and conditions of the offers/discounts shall be clearly set forth in the Website and the same may be time bound and hence you may not claim any offers/discounts when the time for the same has lapsed/expired. There are specific services which are offered directly by third party vendors and the role of CF in such cases is only to post the availability of such services on our website. CF will not be liable or responsible in any way for such services or the quality of such services. Any payments being made by Users do not accrue to CF and CF will not entertain any requests for information / clarification regarding such Services.
					</p>
					<h5 class="text-uppercase">6. TERMS AND CONDITIONS FOR AVAILING THE SERVICES - WITHIN APARTMENT COMPLEX</h5>
					<p>
						The array of services offered by CommonFloor includes Service rendered to residents within a building/apartment complex ("Residents") to interact with their neighbors and share their knowledge of the neighborhood. Subject to the provisions below, and to the terms of any agreement we may have with your building's owners or management or association, the following elements of the Service are available to Residents:

					</p>
					<div class="innerContent">
						<h5>a) Network Access:</h5>
						<p>
							As part of the Service, CommonFloor creates a unique Network for each building/apartment complex. If you are a Resident of a building, we will permit you to access the entire Network for that building by using a username and password. Initially, CommonFloor will provide you with an activation code in a postcard or other mailing sent to your apartment complex/building or, in certain participating buildings, provided by your building's management or Residents. Otherwise, you may request an activation code from contactus@commonfloor.com.
							<br><br>
							Please note that only one username and password should be created per user/Resident. Username is the email id provided by the Resident. You can invite other Residents living in your unit or any of your neighbour by clicking on "Invite Neighbours" by providing email ids or house reserve the right to verify this information before enabling an additional account.
						</p>
						<h5>b) Registration Information:</h5>
						<p>
							When you submit your activation code to register, we will require you to provide your house details, name, e-mail address, and a password of your choosing. As mentioned above, your e-mail address will be used as your username for login purposes. Similarly, if you wish to create an account for other Residents living in your unit, you must provide their name and e-mail addresses. We will send an invitation to the email id provided by you, subject to verification of the invited Resident by us. This information will be subject to the terms of our Privacy Policy.
							<br><br>
							Any registration information you provide must be true, accurate, current and complete, except that you may provide a preferred nickname when prompted for your first name. Please note that this nickname or first name will be displayed on your profile page and with any messages, reviews, comments or listings that you send or post through the Network.
							<br><br>
							Please also note that we may, but are not obligated to, use the information you provide to verify that you are actually a resident of your Network's building, and that we may forward this information to building management.
						</p>
						<h5>c) Profile Information:</h5>
						<p>
							You may also provide profile information such as your occupation, hometown, status, hobbies,photo, etc. You may update, or add this profile information via the "Profile" page. All of this information will also be subject to the terms of our Privacy Policy.
							<br><br>
							Your CF profile may not include any of the following content: telephone numbers (except where asked), any photographs containing nudity, profanity, or obscene, lewd, excessively violent, harassing, sexually explicit or otherwise objectionable subject matter. Despite this prohibition, it is possible that information provided by other CF tenants (for instance, in their Profile) may contain inaccurate, inappropriate, offensive or sexually explicit material, products or services in violation of these Terms of Use. Neither CommonFloor nor the residents or owners or management or association of your building assume any responsibility or liability for this material. We encourage you, however, to help us keep your Network clean by contacting us if you notice any misuse of the Service. We reserve the right to remove any such inappropriate content posted in your Network without any notice to you.
						</p>
						<h5>d) Notices; Messages; Community Forums:</h5>
						<p>
							The Website contains notice board where you may post notices for other Residents to see. Please note that, if you post a notice, the first name or nickname that you have provided will be displayed with that notice.
							<br><br>
							Although we reserve the right to verify your information, we do not assume any obligation to do so. We cannot, and do not, guarantee that each person who claims to be a resident of your building actually is a resident of your building.
							<br><br>
							We are not obligated to pre-screen or monitor any messages or bulletin boards or notice board or advertisement, but do reserve the right to do so, and to remove any message from the Website in our discretion. We may also forward offensive or unlawful content to law enforcement authorities or to your building's management or owners. In the event of any claim on CommonFloor on account of any messages posted by you, CommonFloor will not be liable for the same and You shall indemnify CF in this regard.
						</p>
					</div>
					<h5 class="text-uppercase">7. TERMS AND CONDITIONS - OTHER SERVICES</h5>
					<div class="innerContent">						
						<h5>a) Local Info:</h5>
						<p>
							The Website contains Local Info section which will allow you to access, rate, review, and recommend restaurants and other businesses in your locality or neighbourhood. The information on these pages may be provided by a third party or submitted by individual Residents. You agree that any information that you provide on these sections will be true and accurate, and that you shall not defame, slander or libel any person or establishment.
							<br><br>
							CF cannot and does not guarantee the accuracy, integrity or quality of any content submitted by individual users or provided by third party. In addition, your interactions with businesses found on or through the Service, including payment and delivery of goods or services (including any food orders), and any other terms, conditions, warranties or representations associated with such dealings, are solely between you and those businesses. In no event shall CF or your building or management be liable for any damages arising out of any interaction between you and such parties.
						</p>
						<h5>b) Market Place:</h5>
						<p>
							Market Place lets you offer goods and services such as posting of properties for sale, new properties being developed in any area, etc. to one another, or post wanted ads. Please keep in mind that the Market Place is only a venue for you to place or respond to classified listings. CommonFloor hereby reserves the right to set the limit on the number of responses for a free user. CommonFloor does not take responsibility for the content on the website and You are required to exercise independent judgment before acting upon any content set out in the Website. You may not list or sell any item in the Market Place or otherwise through our Service which: (a) infringes any third party's copyright, patent, trademark, trade secret or other proprietary rights or rights of publicity or privacy; (b) otherwise causes a legally-recognized harm (such as a product that contains a defamatory statement); or (c) is illegal under, or your sale of which to the buyer would violate, any applicable law, statute, ordinance or regulation.
						</p>
					</div>
					<h5 class="text-uppercase">8. REGULATION OF USAGE OF WEBSITE</h5>
					<p>
						The User agrees and undertakes not to reverse engineer, modify, copy, distribute, transmit, display, perform, reproduce, publish, license, create derivative works from, transfer, or sell any information or software obtained from the Website.
						<br>
						You agree not to use the Website (including, without limitation, any Services you may obtain through your use of the Website):
						<ul>
							<li>
								in a manner that violates any local, state, national, foreign, or international statute, regulation, rule, order, treaty, or other law;
							</li>
							<li>
								to stalk, harass, or harm another individual or organization;
							</li>
							<li>
								to impersonate any person or entity or otherwise misrepresent your affiliation with a person or entity;
							</li>
							<li>
								to interfere with or disrupt the Website or servers or networks connected to the Website.
							</li>
						</ul>
						<br>
						Without limiting the foregoing, you may not list or sell any prohibited / banned items in the Market Place.
						<br><br>
						You agree not to submit any property descriptions, photographs, financial, contact or other information contained in each Property's data to the Website unless You have acquired received all necessary rights and authorizations from the owner of such property or the power-of-attorney holder, including from the photographer and/or copyright owner of any photographs, to publish and advertise the said property(s) on the Website. Photographs with any watermark are prohibited.						
					</p>
					<h5 class="text-uppercase">9. TERMINATION OF REGISTRATION</h5>
					<p>
						Without limiting any other remedies, CF may terminate your account if (a) you are found or suspected to have engaged in fraudulent activity in connection with the use of our Services, (b) we are of the opinion that you have breached these Terms or such other reasons as deemed fit by CommonFloor with or without assigning any reasons/evidence thereof.
					</p>
					<h5 class="text-uppercase">10. COMMUNICATION FROM COMMONFLOOR:</h5>
					<p>
						As part of the Services offered to registered members, we may need to communicate with you via e-mail (see our Privacy Policy to learn more about communications). You agree to receive e-mails which are specific to your account and necessary for the normal functioning of the Services, including one or more welcome e-mails which help inform new users about various features of the Services. By becoming a registered member of CommonFloor and/or using the Services, you agree to receive certain communication from CommonFloor. You hereby confirm that, you do not have any objection to receiving emails, messages (SMS or any other mode) calls from Commonfloor, its group companies, affiliates and subsidiaries. This consent shall supersede any preferences set by you with or registration done with the Do Not Disturb (DND Register)/ National Customer Preference Register (NCPR).
						<br><br>
						We may also send Residents occasional e-mail bulletins encouraging them to log in to the Network or take advantage of various features or offers, unless such Residents have opted not to receive these e-mails. These e-mails may also contain neighbourhood information, tips and suggestions or any other offer provided by third party. CF does not take any responsibility of the validity of any of these offers. If we make these e-mails available to Residents in your Network, you will be able to opt in or out of these e-mails at any time by updating your preferences through your "Settings" page.
					</p>
					<h5 class="text-uppercase">11. Information for Users/Service Providers:</h5>
					<p>
						Because certain areas of the Website are designed to help Users discover new rental or purchasing opportunities, you may browse some sections of the Network for any apartment complex/building on the Website, even if you have not yet registered. However, you will not be able to read or post any reviews or ratings in these sections unless you have logged in as a Resident of that Network's building. CF will not make available any of the information which could be private to any apartment to public users without notifying users of the network. However authority of deciding upon a piece of information to be private stays with CF.
					</p>
					<h5 class="text-uppercase">12. INTELLECTUAL PROPERTY RIGHTS</h5>
					<p>
						All logos, brands, trademarks and service marks ("Marks") appearing in Website are the properties either owned or used under license by CommonFloor. All rights accruing from the same, statutory or otherwise, wholly vest with CommonFloor. The access to this Website does not confer upon you any license or right to use in respect of these Marks and therefore the use of these Marks in any form or manner, whatsoever is strictly prohibited. Any violation of the above would constitute an offence under the prevailing laws of India.
						<br><br>
						CommonFloor respects the Intellectual Property Rights of all, it has and will continue to adhere to all the laws applicable in India in this respect. CommonFloor shall respect the Intellectual Property Rights of the users as well as third parties. In a case where a User/s are found to be using Website as a platform to infringe the Intellectual Property Rights of others, CommonFloor will be free to terminate the said User/s account forthwith without any notice to the user.
					</p>
					<h5 class="text-uppercase">13. DISCLAIMER OF WARRANTIES</h5>
					<p>
						ALL INFORMATION AND SERVICES PROVIDED BY THE COMPANY THROUGH THE WEBSITE ARE PROVIDED "AS IS" AND "AS AVAILABLE" WITHOUT WARRANTY OF ANY KIND, EITHER EXPRESSED OR IMPLIED, INCLUDING, BUT NOT LIMITED TO THE IMPLIED WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE, TITLE OR NON-INFRINGEMENT, OR ARISING FROM A COURSE OF DEALING, USAGE, OR TRADE PRACTICE. COMMONFLOOR DOES NOT WARRANT THAT THE SERVICES OFFERED ARE FREE OF ERRORS OR MISTAKES. COMMONFLOOR DOES NOT WARRANT OR REPRESENT THAT DEFECTS OR LIMITATIONS IN THE SERVICES WILL BE CORRECTED. NOR DOES THE COMMONFLOOR WARRANT OR REPRESENT THAT THE SERVICES SHALL BE AVAILABLE CONTINUOUSLY. CERTAIN EXTENUATING CIRCUMSTANCES MAY CAUSE THE SERVICES TO BE INTERRUPTED. COMMONFLOOR PROVIDES NO REMEDIES FOR SUCH SERVICE INTERRUPTIONS. IN ADDITION, COMMONFLOOR PROVIDES NO REMEDIES FOR ANY LOSS OF DATA RESULTING FROM USE OF THE SERVICES.
						<br><br>
						COMMONFLOOR SHALL HAVE NO RESPONSIBILITY FOR ANY DAMAGE OF ANY KIND (CONSEQUENTIAL, DIRECT, INCIDENTAL, HARDWARE, SOFTWARE OR ANY OTHER) DUE TO ACCESS, DOWNLOAD OR USAGE OF CONTENTS FROM THE WEBSITE. THE CONTENT OF THE WEBSITE COULD INCLUDE INACCURACIES OR TYPOGRAPHICAL ERRORS. CONTENT IS FREQUENTLY UPDATED WITH REFERENCE TO IMPROVEMENTS AND CORRECTIONS WITHOUT NOTICE.
					</p>
					<h5 class="text-uppercase">14. Whistleblowing</h5>
					<p>
						CommonFloor reserves the right to publish property details with Your consent that have been furnished by You. However, should there be a situation where Your consent was not obtained, You would be required to contact CommonFloor immediately. Discussing this on any public or social forum is prohibited and a legal penalty will be applicable if this is found. Any feedback regarding correction of details has to be communicated to CommonFloor immediately. CommonFloor can be contacted on contactus@commonfloor.com or support@commonfloor.com or on 1800 180 180 180 or at Our office address maxHeap Technologies Pvt. Ltd., #298, 299 SGR Towers, 7th Cross, Domlur, Bangalore, 560071, Karnataka, India
					</p>
					<h5 class="text-uppercase">15. NO LIABILITY</h5>
					<p>
						Unless explicitly stated in any part of the Website, we are not involved in the actual transactions between buyers and sellers of any goods or services or any users posting any information/listings on the Website. We absolutely have no control over the quality, safety or legality of the items or services advertised, the truth or accuracy of the listings, the ability of sellers to sell items or the ability of buyers to buy items offered thorough the Website. We cannot and do not control whether or not sellers will complete the sale of items they offer or buyers will complete the purchase of items they have committed to buy. In addition, note that there are risks of dealing with people acting under false pretense. We expect that you will use caution when using the Website. You understand and agree that we do not guarantee the accuracy or legitimacy of any listing, leads, posting, information by other users. You further agree that we are not liable for any loss of money, goodwill, or reputation, or any special, indirect, or consequential damages arising out of your use of the Website or as a result of any sale, purchase of goods and services with other users of the Website. CommonFloor is not liable in any manner to any third party/User for any content/listing, posted by the Users on the Website.
						<br><br>
						CommonFloor reserves, in a manner consistent with reasonable commercial business practices, the right to remove all or any part of the properties and/or other goods and services posted on any part of the Website without prior notice.
					</p>
					<h5 class="text-uppercase">16. INDEMNIFICATION</h5>
					<p>
						You agree to indemnify, defend and hold harmless CommonFloor, its officers, directors, employees and agents from any claim, cost, expense, judgment or other loss incurred due to violation of the terms and conditions contained in this Terms by You.
					</p>
					<h5 class="text-uppercase">17. LINKS TO THIRD PARTY SITES</h5>
					<p>
						The Website may provide links to web sites and access to content, products and services from third parties, including users, advertisers, affiliates and sponsors of the Website. You agree that CommonFloor is not responsible for the availability/accuracy of content including but not limited to opinions, advice, statements and advertisements provided on third party web sites and You shall bear all risks associated with the use of such content and for acting upon such content. You are requested to peruse the policies posted by respective web sites regarding privacy policy and terms of use before usage of the said third party web sites. CommonFloor is not responsible for any loss or damage of any sort You may incur from usage of contents of third party websites. CommonFloor makes no representations or warranties as to the functioning of any third party website. A link to a third party web site from the Website does not constitute endorsement by CommonFloor of the owner of the other site, the content of its site, or its products or services.
					</p>
					<h5 class="text-uppercase">18. GOVERNING LAW</h5>
					<p>
						By accessing the Website you agree that the laws prevailing in India shall be the governing laws in all matters relating to these Terms.
					</p>
					<h5 class="text-uppercase">19. JURISDICTION</h5>
					<p>
						Courts at Bangalore, India alone shall have the exclusive jurisdiction in all matters relating to the use of these Terms, irrespective of the territory and jurisdiction of your access to the Website.
						<br><br>
						You agree to inform us if you come across any listing or posting that is offensive or violates our listing policy or infringes any intellectual property rights by sending a mail to <a href="mailto:contactus@commonfloor.com">contactus@commonfloor.com</a> to enable us to keep the Website working efficiently and in a safe manner. We reserve the right to take down any posting, listing or information and or limit or terminate our Services and further take all reasonable technical and legal steps to prevent the misuse of the Website in keeping with the letter and spirit of these Terms. In the event you encounter any problems with the use of our Website or Services you are requested to report the problem by sending an e-mail to <a href="mailto:contactus@commonfloor.com">contactus@commonfloor.com</a>
						<br><br>
						The information provided in this Website is based on CommonFloor data which is collected from various publicly known sources viz, websites, documents and maps including CommonFloor's proprietary data resources, and from the inputs of unidentified individuals. It ought to be considered as a guideline and not as absolutely certain. While care has been taken for groundwork, no responsibility is accepted for the accuracy of whole or any part. This information is absolute property of CommonFloor /maxHeap Technologies Private Limited. It should not be reproduced in any form, in part or whole, without prior written permission of CommonFloor. The information is provided on an "as is" and "as available" basis. CommonFloor expressly disclaim warranties of any kind, whether express or implied, including, but not limited to, the implied warranties of merchantability, fitness for a particular purpose and non-infringement.
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