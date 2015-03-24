<!DOCTYPE html>
<html>
    <head>
        <title>Dashboard - CommonFloor</title>
        <meta http-equiv="content-type" content="text/html;charset=UTF-8" />
        <meta charset="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no" />
        <meta content="" name="description" />
        <meta content="" name="author" />

        <link href="/bower_components/pace/themes/orange/pace-theme-flash.css" rel="stylesheet" type="text/css" media="screen"/>
        <link href="/bower_components/jquery.scrollbar/jquery.scrollbar.css" rel="stylesheet" type="text/css"/>
        <link href="/bower_components/fontawesome/css/font-awesome.min.css" rel="stylesheet" type="text/css"/>
        <link href="/bower_components/DataTables/media/css/jquery.dataTables.min.css" rel="stylesheet" type="text/css">
        <link href="/bower_components/datatables-responsive/css/dataTables.responsive.css" rel="stylesheet" type="text/css" media="screen">
        <link href="/bower_components/select2/select2.css" rel="stylesheet" type="text/css" media="screen">
        <link href="/bower_components/animate.css/animate.min.css" rel="stylesheet" type="text/css"/>
        
        <link href="/css/app.css" rel="stylesheet" type="text/css"/>
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
            <div class="page-sidebar mini mini-mobile" id="main-menu"> 
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
                
                @yield('innermenu')
                
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
        <script src="/bower_components/jquery-ui/jquery-ui.min.js" type="text/javascript"></script> 
        <script src="/bower_components/jquery-unveil/jquery.unveil.min.js" type="text/javascript"></script> 
        <script src="/bower_components/jquery.scrollbar/jquery.scrollbar.js" type="text/javascript"></script>
        <script src="/bower_components/pace/pace.min.js" type="text/javascript"></script>  
        <script src="/bower_components/DataTables/media/js/jquery.dataTables.min.js" type="text/javascript"></script>
        <script src="/bower_components/handlebars/handlebars.min.js" type="text/javascript"></script> 
        <script src="/bower_components/Faker/build/build/faker.min.js" type="text/javascript"></script> 
        <script src="/bower_components/lodash/lodash.min.js" type="text/javascript" ></script>
        <script src="/bower_components/select2/select2.min.js" type="text/javascript"></script>
        <script src="/bower_components/parsleyjs/dist/parsley.min.js" type="text/javascript"></script>
        <script src="/bower_components/bootstrap-file-input/bootstrap.file-input.js" type="text/javascript"></script>
        <script src="/bower_components/jquery.breakpoints/breakpoints.js" type="text/javascript"></script> 
        <script src="/bower_components/datatables-responsive/js/dataTables.responsive.js" type="text/javascript"></script>
        
       
        <script src="/plugins/dashboard-theme-core/core.js" type="text/javascript"></script> 
        <script src="/js/add.projects.js" type="text/javascript"></script> 
            
    </body>
</html>