import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { ArtistEntity } from '../../artists/entities/artist.entity';

@Entity('albums')
export class AlbumEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column()
  year: number;

  @ManyToOne((type) => ArtistEntity, { onDelete: 'SET NULL' })
  artist: ArtistEntity;

  @Column({ nullable: true })
  artistId: string;
}
