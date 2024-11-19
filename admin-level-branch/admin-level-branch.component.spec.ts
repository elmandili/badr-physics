import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminLevelBranchComponent } from './admin-level-branch.component';

describe('AdminLevelBranchComponent', () => {
  let component: AdminLevelBranchComponent;
  let fixture: ComponentFixture<AdminLevelBranchComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AdminLevelBranchComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AdminLevelBranchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
