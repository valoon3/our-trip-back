import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToOne,
  PrimaryColumn,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Place } from './Place.entity';
import { User } from '../User.entity';

@Entity()
export class Plan {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => User, (user) => user.id)
  user: User[];

  @OneToOne(() => Place, (place) => place.id)
  @JoinColumn()
  place: Place;

  @Column()
  priority: number;
}
