import { Inject, Injectable } from '@nestjs/common';
import { BookmarkRepository } from './bookmark.repository';
import { User } from '../../db/entities/User.entity';
import { GoogleMapPlaceResult } from '../../common/types/googleMap.type';
import { Place } from '../../db/entities/trip/Place.entity';
import { PlaceRepository } from './place.repository';

@Injectable()
export class TripService {
  constructor(
    private readonly bookmarkRepository: BookmarkRepository,
    private readonly placeRepository: PlaceRepository,
  ) {}

  async getBookMarks(userLoginId: number) {
    const bookmarks = await this.bookmarkRepository.getBookMarks(userLoginId);
    return bookmarks.map((bookmark) => bookmark.place);
  }

  async getBookMarkByOne(
    userLoginId: number,
    placeId: string,
  ): Promise<boolean> {
    return await this.bookmarkRepository.getBookMarkByPlaceId(
      userLoginId,
      placeId,
    );
  }

  async createBookMark(userLoginId: number, placeResult: GoogleMapPlaceResult) {
    const bookmark = await this.placeRepository.create(
      userLoginId,
      placeResult,
    );
    // const { user, ...result } = bookmark;

    // return result;
    return bookmark;
  }

  async deleteBookMark(
    userLoginId: number,
    placeId: string,
    // placeResult: google.maps.places.PlaceResult,
  ) {
    return this.bookmarkRepository.delete(userLoginId, placeId);
  }
}
