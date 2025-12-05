import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InsertExamComponent } from './insert-exam.component';

describe('InsertExamComponent', () => {
  let component: InsertExamComponent;
  let fixture: ComponentFixture<InsertExamComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [InsertExamComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(InsertExamComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
