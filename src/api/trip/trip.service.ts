import { Inject, Injectable } from '@nestjs/common';
import { BookmarkRepository } from './bookmark.repository';
import { GoogleMapPlaceResult } from '../../common/types/googleMap.type';
import { Place } from '../../db/entities/trip/Place.entity';
import { PlaceRepository } from './place.repository';
import { Bookmark } from '../../db/entities/trip/bookmark.entity';
import { UserRepository } from '../user/user.repository';
import { User } from '../../db/entities/User.entity';

@Injectable()
export class TripService {
  constructor(
    private readonly bookmarkRepository: BookmarkRepository,
    private readonly placeRepository: PlaceRepository,
    private readonly userRepository: UserRepository,
  ) {}

  async getBookMarks(userLoginId: number) {
    const bookmarks = await this.bookmarkRepository.getBookMarks(userLoginId);
    return bookmarks.map((bookmark) => bookmark.place);
  }

  async getBookMarkByOne(userLoginId: User, placeId: string): Promise<boolean> {
    const result = await this.bookmarkRepository.find({
      where: {
        user: {
          id: userLoginId.id,
        },
        place: {
          id: placeId,
        },
      },
    });

    return result.length ? true : false;
  }

  // 북마크를 생성하고 북마크 목록을 다시 반환
  async createBookMark(user: User, placeResult: GoogleMapPlaceResult) {
    // 먼저 장소에 대한 정보 추가
    let place = await this.placeRepository.findOne({
      where: { id: placeResult.place_id },
    });

    if (!place) {
      place = this.placeRepository.create({
        id: placeResult.place_id,
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
    }

    const bookmark = this.bookmarkRepository.create({
      user,
      place,
    });
    await this.bookmarkRepository.save(bookmark);

    return this.getBookMarks(user.id);
  }

  // 북마크를 살제하고 갱신된 북마크 목록을 반환
  async deleteBookMark(
    user: User,
    placeId: string,
    // placeResult: google.maps.places.PlaceResult,
  ): Promise<Place[]> {
    await this.bookmarkRepository.delete({
      user: {
        id: user.id,
      },
      place: {
        id: placeId,
      },
    });

    const result = await this.bookmarkRepository.find({
      relations: ['place', 'user'],
      where: {
        user: {
          id: user.id,
        },
      },
    });

    return result.map((bookmark) => bookmark.place);
  }
}
