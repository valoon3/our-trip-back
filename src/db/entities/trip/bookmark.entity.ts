import {
  Column,
  Entity,
  Index,
  ManyToOne,
  OneToMany,
  PrimaryColumn,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { User } from '../user.entity';

@Entity()
export class Bookmark {
  // @PrimaryGeneratedColumn()
  // bookmarkId: number;
  @PrimaryColumn()
  placeId: string;

  @Index()
  @ManyToOne(() => User, (User) => User.id)
  user: number;

  // @Column()
  // placeName?: string;
}
