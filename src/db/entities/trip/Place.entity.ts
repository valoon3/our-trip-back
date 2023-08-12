import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryColumn,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Bookmark } from './bookmark.entity';

@Entity()
export class Place {
  // @PrimaryGeneratedColumn()
  // id: number;

  // @Column()
  @OneToMany(() => Bookmark, (bookmark) => bookmark.place)
  placeId: string;

  @PrimaryColumn()
  // @Column()
  name?: string;

  @Column()
  address?: string; // formatted_address

  @Column()
  geometry_lat?: number; // geometry.location.lat

  @Column()
  geometry_lng?: number; // geometry.location.lng

  @Column()
  rating?: number; // rating

  @Column()
  business_status?: string;

  @Column()
  formatted_address?: string;

  @Column()
  lng?: number;

  @Column()
  lat?: number;

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
