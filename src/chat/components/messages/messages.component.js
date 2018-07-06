import './messages.scss';

class MessagesController {
  constructor(MessagesService, $scope, $rootScope) {
    this.MessagesService = MessagesService;

    this.a = 'abc';
    this.b = 'cba';

    this.message = '';
    this.messages = [];

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
}

export default {
  controller: MessagesController,
  template: require('./messages.html'),
}