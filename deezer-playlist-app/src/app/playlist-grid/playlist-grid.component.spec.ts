import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PlaylistGridComponent } from './playlist-grid.component';
import { HttpClientModule } from '@angular/common/http';
import { PlaylistService } from '../services/playlist.service';
import { RouterTestingModule } from '@angular/router/testing';

describe('PlaylistGridComponent creation', () => {
  let component: PlaylistGridComponent;
  let fixture: ComponentFixture<PlaylistGridComponent>;
  let service: PlaylistService;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PlaylistGridComponent ],
      imports: [
        HttpClientModule,
        RouterTestingModule
      ], providers :[ PlaylistService ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PlaylistGridComponent);
    component = fixture.componentInstance;
    service = TestBed.get(PlaylistService);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should call service to get a playlist list ', () => {
    const spy = spyOn(service, 'getUserPlaylist').and.callThrough();
    component.ngOnInit();
    expect(spy).toHaveBeenCalledTimes(1);
  });
});
