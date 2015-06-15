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

		$whitelistIpRanges = array(
								array('106.51.254.250','106.51.254.283'),
								array('106.51.230.208','106.51.230.238'),
								array('106.51.237.24','106.51.237.33'),
								array('106.51.237.54','106.51.237.84'),
								array('182.71.253.0','182.71.253.29'),
								array('182.71.222.182','182.71.222.212'),
								array('10.0.0.0', '10.255.255.255' ),
								array('127.0.0.1', '127.0.0.1' )
								);

		$clientIpAddress = $request->getClientIp();

		foreach ($whitelistIpRanges as $whitelistIpRange) {

			$checkIpAddr = WhitelistIp::ip_exists_in_range($whitelistIpRange, $clientIpAddress);
			if ($checkIpAddr) {
				return $next($request);
			}
		}

		return response()->json( [
				'code' => 'forbidden_access',
				'message' => 'This IP has no access to the api'
				], 403 );
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
