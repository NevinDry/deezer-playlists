import { AppPage } from './app.po';
import { browser, logging } from 'protractor';

describe('Deezer App e2e tests', () => {
  let page: AppPage;

  beforeEach(() => {
    page = new AppPage();
  });

  it('should display welcome message', () => {
    page.navigateTo();
    expect(page.getTitleText()).toContain('Deezer Playlists from');
  });

  it('should display playlist cards', () => {
    page.navigateTo();
    expect(page.getOpenGridView()).toBeTruthy();
    expect(page.getAllCardElement().count()).toBeGreaterThan(0);
  });

  it('should open  details view from a particular playlist', () => {
    page.navigateTo();
    page.getFirstCardElement().click();

    expect(page.getOpenDetailView()).toBeTruthy();
    expect(page.getOpenDetailHeader()).toBeTruthy();
    expect(page.getOpenDetailTracks()).toBeTruthy();
  });

  afterEach(async () => {
    // Assert that there are no errors emitted from the browser
    const logs = await browser.manage().logs().get(logging.Type.BROWSER);
    expect(logs).not.toContain(jasmine.objectContaining({
      level: logging.Level.SEVERE,
    } as logging.Entry));
  });
});
