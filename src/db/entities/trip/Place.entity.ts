import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Double,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryColumn,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Bookmark } from './bookmark.entity';

@Entity({ name: 'places' })
export class Place {
  // @PrimaryGeneratedColumn()
  // id: number;
  // @Column()
  @PrimaryColumn()
  @OneToMany(() => Bookmark, (bookmark) => bookmark.place)
  id: string;

  // @PrimaryColumn()
  @Column()
  name?: string;

  @Column()
  address?: string; // formatted_address

  @Column({ type: 'double precision' })
  geometry_lat?: number; // geometry.location.lat

  @Column({ type: 'double precision' })
  geometry_lng?: number; // geometry.location.lng

  @Column({ type: 'double precision', nullable: true })
  rating?: number; // rating

  @Column()
  business_status?: string;

  @Column()
  formatted_address?: string;

  // @Column({ type: 'integer' })
  // lng?: Double;
  //
  // @Column({ type: 'integer' })
  // lat?: Double;

  @Column()
  icon?: string;

  @Column()
  icon_background_color?: string;

  @Column()
  icon_mask_base_uri?: string;

  @Column({ type: 'json', nullable: true })
  types?;

  @Column()
  user_ratings_total?: number;
}
