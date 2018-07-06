import 'babel-polyfill';
import * as angular from 'angular';
import uiRouter from "@uirouter/angularjs";
import 'angular-ui-bootstrap';
import 'angular-jwt';

import './app.scss';
import ConstantModule from './app.constants';
import ConfigModule from './app.config';
import GlobalModule from './global/global.module';
import AuthModule from './auth/auth.module';
import ChatModule from './chat/chat.module';

const app = angular.module('carrotChat', [
  'ui.bootstrap',
  'angular-jwt',
  uiRouter,
  ConstantModule,
  ConfigModule,
  GlobalModule,
  AuthModule,
  ChatModule,
]);

app.config($urlRouterProvider => {
  $urlRouterProvider.otherwise('signIn');
});