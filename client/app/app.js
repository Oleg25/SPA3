'use strict';

angular.module('spa3App', [
  'ngCookies',
  'ngResource',
  'ngSanitize',
  'ngGrid',
  'ngCart',
  'ngAnimate',
  'toastr',
  'btford.socket-io',
  'ui.router',
  'ui.bootstrap',
  'validation.match',
  'angularLoad',
  'cfp.hotkeys',
  'pascalprecht.translate',
  'tmh.dynamicLocale',
  'mgo-angular-wizard'
])
  .constant('LOCALES', {
    'locales': {
      'ru_RU': 'Русский',
      'en_US': 'English'
    },
    'preferredLocale': 'en_US'
  })
  .value('version', '1.1')
  .config(function($stateProvider, $urlRouterProvider, $locationProvider, $httpProvider,
                   $translateProvider,
                   toastrConfig
                  ) {
    $urlRouterProvider
      .otherwise('/');

    angular.extend(toastrConfig, {
      closeButton: true,
      timeOut: 5000
    });

    $translateProvider.useStaticFilesLoader({
      prefix: 'i18n/locale-',// path to translations files
      suffix: '.json'// suffix, currently- extension of the translations
    });
    $translateProvider.preferredLanguage('ru_RU');// is applied on first load
    $translateProvider.useLocalStorage();// saves selected language to localStorage

    $locationProvider.html5Mode(true);
    $httpProvider.interceptors.push('authInterceptor');

    /* register terraProtocol */
     /*try {
      navigator.registerProtocolHandler(
        'web+terraorder', 'http://localhost:9000/?pq=%s', 'Terra');
        }catch(err){
        console.error("Handler no supported "+err);
      }*/

  })
  // Angular Dynamic Locale
  .config(function (tmhDynamicLocaleProvider) {
    tmhDynamicLocaleProvider.localeLocationPattern('bower_components/angular-i18n/angular-locale_{{locale}}.js');
  })
  .factory('authInterceptor', function($rootScope, $q, $cookies, $injector) {
    var state;
    return {
      // Add authorization token to headers
      request: function(config) {
        config.headers = config.headers || {};
        if ($cookies.get('token')) {
            config.headers.Authorization = 'Bearer ' + $cookies.get('token');
        }
        return config;
      },

      // Intercept 401s and redirect you to login
      responseError: function(response) {
        if (response.status === 401) {
          (state || (state = $injector.get('$state'))).go('login');
          // remove any stale tokens
          $cookies.remove('token');
          return $q.reject(response);
         }
         else {
          return $q.reject(response);
        }
      }
    };
  })
  .service('UrlApi',function(){
    return {
      baseAPI:'http://192.168.9.237:8080/si/api/',
      mongoURL:'http://192.168.9.237:8080/mongo/',
      endPoint: {
        stock: '/stock/',
        product:'/product/',
        client: 'client/?search=',
        division: '/cart/divisions/',
        cartItems: 'rest/cart/',
        basketCode: 'rest/preorders/',
        basket: 'cart/create/',
        basketLines: 'cart/createLine',
        basketItems: 'order/',
        status: 'cart/status/'
      }
    }
  })
  .service('StatusConfig', function() {
    return {
      0: {title: 'Статус не определён', systemName: 'no-status'},
      10: { title: 'В заказ', systemName: 'to-order'},
      20: { title: 'Заказ создан', systemName: 'created'},
      30: { title: 'В резерв', systemName: 'to-reserve'},
      40: { title: 'Зарезервировано', systemName: 'reserved'},
      45: { title: 'В отгрузку', systemName: 'to-shipping'},
      50: { title: 'Отмена', systemName: 'cancel'},
      60: { title: 'Отменено', systemName: 'canceled'},
      90: { title: 'Закрыто', systemName: 'closed'},
      100: { title: 'Ошибка', systemName: 'error'}
    }
  })
  .factory('underscore', ['$window', function () {
    return _; // assumes underscore has already been loaded on the page
  }])

  .run(function($rootScope, $state, Auth) {
    // Redirect to login if route requires auth and the user is not logged in

    $rootScope.bodylayout = 'hold-transition skin-red-light sidebar-mini fixed';

    $rootScope.$on('$stateChangeStart', function(event, next) {
      if (next.authenticate) {
        Auth.isLoggedIn(function(loggedIn) {
          if (!loggedIn) {
            event.preventDefault();
            $state.go('login');
          }
        });
      }
    });
  });
