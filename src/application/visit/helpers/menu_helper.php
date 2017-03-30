<?php if (!defined('BASEPATH')) {exit('No direct script access allowed');
}

if (!function_exists('mount_array_menu')) {
	function mount_array_menu($menu) {
		$menu_final = array();

		$cont = 0;
		foreach ($menu as $key => $value) {
			if ($value->enabled) {
				if (empty($value->parentId)) {
					array_push($menu_final, $value);
					$last_index = $cont;
					$last_id    = $value->id;
					$cont += 1;
				}

				if (!empty($value->parentId) && $value->parentId == $last_id) {
					if (!isset($menu_final[$last_index]->submenu)) {
						$menu_final[$last_index]->submenu = array();
					}

					array_push($menu_final[$last_index]->submenu, $value);
				}
			}
		}

		return $menu_final;
	}
}

if (!function_exists('check_permission')) {
	function check_permission($uri, $uri_segments = null) {
		$CI        = &get_instance();
		$key_cache = 'user_uris_'.$CI->user_session->get_user()->id;

		if ($uri_segments !== null) {
			$uri = '';
			foreach ($uri_segments as $key => $value) {
				if ($key > 2) {break;
				}

				$uri .= '/'.$value;
			}
		}

		if ($uri{0} !== '/') {$uri = '/'.$uri;
		}

		$uris = json_decode($CI->cache->get($key_cache));

		if (in_array($uri, $uris)) {
			return true;
		} else {
			return false;
		}
	}
}

if (!function_exists('set_permissions')) {
	function set_permissions() {
		$CI        = &get_instance();
		$key_cache = 'user_uris_'.$CI->user_session->get_user()->id;

		if (isset($CI->user_session->get_user()->pages)) {
			$pages = $CI->user_session->get_user()->pages;
			$uris  = array();

			foreach ($pages as $key => $value) {
				array_push($uris, $value->uri);
			}

			$CI->cache->memcached->save($key_cache, json_encode($uris), 11211);
		}
	}
}