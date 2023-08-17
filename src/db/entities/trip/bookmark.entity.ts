import {
  Column,
  Entity,
  Index,
  JoinColumn,
  JoinTable,
  ManyToMany,
  ManyToOne,
  OneToMany,
  PrimaryColumn,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { User } from '../User.entity';
import { Place } from './Place.entity';

@Entity({ name: 'bookmarks' })
export class Bookmark {
  @PrimaryGeneratedColumn()
  id: number;

  @Index()
  @ManyToOne(() => User, (User) => User.id)
  @JoinColumn({ name: 'user_id' })
  user: number;

  @ManyToOne(() => Place, (Place) => Place.id)
  place: string;
}
