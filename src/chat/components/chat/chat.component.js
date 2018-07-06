import './chat.scss';

class ChatController {
  constructor(MessagesService) {
    this.MessagesService = MessagesService;
  }
}

export default {
  controller: ChatController,
  template: require('./chat.html'),
}