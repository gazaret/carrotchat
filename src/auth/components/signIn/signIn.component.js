import './signIn.scss';

class SignInController {
  constructor(AuthService, $scope, $state) {
    this.AuthService = AuthService;
    this.$scope = $scope;
    this.$state = $state;

    this.errorMessage = '';
  }

  async login() {
    if (!this.username || !this.password) {
      return;
    }

    try {
      await this.AuthService.authenticate(this.username, this.password)

      this.errorMessage = '';

      this.$state.go('chat');
    } catch (error) {
      this.errorMessage = error;
    }

    this.$scope.$apply();

  }
}

export default {
  controller: SignInController,
  template: require('./signIn.html'),
}