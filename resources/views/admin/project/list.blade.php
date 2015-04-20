@extends('layouts.master')

@section('content')
<!-- BEGIN PAGE TITLE -->
<div class="page-title">	
    <h2><span class="semi-bold">View</span> Projects</h2>
</div>
<div class="row">
    <div class="col-md-12">
        <div class="grid simple">
            <div class="grid-title">
                <h4>List of <span class="semi-bold">Projects</span></h4>
                <a class="btn btn-primary pull-right" href="{{ url('/admin/project/create') }}" >+ Add Project</a>
            </div>
            <div class="grid-body">
                <table class="table table-striped projectList" id="example2" >
                    <thead>
                        <tr>
                            <th>Project Name</th>
                            <th>City</th>
                            <th>Status</th>
                            <th>Created On</th>
                            <th>Created By</th>
                            <th>Modified On</th>
                            <th>Modified By</th>
                        </tr>
                    </thead>
                    <tbody> 
                        @foreach ($projects as $project)
                            <tr class="">
                                <td><a href="{{ url( '/admin/project/' . $project['id'] . '/edit') }}">{{ $project['project_title'] }}</a></td>
                                <td>{{ $project['city'] }}</td>
                                <td>{{ ucfirst($project['status']) }}</td>
                                <td>{{ date('d/m/Y',strtotime($project['created_at'])) }}</td>
                                <td class="center">{{ $project['created_by'] }}</td>
                                <td>{{  date('d/m/Y',strtotime($project['updated_at'])) }}</td>
                                <td class="center">{{ $project['updated_by'] }}</td>
                            </tr>
                        @endforeach
                    </tbody>
                </table>
            </div>
        </div>
    </div>
</div>
<script type="text/javascript">
    $('#example2.projectList tbody td i').on('click', function () {
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
        sOut += '<option value="draft">Draft</option>';
        sOut += '<option value="in_progress">In progress</option>';
        sOut += '<option value="published">Published</option>';
        sOut += '<option value="archived">Archived</option>';
        sOut += '</select>'; 
        sOut += '<button class="btn btn-small btn-primary m-l-10">Save</button></td></tr>';
        sOut += '</table>';

        return sOut;
 
    }
</script>
@endsection