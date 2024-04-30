import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BiomeAdminComponent } from './biome-admin.component';

describe('BiomeAdminComponent', () => {
  let component: BiomeAdminComponent;
  let fixture: ComponentFixture<BiomeAdminComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BiomeAdminComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(BiomeAdminComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
