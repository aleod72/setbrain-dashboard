import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ButtonwithoutfillComponent } from './buttonwithoutfill.component';

describe('ButtonwithoutfillComponent', () => {
  let component: ButtonwithoutfillComponent;
  let fixture: ComponentFixture<ButtonwithoutfillComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ButtonwithoutfillComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(ButtonwithoutfillComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
