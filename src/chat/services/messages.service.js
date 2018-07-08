export default class MessagesService {
  constructor(WEBSOCKET_ENDPOINT, API_ENDPOINT, $http, AuthService, $rootScope) {
    this.WEBSOCKET_ENDPOINT = WEBSOCKET_ENDPOINT;
    this.API_ENDPOINT = API_ENDPOINT;
    this.$http = $http;
    this.AuthService = AuthService;
    this.$rootScope = $rootScope;

    this.ws = null;

    // При событии logout отключим пользователя от сокетов
    $rootScope.$on('logout', () => this.disconnect());
  }

  /**
   * Инициализация сокетов
   */
  init() {
    const token = this.AuthService.getToken();

    // К сожалению на клиенте нельзя менять хедеры в ws запросе, поэтому токен передаем через query параметр
    this.ws = new WebSocket(`${this.WEBSOCKET_ENDPOINT}/ws/chat/?token=${token}`);

    this.ws.onerror = (error) => {
      console.info('WebSocket error:', error);
    }

    this.ws.onclose = (message) => {
      // При ошибке авторизации сделаем logout
      if (message.code === 1006) {
        this.AuthService.logout();
      }
    }

    this.ws.onmessage = (message) => {
      const messageData = JSON.parse(message.data);

      // Сообщаем компоненту о получении нового сообщения
      this.$rootScope.$emit('chat_message', messageData);
    }
  }

  /**
   * Отправка сообщения
   * @param message сообщение
   */
  sendMessage(message) {
    this.ws.send(JSON.stringify({ type: 'chat_message', message }));
  }

  /**
   * Отправка специальной команды
   * @param command
   */
  sendCommand(command) {
    this.ws.send(JSON.stringify({ type: 'chat_command', command }));
  }

  /**
   * Отключение пользователя от чата
   */
  disconnect() {
    if (this.ws) {
      this.ws.close();
    }
  }

  /**
   * Получение истории сообщений
   * @returns {Promise<*>}
   */
  async getMessagesHistory() {
    try {
      // TODO: сейчас возвращается 10 последних сообщений, сделать получение сообщений по парамерам
      const response = await this.$http.get(`${this.API_ENDPOINT}/api/v1/chat/messages/`);

      if (!response.data.status) {
        return Promise.reject();
      }

      return response.data.messages.map(message => ({
          username: message.account.username,
          message: message.message,
          created: message.created,
      }));
    } catch (error) {}
  }

  /**
   * Получение списка специальных команд
   * @returns {Promise<*>}
   */
  async getCommands() {
    try {
      const response = await this.$http.get(`${this.API_ENDPOINT}/api/v1/chat/commands/`);

      if (!response.data.status) {
        return Promise.reject();
      }

      const commands = response.data.commands;

      return commands;
    } catch (error) {}
  }
}