import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HereSuggestComponent } from './here-suggest.component';

describe('HereSuggestComponent', () => {
  let component: HereSuggestComponent;
  let fixture: ComponentFixture<HereSuggestComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HereSuggestComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HereSuggestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
