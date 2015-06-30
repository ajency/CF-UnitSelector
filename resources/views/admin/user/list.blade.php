@extends('layouts.master')
@section('breadcrumb')
<!-- BEGIN BREADCRUMBS -->
<ul class="breadcrumb">
    <li><a href="{{ url( 'admin/') }}">Dashboard</a> </li>
    <li><a href="#" class="active">Users</a> </li>
 </ul>
<!-- END BREADCRUMBS -->
@endsection
@section('content')
<!-- BEGIN PAGE TITLE -->
<div class="page-title">	
    <h2><span class="semi-bold">View</span> Users</h2>
</div>
<div class="row">
    <div class="col-md-12">
        <div class="grid simple">
            <div class="grid-title">
                <h4>List of <span class="semi-bold">Users</span></h4>
                <a class="btn btn-primary pull-right" href="{{ url('/admin/user/create') }}" ><i class="fa fa-plus"></i> Add User</a>
            </div>
            <div class="grid-body">
                <table class="table table-bordered userList" id="example2" >
                    <thead>
                        <tr>
                            <th>Name</th>
                            <th>Email</th>
                            <th>Phone</th>
                            <th>Status</th>
                            <th class="date-sort">Created On</th>
                            <th class="date-sort">Modified On</th>
                        </tr>
                    </thead>
                    <tbody> 
                        @foreach ($users as $user)
                            <tr class="" onclick="location.href='{{ url( '/admin/user/' . $user['id'] . '/edit') }}'">
                                <td>{{ $user['name'] }}</td>
                                <td>{{ $user['email'] }}</td>
                                <td>{{ $user['phone'] }}</td>
                                <td>{{ ucfirst($user['status']) }}</td>
                                <td>{{ date('d/m/Y',strtotime($user['created_at'])) }}</td>
                                <td>{{  date('d/m/Y',strtotime($user['updated_at'])) }}</td>
                            </tr>
                        @endforeach
                    </tbody>
                </table>
            </div>
        </div>
    </div>
</div>
<script type="text/javascript">
    $('#example2.userList tbody td i').on('click', function () {
        var nTr = $(this).parents('tr')[0];
        if (oTable.fnIsOpen(nTr))
        {
            /* This row is already open - close it */
            this.removeClass = "fa fa-pencil";
            this.addClass = "fa fa-minus-circle";
            oTable.fnClose(nTr);
        }
        else
        {
            /* Open this row */
            this.removeClass = "fa fa-minus-circle";
            this.addClass = "fa fa-pencil";
            oTable.fnOpen(nTr, fnFormatDetails(oTable, nTr), 'details');
        }
    });

    function fnFormatDetails(oTable, nTr)
    {
        var aData = oTable.fnGetData(nTr);
        var sOut = '<table cellpadding="5" cellspacing="0" border="0" style="padding-left:50px;" class="inner-table">';
        sOut += '<tr><td>Status:</td><td>';
        sOut += '<select id="unit_types" class="form-control">';
        sOut += '<option value="active">Active</option>';
        sOut += '<option value="inactive">Inactive</option>';
        sOut += '</select>'; 
        sOut += '<button class="btn btn-small btn-primary m-l-10">Save</button></td></tr>';
        sOut += '</table>';

        return sOut;
 
    }
</script>
@endsection