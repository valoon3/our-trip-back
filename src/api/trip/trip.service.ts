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
    // 먼저 장소에 대한 정보 추가
    await this.placeRepository.createAndUpdate(placeResult);

    // 북마크 추가
    const bookmark = await this.bookmarkRepository.create(
      userLoginId,
      placeResult.place_id,
    );
    const { user, ...result } = bookmark;

    // return result;
    return result;
  }

  async deleteBookMark(
    userLoginId: number,
    placeId: string,
    // placeResult: google.maps.places.PlaceResult,
  ) {
    return this.bookmarkRepository.delete(userLoginId, placeId);
  }
}
