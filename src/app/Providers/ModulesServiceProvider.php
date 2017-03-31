<?php

namespace wmvisit\Providers;

use Illuminate\Support\ServiceProvider;

class ModulesServiceProvider extends ServiceProvider
{

    private $modules;

    public function getConfigModules()
    {
        return $this->modules;
    }

    public function setConfigModules(array $files)
    {
        if (count($files) > 0) {
            $this->modules = $files;
        }

        $this->modules = config('module');
    }

    private function setRequireFiles()
    {
        while (list(, $module) = each($this->modules)) {
            $this->setFile($module, 'routes.php')->setFiles();
            $this->setViewFile($module)->setViewFiles($module);
        }
    }

    private function setFile($module, $file)
    {
        $this->file = __DIR__ . "/../Modules/{$module}/$file";
        return $this;
    }


    private function setFiles()
    {
        if (file_exists($this->file)) {
            include $this->file;
        }

        return false;
    }

    private function setViewFile($module)
    {
        $this->view = __DIR__ . "/../Modules/{$module}/Views";
        return $this;
    }


    private function setViewFiles($module)
    {
        if (is_dir($this->view)) {
            $this->loadViewsFrom($this->view, $module);
        }

        return false;
    }

    /**
     * Bootstrap the application services.
     *
     * @return void
     */
    public function boot()
    {
        $this->setRequireFiles();
    }

    /**
     * Register the application services.
     *
     * @return void
     */
    public function register()
    {
        $this->setConfigModules([]);
    }
}
