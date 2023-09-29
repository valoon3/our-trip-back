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
  id?: number;

  @ManyToOne(() => User, (user) => user.id)
  user: User[];

  @OneToOne(() => Place, (place) => place.id)
  @JoinColumn()
  // place: Place;
  place: string;

  @Column()
  priority: number;
}

/*
 * 날짜
 * 계획의 이름
 * 장소
 *
 * */
