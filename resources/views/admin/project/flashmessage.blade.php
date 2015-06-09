   @if(Session::has('success_message'))
    <div class="alert alert-success">
    <button class="close" data-dismiss="alert"></button>
    <i class="fa fa-check-circle" style="font-size: 17px;"></i> {{ Session::get('success_message')}}
  </div>  
    @endif
   @if(Session::has('error_message'))
    <div class="alert alert-error">
    <button class="close" data-dismiss="alert"></button>
    <i class="fa fa-error" style="font-size: 17px;"></i> {{ Session::get('error_message')}}
  </div>  
    @endif
 