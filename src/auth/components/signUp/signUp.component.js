import './signUp.scss';

class SignUpController {
  constructor(AuthService, $scope, $state) {
    this.AuthService = AuthService;
    this.$scope = $scope;
    this.$state = $state;

    this.errorMessage = '';
  }

  async registration() {
    if (!this.username || !this.password || !this.confirmPassword || this.password !== this.confirmPassword) {
      return;
    }

    try {
      await this.AuthService.registration(this.username, this.password, this.confirmPassword);

      this.errorMessage = '';

      this.$state.go('chat');
    } catch (error) {
      this.errorMessage = error;
    }

    this.$scope.$apply();
  }
}

export default {
  controller: SignUpController,
  template: require('./signUp.html'),
}