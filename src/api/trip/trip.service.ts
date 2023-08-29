import { Inject, Injectable } from '@nestjs/common';
import { TripRepository } from './trip.repository';
import { User } from '../../db/entities/User.entity';
import { GoogleMapPlaceResult } from '../../common/types/googleMap.type';
import { Place } from '../../db/entities/trip/Place.entity';

@Injectable()
export class TripService {
  constructor(private readonly tripRepository: TripRepository) {}

  async getBookMarks(userLoginId: number) {
    const bookmarks = await this.tripRepository.getBookMarks(userLoginId);
    return bookmarks.map((bookmark) => bookmark.place);
  }

  async getBookMarkByOne(
    userLoginId: number,
    placeId: string,
  ): Promise<boolean> {
    return await this.tripRepository.getBookMarkByPlaceId(userLoginId, placeId);
  }

  // async createBookMark(userLoginId: number, placeResult: GoogleMapPlaceResult) {
  //   const bookmark = await this.tripRepository.createBookMark(
  //     userLoginId,
  //     placeResult,
  //   );
  //   // const { user, ...result } = bookmark;
  //
  //   // return result;
  //   return bookmark;
  // }

  // async deleteBookMark(
  //   userLoginId: number,
  //   placeId: string,
  //   // placeResult: google.maps.places.PlaceResult,
  // ) {
  //   return this.tripRepository.deleteBookMark(userLoginId, placeId);
  // }
}
