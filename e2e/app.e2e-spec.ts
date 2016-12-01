import { UserManagementAppMigrationPage } from './app.po';

describe('user-management-app-migration App', function() {
  let page: UserManagementAppMigrationPage;

  beforeEach(() => {
    page = new UserManagementAppMigrationPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
