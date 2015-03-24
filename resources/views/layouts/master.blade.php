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
                        <img src="/images/inner-header-logo.png" class="logo" alt="" 
                             data-src="/images/inner-header-logo.png" 
                             data-src-retina="/images/logo2x.png"/>
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

                    <!-- BEGIN SIDEBAR MENU -->	
                    <ul>	
                        <!-- BEGIN SELECTED LINK -->
                        <li class="start active">
                            <a href="/admin">
                                <i class="icon-custom-home"></i>
                                <span class="title">Dashboard</span>
                                <span class="selected"></span>
                            </a>
                        </li>
                        <!-- END SELECTED LINK -->    
                        <!-- BEGIN ONE LEVEL MENU -->
                        <li class="">
                            <a href="javascript:;">
                                <i class="fa fa-building-o"></i>
                                <span class="title">Projects</span>
                                <span class="arrow"></span>
                            </a>
                            <ul class="sub-menu">
                                <li><a href="/admin/projects/create">Add</a></li>
                                <li><a href="/admin/projects">View</a></li>
                            </ul>
                        </li>
                        <!-- END ONE LEVEL MENU -->	
                        <!-- BEGIN SINGLE LINK -->
                        <li class="">
                            <a href="/admin/users">
                                <i class="fa fa-user"></i>
                                <span class="title">Users</span>
                            </a>
                        </li>
                        <!-- END SINGLE LINK -->    
                    </ul>
                    <!-- END SIDEBAR MENU -->

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
                    
                    @yield('breadcrumb')
                    @yield('content')
                    
                </div>
            </div>
            <!-- END PAGE CONTAINER -->
        </div>
        <!-- END CONTENT --> 

        <!-- BEGIN CORE JS FRAMEWORK--> 
        <script src="/bower_components/jquery/dist/jquery.min.js"></script>
        <script src="/bower_components/bootstrap/dist/js/bootstrap.min.js"></script>
        <script src="/plugins/jquery-ui/jquery-ui-1.10.1.custom.min.js" type="text/javascript"></script> 
        <script src="/plugins/breakpoints/breakpoints.min.js" type="text/javascript"></script> 
        <script src="/plugins/jquery-unveil/jquery.unveil.min.js" type="text/javascript"></script> 
        <script src="/plugins/jquery-scrollbar/jquery.scrollbar.min.js" type="text/javascript"></script>
        <script src="/plugins/pace/pace.min.js" type="text/javascript"></script>  
        <script src="/plugins/jquery-datatable/js/jquery.dataTables.min.js" type="text/javascript"></script>
        <script src="/plugins/jquery-datatable/extra/js/dataTables.tableTools.min.js" type="text/javascript"></script>
        <script src="/plugins/datatables-responsive/js/datatables.responsive.js" type="text/javascript"></script>
        <script src="/plugins/datatables-responsive/js/lodash.min.js" type="text/javascript" ></script>
        <script src="/plugins/bootstrap-select2/select2.min.js" type="text/javascript"></script>
        <script src="/plugins/bootstrap-file-input/bootstrap.file-input.js" type="text/javascript"></script>
        <script src="/bower_components/parsleyjs/dist/parsley.min.js" type="text/javascript"></script>
        <script src="/plugins/dashboard-theme-core/core.js" type="text/javascript"></script> 
    </body>
</html>