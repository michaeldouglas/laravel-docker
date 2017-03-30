<?php  if ( ! defined('BASEPATH')) exit('No direct script access allowed');

include_once FCPATH . 'application/_core/config/_autoload.php';

/* If it's necessary this configuration can be overwritten. Insert your code below this line */

$autoload['helper'] = (is_array($autoload['helper'])) ? array_merge($autoload['helper'], array('identity', 'error', 'menu', 'attribute')) : array('identity', 'error', 'menu', 'attribute');

/* End of file autoload.php */