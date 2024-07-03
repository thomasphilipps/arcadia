import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LandingClientComponent } from './landing-client.component';

describe('LandingClientComponent', () => {
  let component: LandingClientComponent;
  let fixture: ComponentFixture<LandingClientComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LandingClientComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(LandingClientComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
