import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SmallScreenNavBarComponent } from './small-screen-nav-bar.component';

describe('SmallScreenNavBarComponent', () => {
  let component: SmallScreenNavBarComponent;
  let fixture: ComponentFixture<SmallScreenNavBarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SmallScreenNavBarComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SmallScreenNavBarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
