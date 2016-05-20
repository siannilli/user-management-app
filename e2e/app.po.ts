export class AdminPage {
  navigateTo() {
    return browser.get('/');
  }

  getParagraphText() {
    return element(by.css('admin-app h1')).getText();
  }
}
