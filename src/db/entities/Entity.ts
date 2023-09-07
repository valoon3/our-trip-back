import {
  BaseEntity,
  CreateDateColumn,
  DeleteDateColumn,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Plan } from './trip/plan.entity';

export default abstract class Entity extends BaseEntity {
  @PrimaryGeneratedColumn()
  @OneToMany(() => Plan, (plan) => plan.user)
  id: number;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @DeleteDateColumn()
  deletedAt?: Date;
}
