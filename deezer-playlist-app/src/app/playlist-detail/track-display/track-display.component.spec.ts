import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TrackDisplayComponent } from './track-display.component';
import { MinuteSecondsPipe } from 'src/app/pipes/SecondsToTimeStringPipe';

describe('TrackDisplayComponent', () => {
  let component: TrackDisplayComponent;
  let fixture: ComponentFixture<TrackDisplayComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TrackDisplayComponent, MinuteSecondsPipe, TrackDisplayComponent ], providers:[ MinuteSecondsPipe], imports:[]

    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TrackDisplayComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
