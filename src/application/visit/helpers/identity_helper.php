<?php if (!defined('BASEPATH')) {exit('No direct script access allowed');
}

if (!function_exists('get_identity_code')) {
	function get_identity_code($number) {
		$codeset = '8L4RwBV5mNsi79XyuD6aT1kgJcZPFHe3q2';

		$base      = strlen($codeset);
		$n         = $number+100000;
		$converted = '';

		while ($n > 0) {
			$converted = substr($codeset, ($n%$base), 1).$converted;
			$n         = floor($n/$base);
		}

		return $converted;
	}
}

if (!function_exists('get_code_identity')) {
	function get_code_identity($code) {
		$codeset   = '8L4RwBV5mNsi79XyuD6aT1kgJcZPFHe3q2';
		$base      = strlen($codeset);
		$converted = $code;
		$c         = 0;
		for ($i = strlen($converted); $i; $i--) {
			$char = substr($converted, (-1*($i-strlen($converted))), 1);
			$c += stripos($codeset, $char)*pow($base, $i-1);
		}
		return intval($c-100000);
	}
}

if (!function_exists('get_session_code')) {
	function get_session_code($number) {
		$base_codeset = '8L4RwBV5mNsi79XyuD6aT1kgJcZPFHe3q2';

		$n         = $number+100000;
		$converted = '';

		$codeset = substr($base_codeset, ($number%strlen($base_codeset)), strlen($base_codeset));
		$codeset = $codeset.substr($base_codeset, 0, strlen($base_codeset)-strlen($codeset));

		$base = strlen($codeset);

		while ($n > 0) {
			$converted = substr($codeset, ($n%$base), 1).$converted;
			$n         = floor($n/$base);
		}

		return strtoupper($converted);
	}
}

if (!function_exists('get_client_key')) {
	function get_client_key($code) {
		$salt = 'ja=9%5/_r%T1C%-c9o+|9!JnU)_b)!^~|%ke)MxZ#h#!eYU(z!76FN+M.1{Dk)xZ';
		return sha1($code.$salt);
	}
}

if (!function_exists('get_server_key')) {
	function get_server_key($code) {
		$salt = 'PAPplM3+p;dMpq?kLSg=ZWmB7#|NB-dBZxLtY.$h&TfVx!+Q?@in$5j=H]qpoD2Z';
		return sha1($code.$salt);
	}
}

if (!function_exists('generate_customer_access_key')) {
	function generate_customer_access_key($session_code, $customer_email) {
		$salt = 'PAPplM3+p;dMpq?kLSg=ZWmB7#|NB-dBZxLtY.$h&TfVx!+Q?@in$5j=H]qpoD2Z';
		return sha1(strtoupper($session_code).strtolower($customer_email));
	}
}