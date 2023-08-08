import { Inject, Injectable } from '@nestjs/common';
import { TripRepository } from './trip.repository';

@Injectable()
export class TripService {
  constructor(private readonly tripRepository: TripRepository) {}

  async createBookMark(user, placeResult: google.maps.places.PlaceResult) {
    return await this.tripRepository.createBookMark(user, placeResult);
  }
}
