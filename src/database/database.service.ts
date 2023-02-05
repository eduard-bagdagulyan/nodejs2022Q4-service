import { Injectable } from '@nestjs/common';
import DBUsers from './entities/UserEntity';

@Injectable()
export class DatabaseService {
  readonly users: DBUsers;
}
