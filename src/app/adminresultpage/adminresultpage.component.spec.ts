import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminresultpageComponent } from './adminresultpage.component';

describe('AdminresultpageComponent', () => {
  let component: AdminresultpageComponent;
  let fixture: ComponentFixture<AdminresultpageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AdminresultpageComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AdminresultpageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
