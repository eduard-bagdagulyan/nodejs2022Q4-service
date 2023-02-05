import { Injectable } from '@nestjs/common';
import DBUsers from './entities/UserEntity';
import DBArtists from './entities/ArtistEntity';

@Injectable()
export class DatabaseService {
  readonly users: DBUsers = new DBUsers();
  readonly artists: DBArtists = new DBArtists();
}
