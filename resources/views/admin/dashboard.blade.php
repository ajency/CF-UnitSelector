@extends('layouts.master')

@section('menu')
<!-- BEGIN SIDEBAR MENU -->	
<ul>	
    <!-- BEGIN SELECTED LINK -->
    <li class="start active">
        <a href="#">
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
            <li><a href="#">Add</a></li>
            <li><a href="#">View</a></li>
        </ul>
    </li>
    <!-- END ONE LEVEL MENU -->	
    <!-- BEGIN SINGLE LINK -->
    <li class="">
        <a href="#">
            <i class="fa fa-user"></i>
            <span class="title">Users</span>
        </a>
    </li>
    <!-- END SINGLE LINK -->    
</ul>
<!-- END SIDEBAR MENU -->
@endsection

@section('scripts')
<!-- BEGIN CORE JS FRAMEWORK--> 
<script src="/bower_components/jquery/dist/jquery.min.js"></script>
<script src="/bower_components/bootstrap/dist/js/bootstrap.min.js"></script>
<script src="/plugins/jquery-ui/jquery-ui-1.10.1.custom.min.js" type="text/javascript"></script> 
<script src="/plugins/boostrapv3/js/bootstrap.min.js" type="text/javascript"></script> 
<script src="/plugins/breakpoints/breakpoints.min.js" type="text/javascript"></script> 
<script src="/plugins/jquery-unveil/jquery.unveil.min.js" type="text/javascript"></script> 
<script src="/plugins/jquery-scrollbar/jquery.scrollbar.min.js" type="text/javascript"></script>
<script src="/plugins/pace/pace.min.js" type="text/javascript"></script>  
<script src="/plugins/jquery-datatable/js/jquery.dataTables.min.js" type="text/javascript"></script>
<script src="/plugins/jquery-datatable/extra/js/dataTables.tableTools.min.js" type="text/javascript"></script>
<script type="text/javascript" src="/plugins/datatables-responsive/js/datatables.responsive.js"></script>
<script type="text/javascript" src="/plugins/datatables-responsive/js/lodash.min.js"></script>
<script src="/plugins/bootstrap-select2/select2.min.js" type="text/javascript"></script>
<script src="/plugins/bootstrap-file-input/bootstrap.file-input.js" type="text/javascript"></script>
<script src="/plugins/dashboard-theme-core/core.js" type="text/javascript"></script> 
@endsection