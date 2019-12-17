import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DetailsHeaderComponent } from './details-header.component';
import { MinuteSecondsPipe } from 'src/app/pipes/SecondsToTimeStringPipe';

describe('DetailsHeaderComponent', () => {
  let component: DetailsHeaderComponent;
  let fixture: ComponentFixture<DetailsHeaderComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DetailsHeaderComponent, MinuteSecondsPipe ], providers:[ MinuteSecondsPipe]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DetailsHeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
