import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BiomeClientComponent } from './biome-client.component';

describe('BiomeClientComponent', () => {
  let component: BiomeClientComponent;
  let fixture: ComponentFixture<BiomeClientComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BiomeClientComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(BiomeClientComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
