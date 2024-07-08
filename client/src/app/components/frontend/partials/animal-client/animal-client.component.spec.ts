import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AnimalClientComponent } from './animal-client.component';

describe('AnimalClientComponent', () => {
  let component: AnimalClientComponent;
  let fixture: ComponentFixture<AnimalClientComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AnimalClientComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AnimalClientComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
