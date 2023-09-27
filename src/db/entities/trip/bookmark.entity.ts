import {
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { User } from '../User.entity';
import { Place } from './Place.entity';

@Entity({ name: 'bookmarks' })
export class Bookmark {
  @PrimaryGeneratedColumn()
  id: number;

  // @JoinColumn({ name: 'place_id' })
  // placeId: string;

  @Index()
  @ManyToOne(() => User, (User) => User.id)
  @JoinColumn({ name: 'user_id' })
  user: User;

  @ManyToOne(() => Place, (Place) => Place.id)
  place: Place;
}
