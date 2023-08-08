import {
  Column,
  Entity,
  Index,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { User } from '../user.entity';

@Entity()
export class Bookmark {
  @PrimaryGeneratedColumn()
  bookmarkId: number;

  @Index()
  @ManyToOne(() => User, (User) => User.id)
  userId: number;

  @Column()
  name?: string;
}
