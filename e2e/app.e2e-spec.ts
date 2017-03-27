import { ZenKanbanPage } from './app.po';

describe('zen-kanban App', () => {
  let page: ZenKanbanPage;

  beforeEach(() => {
    page = new ZenKanbanPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
