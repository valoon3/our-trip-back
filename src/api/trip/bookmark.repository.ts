import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DeleteResult, EntityPropertyNotFoundError, Repository } from 'typeorm';
import { Bookmark } from '../../db/entities/trip/bookmark.entity';

@Injectable()
export class BookmarkRepository {
  constructor(
    @InjectRepository(Bookmark)
    private bookmarkRepository: Repository<Bookmark>, // @InjectRepository(User) // private userRepository: Repository<User>, // @InjectRepository(Place) // private placeRepository: Repository<Place>,
  ) {}

  async getBookMarks(userLoginId: number): Promise<Bookmark[]> {
    const queryBuilder = this.bookmarkRepository.createQueryBuilder('bookmark');
    const result = await queryBuilder
      .leftJoinAndSelect('bookmark.place', 'place')
      .where('bookmark.user = :userLoginId', { userLoginId })
      .getMany();

    console.log(result);

    return result;
  }

  async getBookMarkByPlaceId(
    userLoginId: number,
    placeId: string,
  ): Promise<boolean> {
    let result;

    try {
      const find = await this.bookmarkRepository
        .createQueryBuilder('bookmark')
        .where('bookmark.user = :userLoginId', { userLoginId })
        .andWhere('bookmark.place = :placeId', { placeId })
        .getOne();

      if (find !== null) result = true;
    } catch (err) {
      console.error(err);
    }

    return result || false;
  }

  // async createBookMark(userLoginId: number, placeResult: GoogleMapPlaceResult) {
  //   const place = await this.placeRepository.upsert(
  //     {
  //       id: placeResult.place_id,
  //       name: placeResult.name,
  //       address: placeResult.formatted_address,
  //       geometry_lat: placeResult.lat,
  //       geometry_lng: placeResult.lng,
  //       rating: placeResult.rating,
  //       business_status: placeResult.business_status,
  //       formatted_address: placeResult.formatted_address,
  //       icon: placeResult.icon,
  //       icon_background_color: placeResult.icon_background_color,
  //       icon_mask_base_uri: placeResult.icon_mask_base_uri,
  //       types: placeResult.types,
  //       user_ratings_total: placeResult.user_ratings_total,
  //     },
  //     ['id'],
  //   );

  //   const bookmark = this.bookmarkRepository.create({
  //     user: userLoginId,
  //     place: placeResult.place_id,
  //   });
  //
  //   console.log(place);
  //
  //   return await this.bookmarkRepository.save(bookmark);
  // }

  async delete(
    userLoginId: number,
    placeId: string,
    // placeResult: google.maps.places.PlaceResult,
  ): Promise<DeleteResult> {
    return this.bookmarkRepository.delete({
      user: userLoginId,
      place: placeId,
    });
  }
}
