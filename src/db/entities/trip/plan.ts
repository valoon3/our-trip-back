import { Column, Entity, ManyToOne, OneToMany, PrimaryColumn } from 'typeorm';
import { Place } from './Place.entity';
import { User } from '../User.entity';

// @Entity()
export class Plan {
  @ManyToOne(() => User, (user) => user.id)
  user: number;

  @OneToMany(() => Place, (place) => place.id)
  places: Place[];

  @Column()
  Priority: number;

  @Column({ nullable: true })
  type: string;
}
