import 'babel-polyfill';
import * as angular from 'angular';
import uiRouter from "@uirouter/angularjs";
import 'angular-ui-bootstrap';

import authModule from './auth/auth.module';

const app = angular.module('carrotChat', [
  uiRouter,
  authModule,
]);

app.config($urlRouterProvider => {
  $urlRouterProvider.otherwise('auth');
});

export default app;