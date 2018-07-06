export default class AuthService {
  constructor($http, StorageService, jwtHelper, API_ENDPOINT) {
    this.$http = $http;
    this.StorageService = StorageService;
    this.jwtHelper = jwtHelper;
    this.API_ENDPOINT = API_ENDPOINT;
  }

  isAuthenticated() {
    const token = this.StorageService.get('token');

    if (!token) {
      return false;
    }

    try {
      const isExpired = this.jwtHelper.isTokenExpired(token);

      return !isExpired;
    } catch (error) {
      return false;
    }
  }

  async authenticate(username, password) {
    try {
      const response = await this.$http.post(`${this.API_ENDPOINT}/api/v1/auth/login/`, {
        username,
        password,
      });

      if (!response.data.status) {
        return Promise.reject(response.data.message)
      }

      return this.StorageService.set('token', response.data.token);
    } catch (error) {
      return Promise.reject(error.data.message);
    }
  }

  async registration(username, password, confirmPassword) {
    try {
      const response = await this.$http.post(`${this.API_ENDPOINT}/api/v1/auth/registration/`, {
        username,
        password,
        confirm_password: confirmPassword,
      });

      if (!response.data.status) {
        return Promise.reject(response.data.message)
      }

      return this.StorageService.set('token', response.data.token);
    } catch (error) {
      return Promise.reject(error.data.message);
    }
  }
}