import {
  Column,
  Entity,
  Index,
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

  @ManyToOne(() => Place, (place) => place.name)
  place?: Place;

  @Column()
  @Index()
  title: string; // 계획 제목

  @Column({ nullable: true })
  planDate: Date; // 계획 날짜

  @Column({ default: false })
  completed: boolean; // 완료 여부

  @Column()
  priority: number; // 우선 순위
}

/*
 * 날짜
 * 계획의 이름
 * 장소
 *
 * */
