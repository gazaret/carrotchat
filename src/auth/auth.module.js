import { authState } from './auth.states';
import authComponent from './auth.component';

let authModule = angular.module('AuthModule', []);

authModule.config($stateProvider => {
  $stateProvider.state(authState);
});

authModule.component('auth', authComponent);

export default authModule = authModule.name;