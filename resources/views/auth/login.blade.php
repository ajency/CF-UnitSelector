@extends('app')

@section('content')
<div class="container">
    <div class="panel panel-default">

                <img src="http://asset2.cfcdn.com/cfassets/images/logo-tab.png" class="inline">
                <span class="header">Sign In</span>
                <div class="panel-body">
                    @if (count($errors) > 0)
                    <div class="alert alert-danger">
                        <strong>Whoops!</strong> There were some problems with your input.<br><br>
                        <ul>
                            @foreach ($errors->all() as $error)
                            <li>{{ $error }}</li>
                            @endforeach
                        </ul>
                    </div>
                    @endif
                    <div class="panel-body">
                    <form class="form-horizontal" role="form" method="POST" action="{{ url('auth/login') }}">
                        <input type="hidden" name="_token" value="{{ csrf_token() }}">
                            <div class="form-group">
                            <label class="form-label">E-Mail Address</label>
                            <div class="">
                                <input type="email" class="form-control" name="email" value="{{ old('email') }}">
                            </div>
                        </div>

                        <div class="form-group">
                            <label class="form-label">Password</label>
                            <div class="">
                                <input type="password" class="form-control" name="password">
                            </div>
                        </div>
 
                        <div class="form-group">
                           
                               <div class="row">
                            <div class="col-md-6">
                            <button type="submit" class="btn btn-default">
                                    Sign In
                                </button>
                            </div>
                            <div class="col-md-6 text-right">
                                <h5>
                              <a href="{{ url('password/email') }}" >Forgot Your Password?</a>
                          </h5>
                          </div>
                          </div>
                        </div>
                         
                    </form>
                    </div>
                </div>
            </div>
    
@endsection
