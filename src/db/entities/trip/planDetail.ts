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
export class PlanDetail {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Place, (place) => place.name)
  place?: Place;

  @ManyToOne(() => Plan, (plan) => plan.title)
  title: Plan;

  @Column()
  priority: number; // 우선 순위

  @CreateDateColumn()
  createdAt: Date;

  @Column({ default: false })
  completed: boolean; // 완료 여부
}
