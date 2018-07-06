import './messages.scss';

class MessagesController {
  constructor(MessagesService, $scope, $rootScope) {
    this.MessagesService = MessagesService;
    this.$scope = $scope;

    this.message = '';
    this.messages = [];

    this.getMessagesHistory();

    $rootScope.$on('chat_message', (event, messageData) => {
      console.info('receive messge', messageData);
      this.messages.push(messageData);
      $scope.$apply();
    })
  }

  sendMessage(event) {
    if (event.keyCode === 13) {
      // Не будем отправлять пустое сообщение
      if (!this.message) {
        return;
      }

      this.MessagesService.sendMessage(this.message);
      this.message = '';
    }
  }

  async getMessagesHistory() {
    try {
      const prevMessages = await this.MessagesService.getMessagesHistory();

      this.messages = this.messages.concat(prevMessages);

      this.$scope.$apply();
    } catch (error) {}
  }
}

export default {
  controller: MessagesController,
  template: require('./messages.html'),
}