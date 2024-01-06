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
  UpdateDateColumn,
} from 'typeorm';
import { Place } from './Place.entity';
import { User } from '../User.entity';
import { PlanDetail } from './planDetail';

@Entity()
export class Plan {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => User, (user) => user.id)
  user: User;

  @OneToMany(() => PlanDetail, (planDetail) => planDetail.title)
  planDetail?: PlanDetail[];

  @Column()
  @Index()
  title: string; // 계획 제목

  @Column({ nullable: true })
  description?: string; // 계획 설명

  @CreateDateColumn({ nullable: true })
  createdAt?: Date; // 계획 생성 날짜

  @UpdateDateColumn({ nullable: true })
  updatedAt?: Date; // 계획 생성 날짜

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
