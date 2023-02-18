import DBEntity from './DBEntity';
import { FavoriteEntity } from '../../favorites/interfaces/favories.interface';
import { IdParamDTO } from '../../common/interfaces';

export class DBFavoriteArtists extends DBEntity<
  FavoriteEntity,
  FavoriteEntity,
  null
> {
  async create(dto: IdParamDTO) {
    const created: FavoriteEntity = new FavoriteEntity(dto);
    this.entities.push(created);
    return created;
  }
}

export class DBFavoriteAlbums extends DBEntity<
  FavoriteEntity,
  FavoriteEntity,
  null
> {
  async create(dto: IdParamDTO) {
    const created: FavoriteEntity = new FavoriteEntity(dto);
    this.entities.push(created);
    return created;
  }
}

export class DBFavoriteTracks extends DBEntity<
  FavoriteEntity,
  FavoriteEntity,
  null
> {
  async create(dto: IdParamDTO) {
    const created: FavoriteEntity = new FavoriteEntity(dto);
    this.entities.push(created);
    return created;
  }
}
