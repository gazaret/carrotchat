export default class AuthService {
  constructor($http, StorageService, jwtHelper, $state, API_ENDPOINT) {
    this.$http = $http;
    this.StorageService = StorageService;
    this.jwtHelper = jwtHelper;
    this.$state = $state;
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

      this._saveCredentials(response.data.username, response.data.token);
    } catch (error) {
      return this._errorHandler(error);
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

      this._saveCredentials(response.data.username, response.data.token);
    } catch (error) {
      return this._errorHandler(error);
    }
  }

  getToken() {
    return this.StorageService.get('token');
  }

  logout() {
    this.StorageService.clear();
    this.$state.go('signIn');
  }

  _saveCredentials(username, token) {
    this.StorageService.set('username', username);
    this.StorageService.set('token', token);
  }

  _errorHandler(error) {
    if (!error.data || !error.data.message) {
      return Promise.reject('Ошибка сервера');
    }

    return Promise.reject(error.data.message);
  }
}