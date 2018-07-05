import 'babel-polyfill';
import * as angular from 'angular';
import uiRouter from "@uirouter/angularjs";
import 'angular-ui-bootstrap';

import './app.scss';
import authModule from './auth/auth.module';

const app = angular.module('carrotChat', [
  'ui.bootstrap',
  uiRouter,
  authModule,
]);

app.config($urlRouterProvider => {
  $urlRouterProvider.otherwise('signIn');
});