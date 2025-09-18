import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ShowWrongUserResultsComponent } from './show-wrong-user-results.component';

describe('ShowWrongUserResultsComponent', () => {
  let component: ShowWrongUserResultsComponent;
  let fixture: ComponentFixture<ShowWrongUserResultsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ShowWrongUserResultsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ShowWrongUserResultsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
