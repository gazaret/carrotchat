export const chatState = {
  name: 'chat',
  url: '/chat',
  component: 'chat',
  onEnter: ($state, AuthService) => {
    const isAuthenticated = AuthService.isAuthenticated();

    if (!isAuthenticated) {
      $state.go('signIn');
    }
  }
}