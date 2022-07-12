import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LostItemComponent } from './lost-item.component';

describe('LostItemComponent', () => {
  let component: LostItemComponent;
  let fixture: ComponentFixture<LostItemComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LostItemComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LostItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
