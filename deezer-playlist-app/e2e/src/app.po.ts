import { browser, by, element } from 'protractor';

export class AppPage {
  navigateTo() {
    return browser.get(browser.baseUrl) as Promise<any>;
  }

  getTitleText() {
    return element(by.css('.title')).getText() as Promise<string>;
  }

  getAllCardElement() {
    return element.all(by.css('.card'));
  }

  getFirstCardElement() {
    return element(by.css('.card'));
  }

  getOpenGridView() {
    return element(by.tagName('app-playlist-grid'));
  }

  getOpenDetailView() {
    return element(by.tagName('app-playlist-detail'));
  }

  getOpenDetailTracks() {
    return element(by.tagName('app-playlist-detail'));
  }

  getOpenDetailHeader() {
    return element(by.tagName('app-track-display'));
  }
}
