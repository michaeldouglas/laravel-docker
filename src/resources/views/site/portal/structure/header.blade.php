<header class="header animated" ng-controller="HeaderController as header">
    <div class="container">
        <div class="row">
            <div class="col-xs-12 col-sm-3 col-md-3 col-md-offset-1 col-lg-3 col-lg-offset-1">
                <a href="">
                    @if($company)
                        <img class="logo-white logo" alt="" src="">
                    @else
                        <img class="logo-white logo" alt="WebMeeting Visit" src="//d6iofrior8zek.cloudfront.net/img/atitude/logos/wmvisit/wmvisit-logo-212x60.png">
                        <img class="logo-black logo hide" alt="WebMeeting Visit" src="//d6iofrior8zek.cloudfront.net/img/atitude/logos/wmvisit/wmvisit-logo-black-212x60.png">
                    @endif
                </a>

                <button class="navbar-toggle collapsed hide btn-menu" type="button" ng-click="header.menuMobile();">
                    <span class="icon-lines"></span>
                </button>
            </div>
            <div class="hidden-xs col-md-7 col-lg-7">
                <div class="dropdown dropdown-language bc-color-1-bottom_hover ">
                    [[ language.txtHeader | translate ]]
                    <span class="icon-caret-down"></span>
                    <ul class="dropdown-menu" role="menu">
                        <li role="language" ng-repeat="item in header.languages.items">
                            <button type="button" role="menuitem" class="item bg-color-1_hover" ng-class="{'bg-color-1':language.key == item.key}" ng-click="language.setLanguage(item.key)">
                                [[ item.label ]]
                            </button>
                        </li>
                    </ul>
                </div>

                <div class="dropdown dropdown-help bc-color-1-bottom_hover">
                    [[ header.help.txtMenu | translate ]]
                    <span class="icon-caret-down"></span>

                    <ul class="dropdown-menu" role="menu">
                        <li role="support" ng-repeat="item in header.help.items">
                            <a role="menuitem" target="_blank" class="item bg-color-1_hover" href="[[ item.href ]]">
                                [[ item.label | translate]]
                            </a>
                        </li>
                    </ul>
                </div>

                <span class="phone-support hidden-sm color-999999" ng-show="language.key=='pt_BR'">
          <span class="fa fa-phone"></span> <a href="tel:08007715643">0800 771 5643</a>
        </span>

                <a href="http://adm.wmvisit.com" target="_blank" class="admin-system" ng-show="language.key=='pt_BR'">
                    ADMIN
                </a>

                <a href="http://adm.wmvisit.com" target="_blank" class="admin-system hide bc-color-1 color-1" ng-show="language.key=='pt_BR'">
                    ADMIN
                </a>
            </div>
        </div>
    </div>
</header>