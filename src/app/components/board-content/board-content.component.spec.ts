import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BoardContentComponent } from './board-content.component';

describe('BoardContentComponent', () => {
  let component: BoardContentComponent;
  let fixture: ComponentFixture<BoardContentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BoardContentComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BoardContentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
