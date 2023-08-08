import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  Index,
  OneToMany,
  UpdateDateColumn,
} from 'typeorm';
import { IsEmail, Length } from 'class-validator';
import BaseEntity from './Entity';
import { Bookmark } from './trip/bookmark.entity';

@Entity()
export class User extends BaseEntity {
  @Index()
  @IsEmail(undefined, { message: '이메일 형식이 아닙니다.' })
  @Length(4, 30, { message: '이메일은 4글자 이상 30글자 이하로 입력해주세요.' })
  @Column({ readonly: true, unique: true })
  email: string;

  @Column()
  @Length(6, 30, {
    message: '비밀번호는 6글자 이상 30글자 이하로 입력해주세요.',
  })
  password: string;

  @Index()
  @Length(3, 20, { message: '사용자 이름은 3자 이상입니다.' })
  @Column()
  name: string;

  @OneToMany(() => Bookmark, (bookmark) => bookmark.bookmarkId)
  bookmark: Bookmark[];
}
