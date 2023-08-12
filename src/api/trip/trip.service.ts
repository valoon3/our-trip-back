import { Inject, Injectable } from '@nestjs/common';
import { TripRepository } from './trip.repository';
import { User } from '../../db/entities/User.entity';
import { GoogleMapPlaceResult } from '../../common/types/googleMap.type';
import { Place } from '../../db/entities/trip/Place.entity';

@Injectable()
export class TripService {
  constructor(private readonly tripRepository: TripRepository) {}

  async getBookMark(userLoginInfo: User) {
    const bookmarks = await this.tripRepository.getBookMark(userLoginInfo.id);
    return bookmarks.map((bookmark) => bookmark.place);
  }

  async getBookMarkByOne(
    userLoginInfo: User,
    placeId: string,
  ): Promise<boolean> {
    return await this.tripRepository.getBookMarkByPlaceId(
      userLoginInfo.id,
      placeId,
    );
  }

  async createBookMark(userLoginInfo: User, placeResult: GoogleMapPlaceResult) {
    const bookmark = await this.tripRepository.createBookMark(
      userLoginInfo.id,
      placeResult,
    );
    const { user, ...result } = bookmark;

    return result;
  }

  async deleteBookMark(
    userLoginInfo: User,
    placeId: string,
    // placeResult: google.maps.places.PlaceResult,
  ) {
    return this.tripRepository.deleteBookMark(userLoginInfo.id, placeId);
  }
}
