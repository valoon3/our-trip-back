import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Place } from './Place.entity';
import { Plan } from './plan.entity';

@Entity()
export class PlanDetailEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Place, (place) => place.name)
  place?: Place;

  @ManyToOne(() => Plan, (plan) => plan.id)
  plan: Plan;

  @Column()
  planDate: Date; // 계획 날짜

  @Column()
  priority: number; // 우선 순위

  @CreateDateColumn()
  createdAt: Date;

  @Column({ default: false })
  completed: boolean; // 완료 여부
}
