  
export class PlaylistHeaderModel {
    id: number;
    coverLink: string;
    title: string;

    constructor(id: number, coverLink: string, title: string) {
      this.id = id;
      this.coverLink = coverLink;
      this.title = title;     
    }
  }