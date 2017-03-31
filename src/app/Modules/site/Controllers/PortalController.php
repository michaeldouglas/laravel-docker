<?php

namespace Modules\site\Controllers;

use Illuminate\Routing\Controller as BaseController;
use Session;

class PortalController extends BaseController
{
    public function index()
    {
        $company = false;
        return \View::make("site::home", ['company' => $company]);
    }
}