import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PlaylistDetailComponent } from './playlist-detail.component';
import { MinuteSecondsPipe } from '../pipes/SecondsToTimeStringPipe';
import { TrackDisplayComponent } from './track-display/track-display.component';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { DetailsHeaderComponent } from './details-header/details-header.component';
import { InfiniteScrollerDirective } from '../directives/InfiniteScrollDirective';
import { PlaylistService } from '../services/playlist.service';
import { CollapseOnScrollDirective } from '../directives/CollapseOnScrollDirective';

describe('PlaylistDetailComponent creation', () => {
  let component: PlaylistDetailComponent;
  let fixture: ComponentFixture<PlaylistDetailComponent>;
  let service: PlaylistService;
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PlaylistDetailComponent, MinuteSecondsPipe, TrackDisplayComponent, DetailsHeaderComponent, InfiniteScrollerDirective, CollapseOnScrollDirective ], providers:[ MinuteSecondsPipe, PlaylistService], imports:[HttpClientModule, RouterModule.forRoot([])]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PlaylistDetailComponent);
    component = fixture.componentInstance;
    service = TestBed.get(PlaylistService) as PlaylistService;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should call service to get playlist info ', () => {
    const spy = spyOn(service, 'getPlaylistDetails').and.callThrough();
    component.ngOnInit();
    expect(spy).toHaveBeenCalledTimes(1);
  });

});
