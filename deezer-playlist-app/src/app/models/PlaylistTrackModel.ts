export class PlaylistTrackModel {
  id: number;
  title: string;
  artist: string;
  duration: number;

  constructor(id: number, title: string, artist: string, duration: number) {
    this.id = id;
    this.artist = artist;
    this.title = title;
    this.duration = duration;
  }
}