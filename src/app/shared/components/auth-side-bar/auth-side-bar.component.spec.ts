import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AuthSideBarComponent } from './auth-side-bar.component';

describe('AuthSideBarComponent', () => {
  let component: AuthSideBarComponent;
  let fixture: ComponentFixture<AuthSideBarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AuthSideBarComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AuthSideBarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
