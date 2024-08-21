import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BorrowhistorymanagementComponent } from './borrowhistorymanagement.component';

describe('BorrowhistorymanagementComponent', () => {
  let component: BorrowhistorymanagementComponent;
  let fixture: ComponentFixture<BorrowhistorymanagementComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BorrowhistorymanagementComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BorrowhistorymanagementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
