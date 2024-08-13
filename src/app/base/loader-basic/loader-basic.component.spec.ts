import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LoaderBasicComponent } from './loader-basic.component';

describe('LoaderBasicComponent', () => {
  let component: LoaderBasicComponent;
  let fixture: ComponentFixture<LoaderBasicComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LoaderBasicComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LoaderBasicComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
