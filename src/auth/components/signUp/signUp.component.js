import './signUp.scss';

class SignUpController {
  constructor(AuthService, $scope) {
    this.AuthService = AuthService;
    this.$scope = $scope;

    this.errorMessage = '';
  }

  async registration() {
    if (!this.username || !this.password || !this.confirmPassword || this.password !== this.confirmPassword) {
      return;
    }

    try {
      await this.AuthService.registration(this.username, this.password, this.confirmPassword);

      this.errorMessage = '';
    } catch (error) {
      this.errorMessage = error;
    }

    this.$scope.$apply();
  }
}

export default {
  controller: SignUpController,
  template: require('./signUp.html')
}