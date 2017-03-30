<?php if (!defined('BASEPATH')) {exit('No direct script access allowed');
}

if (!function_exists('parse_attribute_value')) {

	function parse_attribute_value($value, $type) {
		switch ($type) {
			case 'int':
				$value = is_numeric($value)?intval($value):null;
				break;
			case 'date':
				$value = (strlen(trim($value)) >= 10)?date('d/m/Y', strtotime($value)):null;
				break;
			default:
				break;
		}
		return $value;
	}
}

if (!function_exists('parse_attribute_listing_value')) {

	function parse_attribute_listing_value($user, $value, $origin, $labelField, $valueField) {
		$result = '';

		if (is_array($origin)) {
			foreach ($origin as $info) {
				if ($value == $info->{ $valueField}) {
					$result = $info->{ $labelField};
					break;
				}
			}
		} else {
			if (property_exists($user, $labelField)) {
				$result = $user->{ $labelField};
			}
		}

		return $result;
	}
}

if (!function_exists('export_columns')) {

	function export_columns($attributes) {
		$CI = &get_instance();

		$CI->load->helper('export');
		$columns = array();

		foreach ($attributes as $attribute) {
			if ($attribute->report) {
				$report_field = $attribute->field;
				$report_type  = $attribute->dataType;

				$columns[] = get_report_field($attribute->label, $report_field, $report_type);
			}
		}

		return $columns;

	}
}

if (!function_exists('find_tree')) {

	function find_tree($user, &$tree) {
		$found = false;

		foreach ($tree as $managerId => $item) {
			if ($managerId == $user->managerId) {
				$tree[$managerId]['children'][$user->id] = array('user' => $user, 'children' => array());
				$found                                   = true;
			} else if (count($item['children'])) {
				$found = find_tree($user, $tree[$managerId]['children']);
			}
		}

		return $found;
	};
}

if (!function_exists('mount_tree')) {
	function mount_tree($user, &$tree) {
		if (strlen($user->managerId)) {
			$found = find_tree($user, $tree);

			if (!$found) {
				$tree[$user->id] = array('user' => $user, 'children' => array());
			}
		} else {
			$tree[$user->id] = array('user' => $user, 'children' => array());
		}
	};
}

if (!function_exists('mount_array_hierarchy')) {

	function mount_array_hierarchy($hierarchy) {
		$tree = array();
		foreach ($hierarchy as $user) {
			mount_tree($user, $tree);
		}

		return $tree;
	}
}