import { chatState } from './chat.states';

import MessagesService from './services/messages.service';
import ChatComponent from './components/chat/chat.component';
import MessagesComponent from './components/messages/messages.component';
import MessageComponent from './components/message/message.component';
import SidePanelComponent from './components/sidePanel/sidePanel';

let ChatModule = angular.module('ChatModule', []);

ChatModule.config($stateProvider => {
  $stateProvider.state(chatState);
});

ChatModule.service('MessagesService', MessagesService);

ChatModule.component('chat', ChatComponent);
ChatModule.component('messages', MessagesComponent);
ChatModule.component('message', MessageComponent);
ChatModule.component('sidePanel', SidePanelComponent);

export default ChatModule = ChatModule.name;