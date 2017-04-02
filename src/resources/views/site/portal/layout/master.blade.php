<!DOCTYPE html>
<!--[if IE 8]><html lang="pt-BR" class="ie8" ng-app="VisitPortal"><![endif]-->
<!--[if IE 9]><html lang="pt-BR" class="ie9" ng-app="VisitPortal"><![endif]-->
<!--[if !IE]><!--><html lang="pt-BR" ng-app="VisitPortal"><!--<![endif]-->
<head>
    <meta charset="utf-8"/>
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="author" content="Atitude Mídia Digital">

    <meta name="viewport" content="width=device-width, initial-scale=1, user-scalable=no">

    <title>WebMeeting Visit - Encurte distâncias. Ao vivo, via Internet</title>
    <meta name="description" content=""/>

    <link rel="shortcut icon" href="/img/wmvisit/favicon.png" type="image/x-icon"/>

    @section('styles_default')
        <link href='//fonts.googleapis.com/css?family=Lato:300,400,700' rel='stylesheet' type='text/css'>
        <link href='//fonts.googleapis.com/css?family=Open+Sans:400,700' rel='stylesheet' type='text/css'>

        {!! Html::style('https://d6iofrior8zek.cloudfront.net/ext/font-wm/1.4/styles.css') !!}

        {{-- Bootstrap --}}
            {!! Html::style(elixir('css/bootstrap.min.css')) !!}

        {{-- Loading Bar --}}
        {!! Html::style('https://d6iofrior8zek.cloudfront.net/css/plugin/angular.loading.bar/0.5.0/loading-bar.css') !!}

        {{-- Animate --}}
        {!! Html::style('https://d6iofrior8zek.cloudfront.net/ext/bootstrap/3.2.0/css/bootstrap.min.css') !!}

        {{-- Verificações de Internet Explorer --}}

        <!--[if (gte IE 6) & (lte IE 8)]>
            <script src="https://d6iofrior8zek.cloudfront.net/js/commons/respond/1.4.2/respond.min.js"></script>

            <link href="'https://d6iofrior8zek.cloudfront.net/js/commons/respond/1.4.2/respond-proxy.html" id="respond-proxy" rel="respond-proxy"/>

            <link href="'https://d6iofrior8zek.cloudfront.net/js/respond.proxy.gif" id="respond-redirect" rel="respond-redirect"/>
            <script src="'https://d6iofrior8zek.cloudfront.net/js/respond.proxy.js"></script>
        <![endif]-->

        <!--[if lt IE 9]>
            <script src="https://d6iofrior8zek.cloudfront.net/js/plugin/json3/3.2.6/json3.min.js"></script>
            <script src="https://d6iofrior8zek.cloudfront.net/js/plugin/html5shiv/html5shiv.3.7.0.min.js"></script>
            <script src="https://d6iofrior8zek.cloudfront.net/js/plugin/ie.polyfills/1.0.0/polyfills.min.js"></script>
        <![endif]-->
    @show

    @section('styles_layout')
        {!! Html::style(elixir('css/style.css')) !!}
    @show

    @if ($company)
        <!-- @TODO: <link href=" site_url() service/personalize/css/ company.id / version " rel="stylesheet" type="text/css"> -->
    @endif

    <!-- Gera uma chave para evitar o ataque de Cross Site Request Forgery -->
    <script>
        window.Laravel = <?php echo json_encode([
            'csrfToken' => csrf_token(),
        ]); ?>

    </script>
</head>

<body role="document" data-type-page="" data-version="" ng-controller="LanguageController as language" class="portal"
      ng-class="language.key">
    <div id="loader" class="animated">
        <img src="//d6iofrior8zek.cloudfront.net/img/wmvisit/portal/loader.gif"/>
    </div>

    <div id="pre-loader" class="hide" ng-controller="PortalController" ng-init="init();">
    @include('site.portal.structure.header') <!-- @TODO: Inserir o HTML da estrutura -->
    @include('site.portal.structure.menu-mobile')  <!-- @TODO: Inserir o HTML do menu mobile -->

        <section class="main" role="main">
        @include('site.portal.modules.auth') <!-- @TODO: Inserir o HTML do modulos -->

        @include('site.portal.modules.banner')  <!-- @TODO: Inserir o HTML do banner -->

            @if ( FALSE ) <!-- @TODO: Trazer a lógica desses modulos: company tem que ser is not definied -->
                @include('site.portal.modules.award')
                @include('site.portal.modules.features')
                @include('site.portal.modules.apps')
                @include('site.portal.modules.ceo-msg')
                @include('site.portal.modules.contact')
            @endif
        </section>

        @if ($company)
            @include('site.portal.structure.footer-client')
        @else
            @include('site.portal.structure.footer')
        @endif
</div>

    <!-- Chama dos JS principais do site -->
    @section('scripts_default')
        {!! HTML::script('https://d6iofrior8zek.cloudfront.net/js/framework/angular/1.2.20/angular.min.js') !!}
        {!! HTML::script('https://d6iofrior8zek.cloudfront.net/js/plugin/angular.translate/2.2.0/angular-translate.min.js') !!}
        {!! HTML::script('https://d6iofrior8zek.cloudfront.net/js/plugin/angular.loading.bar/0.5.0/loading-bar.js') !!}
        {!! HTML::script('https://d6iofrior8zek.cloudfront.net/js/plugin/angular.loading.bar/0.5.0/loading-bar.js') !!}
        {!! HTML::script('https://d6iofrior8zek.cloudfront.net/js/plugin/angular.scroll/angular-scroll.min.js') !!}
        {!! HTML::script('https://d6iofrior8zek.cloudfront.net/js/plugin/angular.focus-if/focusIf.min.js') !!}
        {!! HTML::script('https://d6iofrior8zek.cloudfront.net/plugins/sawpf/sawpf.min.1.0.js') !!}
    @show

    @section('scripts_layout')
        {{-- @TODO: Rever se realmente esses scripts são necessários --}}
        {!! HTML::script('https://d6iofrior8zek.cloudfront.net/js/framework/angular/1.2.20/angular.min.js') !!}
        {!! HTML::script('https://d6iofrior8zek.cloudfront.net/js/plugin/angular.translate/2.2.0/angular-translate.min.js') !!}
        {!! HTML::script('https://d6iofrior8zek.cloudfront.net/js/plugin/angular.loading.bar/0.5.0/loading-bar.js') !!}
        {!! HTML::script('https://d6iofrior8zek.cloudfront.net/plugins/sawpf/sawpf.min.1.0.js') !!}
    @show

    @section('scripts_portal_default')
        {!! HTML::script(elixir('js/wmvisit-portal.js')) !!}
    @show
</body>
</html>