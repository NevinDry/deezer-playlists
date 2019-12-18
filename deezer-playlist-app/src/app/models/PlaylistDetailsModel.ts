
export class PlaylistDetailsModel {
  id: number;
  coverLink: string;
  title: string;
  author: string;
  duration: number;
  totalTrackCount: number;

  constructor(id: number, coverLink: string, title: string, author: string, duration: number, totalTrackCount:number) {
    this.id = id;
    this.coverLink = coverLink;
    this.title = title;
    this.author = author;
    this.duration = duration;
    this.totalTrackCount = totalTrackCount;
  }
}