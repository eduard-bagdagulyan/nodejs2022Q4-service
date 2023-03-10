import { ArtistEntity } from '../../artists/interfaces/artists.interface';
import { IAlbum } from '../../albums/interfaces/albums.interface';
import { TrackEntity } from '../../tracks/interfaces/tracks.interface';

export class FavoriteEntity {
  id: string;

  constructor(props: FavoriteEntity) {
    Object.assign(this, props);
  }
}

export class FavoritesResponse {
  artists: ArtistEntity[];
  albums: IAlbum[];
  tracks: TrackEntity[];
}
