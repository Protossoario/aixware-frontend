import { AixwareFrontendPage } from './app.po';

describe('aixware-frontend App', function() {
  let page: AixwareFrontendPage;

  beforeEach(() => {
    page = new AixwareFrontendPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
