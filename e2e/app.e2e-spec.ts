import { UscrimePage } from './app.po';

describe('uscrime App', () => {
  let page: UscrimePage;

  beforeEach(() => {
    page = new UscrimePage();
  });

  it('should display welcome message', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('Welcome to app!!');
  });
});
