import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LoggedpageComponent } from './loggedpage.component';

describe('LoggedpageComponent', () => {
  let component: LoggedpageComponent;
  let fixture: ComponentFixture<LoggedpageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LoggedpageComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LoggedpageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
