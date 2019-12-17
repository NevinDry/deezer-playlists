import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PlaylistDetailComponent } from './playlist-detail.component';
import { MinuteSecondsPipe } from '../pipes/SecondsToTimeStringPipe';
import { TrackDisplayComponent } from './track-display/track-display.component';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';

describe('PlaylistDetailComponent', () => {
  let component: PlaylistDetailComponent;
  let fixture: ComponentFixture<PlaylistDetailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PlaylistDetailComponent, MinuteSecondsPipe, TrackDisplayComponent ], providers:[ MinuteSecondsPipe], imports:[HttpClientModule, RouterModule.forRoot([])]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PlaylistDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
