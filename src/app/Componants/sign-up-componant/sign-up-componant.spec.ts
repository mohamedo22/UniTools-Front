import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SignUpComponant } from './sign-up-componant';

describe('SignUpComponant', () => {
  let component: SignUpComponant;
  let fixture: ComponentFixture<SignUpComponant>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SignUpComponant]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SignUpComponant);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
