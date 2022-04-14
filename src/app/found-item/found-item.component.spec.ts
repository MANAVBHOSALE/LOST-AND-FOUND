import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FoundItemComponent } from './found-item.component';

describe('FoundItemComponent', () => {
  let component: FoundItemComponent;
  let fixture: ComponentFixture<FoundItemComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FoundItemComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FoundItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
