import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Bookmark } from '../../db/entities/trip/bookmark.entity';
import { User } from '../../db/entities/user.entity';
import { DeleteResult } from 'typeorm/query-builder/result/DeleteResult';

@Injectable()
export class TripRepository {
  constructor(
    @InjectRepository(Bookmark)
    private bookmarkEntity: Repository<Bookmark>,
    @InjectRepository(User)
    private userEntity: Repository<User>,
  ) {}

  async getBookMark(userLoginId: number): Promise<Bookmark[]> {
    return this.bookmarkEntity.find({
      where: {
        user: userLoginId,
      },
    });
  }

  async getBookMarkByOne(
    userLoginId: number,
    placeId: string,
  ): Promise<boolean> {
    return this.bookmarkEntity.exist({
      where: {
        user: userLoginId,
        placeId: placeId,
      },
    });
  }

  async createBookMark(
    userLoginId: number,
    placeResult: google.maps.places.PlaceResult,
  ): Promise<Bookmark> {
    const newBookmark = this.bookmarkEntity.merge({
      placeId: placeResult.place_id,
      user: userLoginId,
    });

    return this.bookmarkEntity.save(newBookmark);
  }

  async deleteBookMark(
    userLoginId: number,
    placeId: string,
    // placeResult: google.maps.places.PlaceResult,
  ): Promise<DeleteResult> {
    return this.bookmarkEntity.delete({
      user: userLoginId,
      placeId: placeId,
    });
  }
}
