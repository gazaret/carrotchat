let ConfigModule = angular.module('ConfigModule', []);

ConfigModule.config($httpProvider => {
  $httpProvider.useApplyAsync(true);

  $httpProvider.interceptors.push((StorageService, $state) => {
    return {
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