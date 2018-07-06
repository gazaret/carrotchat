export default class MessagesService {
  constructor(WEBSOCKET_ENDPOINT, AuthService, $rootScope) {
    this.WEBSOCKET_ENDPOINT = WEBSOCKET_ENDPOINT;

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
}