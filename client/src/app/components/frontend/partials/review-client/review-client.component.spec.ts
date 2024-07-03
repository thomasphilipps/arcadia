import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReviewClientComponent } from './review-client.component';

describe('ReviewClientComponent', () => {
  let component: ReviewClientComponent;
  let fixture: ComponentFixture<ReviewClientComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ReviewClientComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ReviewClientComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
