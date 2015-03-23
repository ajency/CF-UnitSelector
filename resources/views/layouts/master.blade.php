<!DOCTYPE html>
<html>
    <head>
        <title>Dashboard - CommonFloor</title>
        <meta http-equiv="content-type" content="text/html;charset=UTF-8" />
        <meta charset="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no" />
        <meta content="" name="description" />
        <meta content="" name="author" />

        <link href="/plugins/pace/pace-theme-flash.css" rel="stylesheet" type="text/css" media="screen"/>
        <link href="/plugins/jquery-scrollbar/jquery.scrollbar.css" rel="stylesheet" type="text/css"/>
        <link href="/css/app.css" rel="stylesheet" type="text/css"/>
        <!-- <link href="assets/plugins/boostrapv3/css/bootstrap-theme.min.css" rel="stylesheet" type="text/css"/> -->
        <link href="/plugins/font-awesome/css/font-awesome.css" rel="stylesheet" type="text/css"/>

        <!-- Datatables Styles -->
        <link href="/plugins/jquery-datatable/css/jquery.dataTables.css" rel="stylesheet" type="text/css">
        <link href="/plugins/datatables-responsive/css/datatables.responsive.css" rel="stylesheet" type="text/css" media="screen">

        <!-- Select2 Styles -->
        <link href="/plugins/bootstrap-select2/select2.css" rel="stylesheet" type="text/css" media="screen">

        <link href="/css/dashboard/animate.min.css" rel="stylesheet" type="text/css"/>
        <link href="/css/dashboard/style.css" rel="stylesheet" type="text/css"/>
        <link href="/css/dashboard/responsive.css" rel="stylesheet" type="text/css"/>
        <link href="/css/dashboard/custom-icon-set.css" rel="stylesheet" type="text/css"/>
    <body>
        <!-- BEGIN HEADER -->
        <div class="header navbar navbar-inverse"> 
            <!-- BEGIN TOP NAVIGATION BAR -->
            <div class="navbar-inner">
                <!-- BEGIN NAVIGATION HEADER -->
                <div class="header-seperation"> 
                    <!-- BEGIN MOBILE HEADER -->
                    <ul class="nav pull-left notifcation-center" id="main-menu-toggle-wrapper" style="display:none">	
                        <li class="dropdown">
                            <a id="main-menu-toggle" href="#main-menu" class="">
                                <div class="iconset top-menu-toggle-white"></div>
                            </a>
                        </li>		 
                    </ul>
                    <!-- END MOBILE HEADER -->
                    <!-- BEGIN LOGO -->	
                    <a href="#">
                        <img src="/images/inner-header-logo.png" class="logo" alt="" data-src="assets/img/inner-header-logo.png" data-src-retina="assets/img/logo2x.png"/>
                    </a>
                    <!-- END LOGO -->
                </div>
                <!-- END NAVIGATION HEADER -->
                <!-- BEGIN CONTENT HEADER -->
                <div class="header-quick-nav"> 
                    <!-- BEGIN HEADER LEFT SIDE SECTION -->
                    <div class="pull-left"> 
                        <!-- BEGIN SLIM NAVIGATION TOGGLE -->
                        <ul class="nav quick-section">
                            <li class="quicklinks">
                                <a href="#" class="" id="layout-condensed-toggle">
                                    <div class="iconset top-menu-toggle-dark"></div>
                                </a>
                            </li>
                        </ul>
                        <!-- END SLIM NAVIGATION TOGGLE -->				
                        <!-- BEGIN HEADER QUICK LINKS -->
                        <ul class="nav quick-section">
                            <!-- BEGIN SEARCH BOX -->
                            <li class="m-r-10 input-prepend inside search-form no-boarder">
                                <span class="add-on"><span class="iconset top-search"></span></span>
                                <input name="" type="text" class="no-boarder" placeholder="Search" style="width:250px;">
                            </li>
                            <!-- END SEARCH BOX -->
                        </ul>
                        <!-- BEGIN HEADER QUICK LINKS -->				
                    </div>
                    <!-- END HEADER LEFT SIDE SECTION -->
                    <!-- BEGIN HEADER RIGHT SIDE SECTION -->
                    <div class="pull-right"> 
                        <div class="chat-toggler">	
                            <!-- BEGIN NOTIFICATION CENTER -->
                            <a href="#" data-toggle="dropdown" class="dropdown-toggle" id="user-options">
                                <div class="user-details"> 
                                    <div class="username">
                                        <span class="bold">{{ Auth::user()->name }}</span>
                                        <div class="iconset top-down-arrow"></div>								
                                    </div>						
                                </div> 
                            </a>
                            <ul class="dropdown-menu pull-right" role="menu" aria-labelledby="user-options">
                                <li><a href="/my-account">My Account</a></li>
                                <li><a href="/my-projects">My Projects</a></li>
                                <li class="divider"></li>                
                                <li><a href="/auth/logout"><i class="fa fa-power-off"></i>&nbsp;&nbsp;Logout</a></li>
                            </ul>

                            <!-- END NOTIFICATION CENTER -->
                            <!-- BEGIN PROFILE PICTURE -->
                            <div class="profile-pic"> 
                                <img src="/images/profiles/avatar_small.jpg" alt="" data-src="/images/profiles/avatar_small.jpg" data-src-retina="assets/img/profiles/avatar_small2x.jpg" width="35" height="35" /> 
                            </div>  
                            <!-- END PROFILE PICTURE -->     			
                        </div>
                    </div>
                    <!-- END HEADER RIGHT SIDE SECTION -->
                </div> 
                <!-- END CONTENT HEADER --> 
            </div>
            <!-- END TOP NAVIGATION BAR --> 
        </div>
        <!-- END HEADER -->


        <!-- BEGIN CONTENT -->
        <div class="page-container row-fluid">
            <!-- BEGIN SIDEBAR -->
            <!-- BEGIN MENU -->
            <div class="page-sidebar" id="main-menu"> 
                <div class="page-sidebar-wrapper scrollbar-dynamic" id="main-menu-wrapper">
                    <p class="menu-title"></p>
                    
                    @yield('menu')
                    
                </div>
            </div>
            <!-- BEGIN SCROLL UP HOVER -->
            <a href="#" class="scrollup">Scroll</a>
            <!-- END SCROLL UP HOVER -->
            <!-- END MENU -->
            <!-- BEGIN SIDEBAR FOOTER WIDGET -->
            <div class="footer-widget">		
                <div class="pull-right">
                    <!-- <a href="#"><i class="fa fa-power-off"></i></a> -->
                </div>
            </div>
            <!-- END SIDEBAR FOOTER WIDGET -->
            <!-- END SIDEBAR --> 
            <!-- BEGIN PAGE CONTAINER-->
            <div class="page-content"> 
                <div class="content">  
                    <!-- BEGIN PAGE TITLE -->
                    <div class="page-title">	
                        <h3>Master Page</h3>		
                    </div>
                    <!-- END PAGE TITLE -->
                    <!-- BEGIN PlACE PAGE CONTENT HERE -->

                    <!-- END PLACE PAGE CONTENT HERE -->
                </div>
            </div>
            <!-- END PAGE CONTAINER -->
        </div>
        <!-- END CONTENT --> 
        
        @yield('scripts')
        
    </body>
</html>