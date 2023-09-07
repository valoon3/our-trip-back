import {
  Entity,
  JoinColumn,
  ManyToOne,
  OneToOne,
  PrimaryColumn,
} from 'typeorm';
import { Place } from './Place.entity';
import { User } from '../User.entity';

@Entity()
export class Plan {
  @ManyToOne(() => User, (user) => user.id)
  user: User[];

  @OneToOne(() => Place)
  @JoinColumn()
  places: Place;

  @PrimaryColumn()
  Priority: number;
}
