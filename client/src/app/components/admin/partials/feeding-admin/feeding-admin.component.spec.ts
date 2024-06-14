import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FeedingAdminComponent } from './feeding-admin.component';

describe('FeedingAdminComponent', () => {
  let component: FeedingAdminComponent;
  let fixture: ComponentFixture<FeedingAdminComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FeedingAdminComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(FeedingAdminComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
