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
    @include('site.portal.structure.js')
    @include('site.portal.structure.js')

    <script type="text/javascript" src="wmvisit-portal.js"></script>

</body>
</html>