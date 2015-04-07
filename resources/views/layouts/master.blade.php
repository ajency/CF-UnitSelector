<!DOCTYPE html>
<html>
    <head>
        <title>Dashboard - CommonFloor</title>
        <meta http-equiv="content-type" content="text/html;charset=UTF-8" />
        <meta charset="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no" />
        <meta content="" name="description" />
        <meta content="" name="author" />
        <meta name="csrf-token" content="{{ csrf_token() }}" />

        <link href="{{ asset('bower_components/pace/themes/orange/pace-theme-flash.css') }}" rel="stylesheet" type="text/css" media="screen"/>
        <link href="{{ asset('bower_components/jquery.scrollbar/jquery.scrollbar.css') }}" rel="stylesheet" type="text/css"/>
        <link href="{{ asset('bower_components/fontawesome/css/font-awesome.min.css') }}" rel="stylesheet" type="text/css"/>
        <link href="{{ asset('bower_components/DataTables/media/css/jquery.dataTables.min.css') }}" rel="stylesheet" type="text/css">
        <link href="{{ asset('bower_components/datatables-responsive/css/dataTables.responsive.css') }}" rel="stylesheet" type="text/css" media="screen">
        <link href="{{ asset('bower_components/select2/select2.css') }}" rel="stylesheet" type="text/css" media="screen">
        <link href="{{ asset('bower_components/animate.css/animate.min.css') }}" rel="stylesheet" type="text/css"/>


        <link href="{{ asset('css/app.css') }}" rel="stylesheet" type="text/css"/>
        <link href="{{ asset('css/dashboard/style.css') }}" rel="stylesheet" type="text/css"/>
        <link href="{{ asset('css/dashboard/responsive.css') }}" rel="stylesheet" type="text/css"/>
        <link href="{{ asset('css/dashboard/custom-icon-set.css') }}" rel="stylesheet" type="text/css"/>
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
                        <img src="{{ asset('images/inner-header-logo.png') }}" class="logo" alt="" 
                             data-src="{{ asset('images/inner-header-logo.png') }}" 
                             data-src-retina="{{ asset('images/logo2x.png') }}"/>
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
                                <li><a href="{{ url('auth/logout' ) }}"><i class="fa fa-power-off"></i>&nbsp;&nbsp;Logout</a></li>
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
            <!--TODO remove mini mini-mobile class 4 list view-->
            <div class="page-sidebar @if(!isset($menuFlag)){{'mini mini-mobile'}}@endif " id="main-menu"> 
                <div class="page-sidebar-wrapper scrollbar-dynamic" id="main-menu-wrapper">
                    <p class="menu-title"></p>

                    <!-- BEGIN SIDEBAR MENU -->	
                    <ul>	
                        <li class="">
                            <a href="javascript:;">
                                <i class="fa fa-building-o"></i>
                                <span class="title">Projects</span>
                                <span class="arrow"></span>
                            </a>
                            <ul class="sub-menu">
                                <li><a href="{{ url( 'admin/project/create' ) }}">Add</a></li>
                                <li><a href="{{ url( 'admin/project' ) }}">View</a></li>
                            </ul>
                        </li>
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
        <script src="{{ asset('bower_components/jquery/dist/jquery.js') }}"></script>
        <script src="{{ asset('bower_components/bootstrap/dist/js/bootstrap.js' ) }}"></script>
        <script src="{{ asset('bower_components/jquery-ui/jquery-ui.js' ) }}" type="text/javascript"></script> 
        <script src="{{ asset('bower_components/jquery-unveil/jquery.unveil.js' ) }}" type="text/javascript"></script> 
        <script src="{{ asset('bower_components/jquery.scrollbar/jquery.scrollbar.js' ) }}" type="text/javascript"></script>
        <script src="{{ asset('bower_components/pace/pace.js' ) }}" type="text/javascript"></script>  
        <script src="{{ asset('bower_components/handlebars/handlebars.js' ) }}" type="text/javascript"></script> 
        <script src="{{ asset('bower_components/Faker/build/build/faker.js' ) }}" type="text/javascript"></script> 
        <script src="{{ asset('bower_components/lodash/lodash.js' ) }}" type="text/javascript" ></script>
        <script src="{{ asset('bower_components/select2/select2.js' ) }}" type="text/javascript"></script>
        <script src="{{ asset('bower_components/parsleyjs/dist/parsley.js' ) }}" type="text/javascript"></script>
        <script src="{{ asset('bower_components/plupload/js/plupload.full.min.js' ) }}" type="text/javascript"></script>
        <script src="{{ asset('bower_components/bootstrap-file-input/bootstrap.file-input.js' ) }}" type="text/javascript"></script>
        <script src="{{ asset('bower_components/jquery.breakpoints/breakpoints.js' ) }}" type="text/javascript"></script>
        <script src="{{ asset('bower_components/bootstrap-file-input/bootstrap.file-input.js') }}" type="text/javascript"></script>

        <script src="{{ asset('bower_components/DataTables/media/js/jquery.dataTables.js') }}" type="text/javascript"></script>
        <script src="{{ asset('bower_components/datatables-tabletools/js/dataTables.tableTools.js' ) }}" type="text/javascript"></script>
        <script src="{{ asset('bower_components/datatables-responsive/js/dataTables.responsive.js' ) }}" type="text/javascript"></script>


        <script src="{{ asset('plugins/dashboard-theme-core/core.js') }}" type="text/javascript"></script>
        <script src="{{ asset('plugins/datatables.js') }}" type="text/javascript"></script>
        <script src="{{ asset('js/add.projects.js') }}" type="text/javascript"></script> 
        
        <script src="{{ asset('scripts.js') }}" type="text/javascript"></script> 

        <script type="text/javascript">
var uploader = new plupload.Uploader({
    runtimes: 'html5,flash,silverlight,html4',
    browse_button: 'pickfiles', // you can pass in id...
    container: document.getElementById('container'), // ... or DOM Element itself
    url: '{{ url( "admin/project/") }}/' + PROJECTID + '/media',
    flash_swf_url: '{{ url( "bower_components/plupload/js/Moxie.swf") }}',
    silverlight_xap_url: '{{ url( "/bower_components/plupload/js/Moxie.xap" ) }}',
    headers: {
        "x-csrf-token": $("[name=_token]").val()
    },
    multipart_params: {
        "type": "google_earth"
    },
    filters: {
        max_file_size: '10mb',
        mime_types: [{
                title: "Image files",
                extensions: "jpg,gif,png"
            }, {
                title: "Zip files",
                extensions: "zip"
            }]
    },
    init: {
        PostInit: function () {
            //document.getElementById('filelist').innerHTML = '';

            document.getElementById('uploadfiles').onclick = function () {
                uploader.start();
                return false;
            };
        },
        FilesAdded: function (up, files) {
            plupload.each(files, function (file) {
                //document.getElementById('filelist').innerHTML += '<div id="' + file.id + '">' + file.name + ' (' + plupload.formatSize(file.size) + ') <b></b></div>';
            });
        },
        UploadProgress: function (up, file) {
            // document.getElementById(file.id).getElementsByTagName('b')[0].innerHTML = '<span>' + file.percent + "%</span>";
        },
        Error: function (up, err) {
            //document.getElementById('console').innerHTML += "\nError #" + err.code + ": " + err.message;
        },
        FileUploaded: function (up, file, xhr) {
            fileResponse = JSON.parse(xhr.response);
            $("#project_googleearth_image").html('<img src="'+fileResponse.data.image_path+'" class="img-responsive" >');
            // add the uploaded image to DOM here. response.data.image_path will give
            // the uploaded image path
        }
    }
});
uploader.init();

var master_uploader = new plupload.Uploader({
    runtimes: 'html5,flash,silverlight,html4',
    browse_button: 'master_pickfiles', // you can pass in id...
    container: document.getElementById('master_container'), // ... or DOM Element itself
    url: '/admin/project/' + PROJECTID + '/media',
    flash_swf_url: '/bower_components/plupload/js/Moxie.swf',
    silverlight_xap_url: '/bower_components/plupload/js/Moxie.xap',
    headers: {
        "x-csrf-token": $("[name=_token]").val()
    },
    multipart_params: {
        "type": "master"
    },
    filters: {
        max_file_size: '10mb',
        mime_types: [{
                title: "Image files",
                extensions: "jpg,gif,png"
            }, {
                title: "Zip files",
                extensions: "zip"
            }]
    },
    init: {
        PostInit: function () {
            //document.getElementById('filelist').innerHTML = '';

            document.getElementById('master_uploadfiles').onclick = function () {
                master_uploader.start();
                return false;
            };
        },
        FilesAdded: function (up, files) {
            plupload.each(files, function (file) {
                //document.getElementById('filelist').innerHTML += '<div id="' + file.id + '">' + file.name + ' (' + plupload.formatSize(file.size) + ') <b></b></div>';
            });
        },
        UploadProgress: function (up, file) {
            //document.getElementById(file.id).getElementsByTagName('b')[0].innerHTML = '<span>' + file.percent + "%</span>";
        },
        Error: function (up, err) {
            //document.getElementById('console').innerHTML += "\nError #" + err.code + ": " + err.message;
        },
        FileUploaded: function (up, file, xhr) {
            fileResponse = JSON.parse(xhr.response);

            // add the uploaded image to DOM here. response.data.image_path will give
            // the uploaded image path
        }
    }
});
master_uploader.init();

var skyview_uploader = new plupload.Uploader({
    runtimes: 'html5,flash,silverlight,html4',
    browse_button: 'skyview_pickfiles', // you can pass in id...
    container: document.getElementById('skyview_container'), // ... or DOM Element itself
    url: '/admin/project/' + PROJECTID + '/media',
    flash_swf_url: '/bower_components/plupload/js/Moxie.swf',
    silverlight_xap_url: '/bower_components/plupload/js/Moxie.xap',
    headers: {
        "x-csrf-token": $("[name=_token]").val()
    },
    multipart_params: {
        "type": "skyview"
    },
    filters: {
        max_file_size: '10mb',
        mime_types: [{
                title: "Image files",
                extensions: "jpg,gif,png"
            }, {
                title: "Zip files",
                extensions: "zip"
            }]
    },
    init: {
        PostInit: function () {
            //document.getElementById('filelist').innerHTML = '';

            document.getElementById('skyview_uploadfiles').onclick = function () {
                skyview_uploader.start();
                return false;
            };
        },
        FilesAdded: function (up, files) {
            plupload.each(files, function (file) {
                //document.getElementById('filelist').innerHTML += '<div id="' + file.id + '">' + file.name + ' (' + plupload.formatSize(file.size) + ') <b></b></div>';
            });
        },
        UploadProgress: function (up, file) {
            //document.getElementById(file.id).getElementsByTagName('b')[0].innerHTML = '<span>' + file.percent + "%</span>";
        },
        Error: function (up, err) {
            //document.getElementById('console').innerHTML += "\nError #" + err.code + ": " + err.message;
        },
        FileUploaded: function (up, file, xhr) {
            fileResponse = JSON.parse(xhr.response);
            $("#skyview_image").html('<img src="'+fileResponse.data.image_path+'" class="img-responsive" >');
            //$("#skyview_image").attr("src",'');
            // add the uploaded image to DOM here. response.data.image_path will give
            // the uploaded image path
        }
    }
});
skyview_uploader.init();
        </script>
    </body>
</html>