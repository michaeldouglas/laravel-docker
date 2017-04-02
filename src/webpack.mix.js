const { mix } = require('laravel-mix');

/*
 |--------------------------------------------------------------------------
 | Mix Asset Management
 |--------------------------------------------------------------------------
 |
 | Mix provides a clean, fluent API for defining some Webpack build steps
 | for your Laravel application. By default, we are compiling the Sass
 | file for the application as well as bundling up all the JS files.
 |
 */

// Default Laravel
mix.js('resources/assets/js/app.js', 'public/js')
   .sass('resources/assets/sass/app.scss', 'public/css');

// Estilo do Layout do Visit
mix.styles([
    'resources/assets/css/site/portal/base.css',
    'resources/assets/css/site/portal/menu-mobile.css',
    'resources/assets/css/site/portal/header.css',
    'resources/assets/css/site/portal/auth.css',
    'resources/assets/css/site/portal/banner.css',
    'resources/assets/css/site/portal/award.css',
    'resources/assets/css/site/portal/features.css',
    'resources/assets/css/site/portal/apps.css',
    'resources/assets/css/site/portal/ceo-msg.css',
    'resources/assets/css/site/portal/contact.css',
    'resources/assets/css/site/portal/footer.css',
    'resources/assets/css/site/portal/responsive.css'
], 'public/css/style.css');


mix.styles('resources/assets/css/bootstrap/bootstrap.css' ,'public/css/bootstrap.min.css');
// Scripts do Layout do Visit
/*
mix.js([
    resources/assets/js/site/portal/main.js,
    'resources/assets/js/site/portal/services/language.js',
    'resources/assets/js/site/portal/controllers/portal.js',
    'resources/assets/js/site/portal/controllers/language.js',
    'resources/assets/js/site/portal/controllers/auth.js',
    'resources/assets/js/site/portal/controllers/header.js',
    'resources/assets/js/site/portal/controllers/banner.js',
    'resources/assets/js/site/portal/controllers/contact.js',
    'resources/assets/js/site/portal/controllers/footer.js',
    'resources/assets/js/site/portal/controllers/menu-mobile.js'
], 'public/js/wmvisit-portal.js');*/