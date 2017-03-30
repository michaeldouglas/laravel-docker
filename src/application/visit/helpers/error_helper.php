<?php if (!defined('BASEPATH')) {exit('No direct script access allowed');
}

if (!function_exists('_custom_exception_handler')) {
	function _custom_exception_handler($severity, $message, $filepath, $line) {
		$headers = getallheaders();

		if ($severity == E_STRICT) {
			return;
		}

		if (stripos($headers['Accept'], 'application/json') !== FALSE) {
			header('Content-Type: application/json');
			header('Cache-Control: no-store, no-cache, must-revalidate');
			header('Cache-Control: post-check=0, pre-check=0');
			header('Pragma: no-cache');

			$data = array(
				'result'   => false,
				'error'    => true,
				'severity' => $severity,
				'message'  => $message,
				'filepath' => $filepath,
				'line'     => $line,
			);

			ob_start();
			ob_get_contents();
			ob_end_clean();

			echo json_encode($data);
		} else {
			_exception_handler($severity, $headers_message, $filepath, $line);
		}
	}
}