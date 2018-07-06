let ConfigModule = angular.module('ConfigModule', []);

ConfigModule.config($httpProvider => {
  $httpProvider.useApplyAsync(true);

  $httpProvider.interceptors.push((StorageService, $state, $injector) => {
    return {
      request: (config) => {
        const AuthService = $injector.get('AuthService');
        const token = AuthService.getToken();

        if (token) {
          config.headers.Authorization = `Bearer ${token}`;
        }

        return config;
      },
      responseError: (rejection) => {
        // Logout при получении 403 ошибки
        if (rejection.status === 403) {
          StorageService.clear();
          $state.go('signIn');
        }
      },
    };
  });
});

export default ConfigModule = ConfigModule.name;