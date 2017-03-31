<section class="menu-mobile animated" ng-controller="MenuMobileController" ng-class="{'show fadeIn' : show}">
    <a href="//adm.wmvisit.com" class="area-admin color-1 bc-color-1">ADMIN</a>

    <div class="languages">
        <label class="title">[[ 'LANGUAGES' | translate ]]</label>
        <nav class="nav">
            <button type="button" role="menuitem" class="btn" ng-class="{'active':language.key == item.key}" ng-click="language.setLanguage(item.key)" ng-repeat="item in languages.items">
                [[ item.label ]]
            </button>
        </nav>
    </div>

    <nav class="support">
        <label class="title">[[ 'HELP_SUPPORT' | translate ]]</label>
        <a href="[[ item.href ]]" class="link" ng-repeat="item in support.items">
            [[ item.label | translate ]]
        </a>
    </nav>

    <div class="support-tel">
        <div class="content">
            <label class="title">[[ 'SUPPORT_PHONE' | translate ]]</label>
            <label class="tel">0800 771 5643</label>
        </div>
        <a href="tel:08007715643">
            <span class="icon-call-phone color-1"></span>
        </a>
    </div>
</section>