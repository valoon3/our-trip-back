import { Inject, Injectable } from '@nestjs/common';
import { BookmarkRepository } from './bookmark.repository';
import { GoogleMapPlaceResult } from '../../common/types/googleMap.type';
import { Place } from '../../db/entities/trip/Place.entity';
import { PlaceRepository } from './place.repository';
import { Bookmark } from '../../db/entities/trip/bookmark.entity';

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
    try {
      await this.placeRepository.createAndUpdate(placeResult);
    } catch (err) {
      console.error(err);
    }
    // 먼저 장소에 대한 정보 추가

    // 북마크 추가
    const bookmark = await this.bookmarkRepository.createBookmark(
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
    const bookmark = await this.bookmarkRepository.find();

    const deletedBookmark = await this.bookmarkRepository.delete({
      user: userLoginId,
      place: placeId,
    });

    console.log(deletedBookmark);
    // return await this.bookmarkRepository.deleteBookmark(userLoginId, placeId);
  }
}
