import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EcartModalComponent } from './ecart-modal.component';

describe('EcartModalComponent', () => {
  let component: EcartModalComponent;
  let fixture: ComponentFixture<EcartModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EcartModalComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EcartModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
