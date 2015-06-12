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
		$whitelistIp =['127.0.0.1','172.20.14.251'];

		$clientIpAddress = $request->getClientIp();

		if (!in_array($clientIpAddress, $whitelistIp)) {
			return response()->json( [
				'code' => 'forbidden_access',
				'message' => 'This IP has no access to the api'
				], 403 );
		}

		return $next($request);
	}

}
