@extends('layouts.master')
@section('breadcrumb')
<!-- BEGIN BREADCRUMBS -->
<ul class="breadcrumb">
    <li><a href="{{ url( 'admin/') }}">Dashboard</a> </li>
    <li><a href="#" class="active">Leads</a> </li>
 </ul>
<!-- END BREADCRUMBS -->
@endsection
@section('content')
<!-- BEGIN PAGE TITLE -->
<div class="page-title">	
    <h2><span class="semi-bold">View</span> Leads</h2>
</div>
<div class="row">
    <div class="col-md-12">
        <div class="grid simple">
            @include('admin.project.flashmessage')
            <div class="grid-title">
                <h4>List of <span class="semi-bold">Leads</span></h4>
 
            </div>
            <div class="grid-body">
                <table class="table table-bordered" id="example2" >
                    <thead>
                        <tr>
                            <th>Name</th>
                            <th>Email</th>
                            <th>Phone</th>
                            <th>Pan Card</th>
                            <th>Address</th>
                            <th>City</th>
                            <th>State</th>
                            <th>Country</th>
                            <th>Pincode</th>
                            <th class="date-sort">Date</th>
                       
                        </tr>
                    </thead>
                    <tbody> 
                        @foreach ($leads as $lead)
                            <tr class="" >
                                <td>{{ ucfirst($lead['name']) }}</td>
                                <td>{{ $lead['email'] }}</td>
                                <td>{{ $lead['phone'] }}</td>
                                <td>{{ $lead['pan_card'] }}</td>
                                <td>{{ $lead['address1'] }}</td>
                                <td>{{ $lead['city'] }}</td>
                                <td>{{ $lead['state'] }}</td>
                                <td>{{ $lead['country'] }}</td>
                                <td>{{ $lead['pincode'] }}</td>
                                <td>{{ date('d/m/Y',strtotime($lead['created_at'])) }}</td>
                            </tr>
                        @endforeach
                    </tbody>
                </table>
            </div>
        </div>
    </div>
</div>

@endsection