import {
  Column,
  Entity,
  JoinColumn,
  ManyToMany,
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

  @ManyToMany(() => User, (user) => user.id)
  user: User[];

  @ManyToOne(() => Place, (place) => place.id)
  place?: Place;

  @Column()
  priority: number;
}

/*
 * 날짜
 * 계획의 이름
 * 장소
 *
 * */
