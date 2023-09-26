import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import {
  DataSource,
  DeleteResult,
  QueryFailedError,
  Repository,
} from 'typeorm';
import { Bookmark } from '../../db/entities/trip/bookmark.entity';
import { GoogleMapPlaceResult } from '../../common/types/googleMap.type';

@Injectable()
export class BookmarkRepository extends Repository<Bookmark> {
  constructor(
    @InjectRepository(Bookmark)
    private bookmarkRepository: Repository<Bookmark>, // @InjectRepository(User) // private userRepository: Repository<User>, // @InjectRepository(Place) // private placeRepository: Repository<Place>,
    private dataSource: DataSource,
  ) {
    super(Bookmark, dataSource.createEntityManager());
  }

  async getBookMarks(userLoginId: number): Promise<Bookmark[]> {
    const queryBuilder = this.bookmarkRepository.createQueryBuilder('bookmark');
    const result = await queryBuilder
      .leftJoinAndSelect('bookmark.place', 'place')
      .where('bookmark.user = :userLoginId', { userLoginId })
      .getMany();

    return result;
  }

  async getBookMarkByPlaceId(
    userLoginId: number,
    placeId: string,
  ): Promise<boolean> {
    let result;

    try {
      const find = await this.bookmarkRepository
        .createQueryBuilder('bookmark')
        .where('bookmark.user = :userLoginId', { userLoginId })
        .andWhere('bookmark.place = :placeId', { placeId })
        .getOne();

      if (find !== null) result = true;
    } catch (err) {
      console.error(err);
    }

    return result || false;
  }

  async createBookmark(
    userLoginId: number,
    placeId: string,
  ): Promise<Bookmark> {
    const bookmark = await this.bookmarkRepository.create({
      user: userLoginId,
      place: placeId,
    });
    return await this.bookmarkRepository.save(bookmark);
  }

  async createByGoogleMapPlaceResult(
    userLoginId: number,
    placeResult: GoogleMapPlaceResult,
  ): Promise<Bookmark> {
    try {
      return this.createBookmark(userLoginId, placeResult.place_id);
    } catch (err) {
      if (err instanceof QueryFailedError) {
        throw err;
      }
    }
  }

  async deleteBookmark(
    userLoginId: number,
    placeId: string,
    // placeResult: google.maps.places.PlaceResult,
  ): Promise<DeleteResult> {
    return this.bookmarkRepository.delete({
      user: userLoginId,
      place: placeId,
    });
  }
}
