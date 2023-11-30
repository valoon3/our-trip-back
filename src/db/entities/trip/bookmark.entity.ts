import {
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { User } from '../User.entity';
import { Place } from './Place.entity';
import { ApiProperty } from '@nestjs/swagger';

@Entity({ name: 'bookmarks' })
export class Bookmark {
  @PrimaryGeneratedColumn()
  @ApiProperty({
    description: '기본키',
    default: 1,
  })
  id: number;

  // @JoinColumn({ name: 'place_id' })
  // placeId: string;

  @Index()
  @ManyToOne(() => User, (User) => User.id)
  @JoinColumn({ name: 'user_id' })
  @ApiProperty({
    description: 'user_id',
    default: 1,
  })
  user: User;

  @ManyToOne(() => Place, (Place) => Place.id)
  @ApiProperty({
    description: 'place_id',
    default: 1,
  })
  place: Place;
}
