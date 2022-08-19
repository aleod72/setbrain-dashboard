import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GooglebuttonComponent } from './googlebutton.component';

describe('GooglebuttonComponent', () => {
  let component: GooglebuttonComponent;
  let fixture: ComponentFixture<GooglebuttonComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [GooglebuttonComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(GooglebuttonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
