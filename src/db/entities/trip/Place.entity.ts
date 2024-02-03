import { Column, Entity, OneToMany, PrimaryColumn } from 'typeorm';
import { Bookmark } from './bookmark.entity';
import { PlanDetail } from './planDetail.entity';

@Entity({ name: 'places' })
export class Place {
  @PrimaryColumn()
  id: string;

  @OneToMany(() => Bookmark, (bookmark) => bookmark.place)
  bookmarks: Bookmark[];

  @OneToMany(() => PlanDetail, (PlanDetail) => PlanDetail.place)
  planDetail: PlanDetail[];

  @Column()
  name?: string;

  @Column({ nullable: true })
  address?: string; // formatted_address

  @Column({ type: 'double precision', nullable: true })
  geometry_lat?: number; // geometry.location.lat

  @Column({ type: 'double precision', nullable: true })
  geometry_lng?: number; // geometry.location.lng

  @Column({ type: 'double precision', nullable: true })
  rating?: number; // rating

  @Column({ nullable: true })
  business_status?: string;

  @Column({ nullable: true })
  formatted_address?: string;

  // @Column({ type: 'integer' })
  // lng?: Double;
  //
  // @Column({ type: 'integer' })
  // lat?: Double;

  @Column({ nullable: true })
  icon?: string;

  @Column({ nullable: true })
  icon_background_color?: string;

  @Column({ nullable: true })
  icon_mask_base_uri?: string;

  @Column({ type: 'json', nullable: true })
  types?;

  @Column({ nullable: true })
  user_ratings_total?: number;
}
