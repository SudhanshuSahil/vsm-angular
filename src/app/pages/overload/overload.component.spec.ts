import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OverloadComponent } from './overload.component';

describe('OverloadComponent', () => {
  let component: OverloadComponent;
  let fixture: ComponentFixture<OverloadComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OverloadComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OverloadComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
