import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NgAutoComponent } from './ng-auto.component';

describe('NgAutoComponent', () => {
  let component: NgAutoComponent;
  let fixture: ComponentFixture<NgAutoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NgAutoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NgAutoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
