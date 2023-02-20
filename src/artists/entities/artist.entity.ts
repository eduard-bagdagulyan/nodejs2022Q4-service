import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('artists')
export class ArtistEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column('varchar')
  name: string;

  @Column('boolean')
  grammy: boolean;

  @Column({ select: false, default: false })
  isFavorite: boolean;
}
