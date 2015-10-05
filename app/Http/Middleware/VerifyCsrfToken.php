<?php

namespace CommonFloor\Http\Middleware;

use Closure;
use Illuminate\Foundation\Http\Middleware\VerifyCsrfToken as BaseVerifier;

class VerifyCsrfToken extends BaseVerifier {

    /**
     * Handle an incoming request.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \Closure  $next
     * @return mixed
     */

    public function handle( $request, Closure $next ) {

        // ** Added to exclude csrf protection for api/v2 methods ** //
        $req_uri = $request->getRequestUri();

        $exclude_uri = '/api/v2/';
       
        // exclude 
        if(strpos($req_uri, $exclude_uri) !== false)
        {
            return $next($request);
        }
        elseif($request->get('mihpayid')!='')
        {
            return $next($request);
        }   
        // ** Added to exclude csrf protection for api/v2 methods ** //

        return parent::handle( $request, $next );
    }

}
