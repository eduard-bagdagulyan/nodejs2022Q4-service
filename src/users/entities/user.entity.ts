import { AfterLoad, Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { Exclude } from 'class-transformer';

@Entity('users')
export class UserEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column('varchar', { unique: true })
  login: string;

  @Exclude()
  @Column('varchar')
  password: string;

  @Exclude()
  @Column({ nullable: true })
  refreshToken: string;

  @Column('int')
  version: number;

  @Column('int8')
  createdAt: number;

  @Column('int8')
  updatedAt: number;

  @AfterLoad()
  _convertNumerics() {
    this.createdAt = +this.createdAt;
    this.updatedAt = +this.updatedAt;
  }
}
