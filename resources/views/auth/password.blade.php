@extends('app')

@section('content')

<div class="container">
    <div class="panel panel-default">
             <img src="http://asset2.cfcdn.com/cfassets/images/logo-tab.png" class="inline">
<span class="header">Reset Password</span>
                <div class="panel-body">
                    @include('admin.project.flashmessage')
                   
                    <div class="panel-body">
                    <form class="form-horizontal" role="form" method="POST" action="/password/email">
                        <input type="hidden" name="_token" value="{{ csrf_token() }}">

                        <div class="form-group">
                            <label class="form-label">E-Mail Address</label>
                            <div >
                                <input type="email" class="form-control" name="email" value="{{ old('email') }}">
                            </div>
                        </div>

                        <div class="form-group text-center">
                            <button type="submit" class="btn btn-primary" style="background:#f68121;color:#fff;border: none;">
                                    Send Password Reset Link
                                </button>
                        </div>
                    </form>
                </div>
                </div>
            </div>
       
   
</div>
@endsection
