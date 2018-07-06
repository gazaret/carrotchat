export default class MessagesService {
  constructor(WEBSOCKET_ENDPOINT, API_ENDPOINT, $http, AuthService, $rootScope) {
    this.API_ENDPOINT = API_ENDPOINT;
    this.$http = $http;

    const token = AuthService.getToken();

    this.ws = new WebSocket(`${WEBSOCKET_ENDPOINT}/ws/chat/?token=${token}`);

    this.ws.onerror = (error) => {
      console.info('WebSocket error:', error);
    }

    this.ws.onclose = (message) => {
      // При ошибке авторизации сделаем logout
      if (message.code === 1006) {
        AuthService.logout();
      }
    }

    this.ws.onmessage = (message) => {
      const messageData = JSON.parse(message.data);

      $rootScope.$emit('chat_message', messageData);
    }
  }

  sendMessage(message) {
    this.ws.send(JSON.stringify({ message }));
  }

  async getMessagesHistory() {
    try {
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
}