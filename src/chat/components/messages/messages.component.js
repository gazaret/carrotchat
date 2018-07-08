import './messages.scss';
import './dropdown-popup.scss';

class MessagesController {
  constructor(MessagesService, $scope, $rootScope) {
    this.MessagesService = MessagesService;
    this.$scope = $scope;

    this.message = '';
    this.messages = [];
    this.commands = [];

    this.getMessagesHistory();
    this.getCommands();

    $rootScope.$on('chat_message', (event, messageData) => {
      console.info('receive messge', messageData);
      this.messages.push(messageData);
      $scope.$apply();
    })

    $scope.$watch('$ctrl.message', (current) => {

    })
  }

  sendMessage(event) {
    if (event.keyCode === 13) {
      // Не будем отправлять пустое сообщение
      if (!this.message) {
        return;
      }

      if (this.message[0] === '/') {
        const command = this.commands.find(command => this.message === command);

        if (command) {
          this.message = '';
          return this.MessagesService.sendCommand(command)
        }
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

  async getCommands() {
    try {
      this.commands = await this.MessagesService.getCommands();

      this.$scope.$apply();
    } catch (error) {}
  }
}

export default {
  controller: MessagesController,
  template: require('./messages.html'),
}