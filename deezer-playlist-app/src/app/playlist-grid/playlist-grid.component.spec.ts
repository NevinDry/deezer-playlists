import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PlaylistGridComponent } from './playlist-grid.component';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';

describe('PlaylistGridComponent', () => {
  let component: PlaylistGridComponent;
  let fixture: ComponentFixture<PlaylistGridComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PlaylistGridComponent ],
      imports: [
        HttpClientModule,
        RouterModule.forRoot([])
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PlaylistGridComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
