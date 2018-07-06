import { signInState, signUpState } from './auth.states';
import AuthService from './services/auth.service';
import SignInComponent from './components/signIn/signIn.component';
import SignUpComponent from './components/signUp/signUp.component';


let AuthModule = angular.module('AuthModule', []);

AuthModule.config($stateProvider => {
  $stateProvider.state(signInState);
  $stateProvider.state(signUpState);
});

AuthModule.service('AuthService', AuthService);

AuthModule.component('signIn', SignInComponent);
AuthModule.component('signUp', SignUpComponent);

export default AuthModule = AuthModule.name;