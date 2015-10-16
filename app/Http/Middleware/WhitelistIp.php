<?php namespace CommonFloor\Http\Middleware;

use Closure;

class WhitelistIp {

	/**
	 * Handle an incoming request.
	 *
	 * @param  \Illuminate\Http\Request  $request
	 * @param  \Closure  $next
	 * @return mixed
	 */
	public function handle($request, Closure $next)
	{	
        
        $dnsList = config('constant.cf_dns_list'); 
		$getHost = $_SERVER['HTTP_HOST'];dd($getHost);
       
  //       if (!in_array($getHost, $dnsList)) {
		// 	return response()->json( [
		// 		'code' => 'forbidden_access',
		// 		'message' => 'This '.$getHost.' has no access to the api'
		// 		], 403 );
		// }
        
        return $next($request);
	}
    
    public function dnsToIp($dns)
    {
        $ips=[];
        foreach($dns as $value)
        {
            $ips[]=gethostbyname($value);
        }
            return $ips;
    }

	public static function ip_exists_in_range($range, $ip) 
	{ 
		if (ip2long($ip) >= ip2long($range[0]) && ip2long($ip) <= ip2long($range[1])) 
		{ 
			return true; 
		} 
		return false; 
	}

}
