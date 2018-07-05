import { signInState } from './auth.states';
import signInComponent from './components/signIn/signIn.component';

let authModule = angular.module('AuthModule', []);

authModule.config($stateProvider => {
  $stateProvider.state(signInState);
});

authModule.component('signIn', signInComponent);

export default authModule = authModule.name;