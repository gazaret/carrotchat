export default class AuthService {
  constructor($http, StorageService, jwtHelper, $state, $rootScope, API_ENDPOINT) {
    this.$http = $http;
    this.StorageService = StorageService;
    this.jwtHelper = jwtHelper;
    this.$state = $state;
    this.$rootScope = $rootScope;
    this.API_ENDPOINT = API_ENDPOINT;
  }

  /**
   * Проверка, авторизован ли пользователь
   * @returns {boolean}
   */
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

  /**
   * Аунтификация пользователя
   * @param username логин
   * @param password пароль
   * @returns {Promise<*>}
   */
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

  /**
   * Регистрация пользователя
   * @param username логин
   * @param password пароль
   * @param confirmPassword подтверждение пароля
   * @returns {Promise<*>}
   */
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

  /**
   * Получение токена пользователя
   * @returns {*}
   */
  getToken() {
    return this.StorageService.get('token');
  }

  /**
   * Выход из аккаунта пользователя
   */
  logout() {
    this.$rootScope.$emit('logout');
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