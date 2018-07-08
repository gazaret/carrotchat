import './sidePanel.scss';

class SidePanelController {
  constructor(StorageService, AuthService) {
    this.AuthService = AuthService;

    this.username = StorageService.get('username');
  }

  logout() {
    this.AuthService.logout();
  }
}

export default {
  controller: SidePanelController,
  template: require('./sidePanel.html'),
};
