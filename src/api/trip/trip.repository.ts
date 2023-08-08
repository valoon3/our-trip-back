import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Bookmark } from '../../db/entities/trip/bookmark.entity';
import { User } from '../../db/entities/user.entity';

@Injectable()
export class TripRepository {
  constructor(
    @InjectRepository(Bookmark)
    private tripEntity: Repository<Bookmark>,
    @InjectRepository(User)
    private userEntity: Repository<User>,
  ) {}

  async createBookMark(user, placeResult: google.maps.places.PlaceResult) {
    return null;
  }
}
