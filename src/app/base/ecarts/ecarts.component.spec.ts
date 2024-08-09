import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EcartsComponent } from './ecarts.component';

describe('EcartsComponent', () => {
  let component: EcartsComponent;
  let fixture: ComponentFixture<EcartsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EcartsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EcartsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
