import { Inject, Injectable } from '@nestjs/common';
import { TripRepository } from './trip.repository';
import { User } from '../../db/entities/user.entity';

@Injectable()
export class TripService {
  constructor(private readonly tripRepository: TripRepository) {}

  async createBookMark(
    userLoginInfo: User,
    placeResult: google.maps.places.PlaceResult,
  ) {
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
