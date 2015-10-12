'use strict';

angular.module('spa3App', [
  'ngCookies',
  'ngResource',
  'ngSanitize',
  'ngGrid',
  'btford.socket-io',
  'ui.router',
  'ui.bootstrap',
  'validation.match',
  'angularLoad'
])
  .constant('REST_API', 'http://192.168.9.237:8080/si/api/')
  .value('version', '1.1')
  .config(function($stateProvider, $urlRouterProvider, $locationProvider, $httpProvider
                  ) {
    $urlRouterProvider
      .otherwise('/');

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
