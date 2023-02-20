import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { ArtistEntity } from '../../artists/entities/artist.entity';
import { AlbumEntity } from '../../albums/entities/album.entity';
import { Exclude } from 'class-transformer';

@Entity('tracks')
export class TrackEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column({ nullable: true })
  artistId: string | null;

  @Column({ nullable: true })
  albumId: string | null;

  @Column()
  duration: number;

  @ManyToOne((type) => ArtistEntity, { onDelete: 'SET NULL' })
  artist: ArtistEntity;

  @ManyToOne((type) => AlbumEntity, { onDelete: 'SET NULL' })
  album: AlbumEntity;

  @Exclude()
  @Column({ select: false, default: false })
  isFavorite: boolean;
}
