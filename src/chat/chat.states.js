export const chatState = {
  name: 'chat',
  url: '/chat',
  component: 'chat',
  onEnter: ($state, AuthService, MessagesService) => {
    const isAuthenticated = AuthService.isAuthenticated();

    if (!isAuthenticated) {
      $state.go('signIn');
    }

    MessagesService.init();
  }
}