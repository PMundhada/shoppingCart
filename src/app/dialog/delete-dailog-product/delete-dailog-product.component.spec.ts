import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeleteDailogProductComponent } from './delete-dailog-product.component';

describe('DeleteDailogProductComponent', () => {
  let component: DeleteDailogProductComponent;
  let fixture: ComponentFixture<DeleteDailogProductComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DeleteDailogProductComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DeleteDailogProductComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
