import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StrokebuttonComponent } from './strokebutton.component';

describe('StrokebuttonComponent', () => {
  let component: StrokebuttonComponent;
  let fixture: ComponentFixture<StrokebuttonComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [StrokebuttonComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(StrokebuttonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
