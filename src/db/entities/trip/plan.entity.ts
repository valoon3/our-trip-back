import {
  Column,
  CreateDateColumn,
  Entity,
  Index,
  ManyToMany,
  ManyToOne,
  PrimaryGeneratedColumn,
  JoinTable,
  OneToMany,
} from 'typeorm';
import { Place } from './Place.entity';
import { User } from '../User.entity';
import { PlanDetail } from './planDetail';

@Entity()
export class Plan {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToMany(() => User, (user) => user.id)
  @JoinTable()
  user: User[];

  @OneToMany(() => PlanDetail, (planDetail) => planDetail.title)
  planDetail?: PlanDetail[];

  @Column()
  @Index()
  title: string; // 계획 제목

  @Column({ nullable: true })
  planDate: Date; // 계획 생성 날짜

  @Column()
  startDate?: Date; // 계획 시작 날짜

  @Column()
  endDate?: Date; // 계획 끝 날짜
}

/*
 * 날짜
 * 계획의 이름
 * 장소
 *
 * */
