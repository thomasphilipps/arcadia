import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SqlDataTableComponent } from './sql-data-table.component';

describe('SqlDataTableComponent', () => {
  let component: SqlDataTableComponent;
  let fixture: ComponentFixture<SqlDataTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SqlDataTableComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(SqlDataTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
