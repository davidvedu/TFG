import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PublicarComponent } from './publicar.component';

describe('PublicarComponent', () => {
  let component: PublicarComponent;
  let fixture: ComponentFixture<PublicarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PublicarComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PublicarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
