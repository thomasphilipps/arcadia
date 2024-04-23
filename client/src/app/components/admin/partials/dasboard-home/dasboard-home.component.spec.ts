import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DasboardHomeComponent } from './dasboard-home.component';

describe('DasboardHomeComponent', () => {
  let component: DasboardHomeComponent;
  let fixture: ComponentFixture<DasboardHomeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DasboardHomeComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(DasboardHomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
