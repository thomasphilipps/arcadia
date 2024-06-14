import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SpecieAdminComponent } from './specie-admin.component';

describe('SpecieAdminComponent', () => {
  let component: SpecieAdminComponent;
  let fixture: ComponentFixture<SpecieAdminComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SpecieAdminComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(SpecieAdminComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
