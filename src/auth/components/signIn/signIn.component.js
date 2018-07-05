import './signIn.scss';

class SignInController {
  login() {
    console.info('login');
  }
}

export default {
  controller: SignInController,
  template: require('./signIn.html')
}