<html>
    <head>
        <link href='//fonts.googleapis.com/css?family=Lato:100' rel='stylesheet' type='text/css'>
        <link href="{{ asset('bower_components/bootstrap/dist/css/bootstrap.min.css' ) }}" rel="stylesheet" type="text/css"/>
        <title>CommonFloor UnitSelector</title>
        <link rel="icon" type="image/png" href="{{ asset( 'CommonFloor/public/images/others/fevicon.ico' ) }}">
        <style>
            body {
                margin: 0;
                padding: 0;
                width: 100%;
                height: 100%;
                color: #B0BEC5;
                display: table;
                font-weight: 100;

            }
            .navbar{
                background: transparent;
                border: none;
                border-bottom: 2px solid rgba(255, 255, 255, 0.21);

            }

            .content {
                text-align: center;
                display: inline-block;
            }
            .btn-default{
                border-radius: 0!important;
                border: 1px solid #F68121!important;
                background: #F68121;
                color: #fff;
            }

            .btn-default a{
                color: #fff;
                text-decoration: none;
            }
            .btn-default a:hover{
                color:#A0A0A0;
            }
            .title {
                font-size: 75px;
                margin-bottom: 40px;
                font-family: 'Lato';
                color: #A0A0A0;
                font-weight: 900;
            }
            .sub-title{
                letter-spacing: 4px;
                font-family: 'Lato';
                margin-top: 60px;
                color: #5A5A5A;
                font-weight: 900;
            }

            .quote {
                font-size: 24px;
            }
            .pre-footer{
                padding: 30px;
                border-top: 2px solid #F4F4F4;
                background: #F2F2F2;
            }
            .pre-footer a{
                color:#f68121;
                text-decoration: none;
                padding:20px;
            }
            footer{
                bottom: 0;
                position: fixed;
                width: 100%;
            }
            .footer{
                background: #f68121;
                padding: 10px 0;
                text-align: center;
                color:#fff;
            }
            .bckgrnd-img{
                background-image:url("../images/background-cf.jpg");
                background-position: center center;
                background-size: cover;
                box-shadow: 0 -40px 80px #fff inset;
                box-shadow: 0 -40px 80px #fff inset;
                height: 81vh;
            }
        </style>
    </head>
    <body>
        <div class="bckgrnd-img">
            <nav class="navbar navbar-default">
                <div class="container-fluid">
                    <!-- Brand and toggle get grouped for better mobile display -->
                    <div class="navbar-header">
                        <button type="button" class="navbar-toggle collapsed" data-toggle="collapse" data-target="#bs-example-navbar-collapse-1">
                            <span class="sr-only">Toggle navigation</span>
                            <span class="icon-bar"></span>
                            <span class="icon-bar"></span>
                            <span class="icon-bar"></span>
                        </button>
                        <a class="navbar-brand" href="#"><img src="http://ak.asset2.cfcdn.com/cfassets/images/logo-tab.png"/></a>
                    </div>

                    <!-- Collect the nav links, forms, and other content for toggling -->
                    <div class="collapse navbar-collapse" id="bs-example-navbar-collapse-1">

                        <ul class="nav navbar-nav navbar-right">
                            <li><a href="#">Link</a></ili>
                            <li><a href="#">Link</a></li>
                        </ul>
                    </div><!-- /.navbar-collapse -->
                </div><!-- /.container-fluid -->
            </nav>
            <div class="container text-center">
                <div class="content">
                    <div class="title">CommonFloor Unit Selector</div>
                </div>
                <div class="text-center">
                    <a class="btn btn-default btn-lg"  href="{{ url( 'auth/login' ) }}">Click here to login</a>

                </div>
            </div>
            <h3 class="sub-title text-center">-&nbsp;Discover Your Locality&nbsp;-</h3>
        </div>

    </body>

    <footer>
        <div class="pre-footer text-center">
            <span><a href="#">Terms & Conditions</a></span>&nbsp;|
            <span><a href="#">Privacy Policy</a></span>&nbsp;|
            <span><a href="#">Contact Us</a></span>&nbsp;
        </div>
        <div class="footer">Copyright © 2015 CommonFloor UnitSelector. All rights reserved.</div>
    </footer>
</html>
