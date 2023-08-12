import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Bookmark } from '../../db/entities/trip/bookmark.entity';
import { User } from '../../db/entities/User.entity';
import { DeleteResult } from 'typeorm/query-builder/result/DeleteResult';
import { Place } from '../../db/entities/trip/Place.entity';
import { GoogleMapPlaceResult } from '../../common/types/googleMap.type';

@Injectable()
export class TripRepository {
  constructor(
    @InjectRepository(Bookmark)
    private bookmarkRepository: Repository<Bookmark>,
    @InjectRepository(User)
    private userRepository: Repository<User>,
    @InjectRepository(Place)
    private placeRepository: Repository<Place>,
  ) {}

  async getBookMark(userLoginId: number): Promise<Bookmark[]> {
    return this.bookmarkRepository.find({
      where: {
        user: userLoginId,
      },
    });
  }

  async getBookMarkByPlaceId(
    userLoginId: number,
    placeId: string,
  ): Promise<boolean> {
    let result;

    try {
      result = await this.bookmarkRepository.find({
        where: {
          user: userLoginId,
          place: placeId,
        },
      });
    } catch (err) {
      console.error(err);
    }

    console.log(result);

    return result || false;
  }

  async createBookMark(userLoginId: number, placeResult: GoogleMapPlaceResult) {
    const bookmark = this.bookmarkRepository.create({
      user: userLoginId,
      place: placeResult.place_id,
    });

    const place = this.placeRepository.merge({
      placeId: placeResult.place_id,
      name: placeResult.name,
      address: placeResult.formatted_address,
      geometry_lat: placeResult.lat,
      geometry_lng: placeResult.lng,
      rating: placeResult.rating,
      business_status: placeResult.business_status,
      formatted_address: placeResult.formatted_address,
      icon: placeResult.icon,
      icon_background_color: placeResult.icon_background_color,
      icon_mask_base_uri: placeResult.icon_mask_base_uri,
      types: placeResult.types,
      user_ratings_total: placeResult.user_ratings_total,
    });

    await this.placeRepository.save(place);

    return this.bookmarkRepository.save(bookmark);
  }

  async deleteBookMark(
    userLoginId: number,
    placeId: string,
    // placeResult: google.maps.places.PlaceResult,
  ): Promise<DeleteResult> {
    return this.bookmarkRepository.delete({
      user: userLoginId,
      place: placeId,
    });
  }

  private async getPlace(placeId: string) {
    const result = await this.placeRepository.exist({
      where: {
        placeId: placeId,
      },
    });

    return result;
  }
}
