import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Bookmark } from './trip/bookmark.entity';

@Entity()
export class Place {
  @PrimaryGeneratedColumn()
  // @ManyToOne(() => Bookmark)
  placeId: number;

  @Column()
  name?: string;

  @Column()
  address?: string; // formatted_address

  @Column()
  geometry_lat?: number; // geometry.location.lat

  @Column()
  geometry_lng?: number; // geometry.location.lng

  @Column()
  rating?: number; // rating
}
