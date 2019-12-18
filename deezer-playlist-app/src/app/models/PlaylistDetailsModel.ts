
export class PlaylistDetailsModel {
  id: number;
  coverLink: string;
  title: string;
  author: string;
  duration: number;

  constructor(id: number, coverLink: string, title: string, author: string, duration: number) {
    this.id = id;
    this.coverLink = coverLink;
    this.title = title;
    this.author = author;
    this.duration = duration;
  }
}