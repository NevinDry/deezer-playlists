import { PlaylistTrackModel } from './PlaylistTrackModel';

  
export class PlaylistDetailsModel {
    id: number;
    coverLink: string;
    title: string;
    author: string;
    duration: number;
    tracks: PlaylistTrackModel[];
  }