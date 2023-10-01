import { Injectable } from '@nestjs/common';
import { Place } from '../../db/entities/trip/Place.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { DataSource, Repository } from 'typeorm';
import { GoogleMapPlaceResult } from '../../common/types/googleMap.type';

@Injectable()
export class PlaceRepository extends Repository<Place> {
  constructor(
    dataSource: DataSource,
    @InjectRepository(Place)
    private placeRepository: Repository<Place>,
  ) {
    super(Place, dataSource.createEntityManager());
  }

  async createAndUpdate(placeResult: any) {
    return await this.placeRepository.upsert(
      {
        id: placeResult.place_id || placeResult.id || null,
        name: placeResult.name || null,
        address: placeResult.formatted_address || null,
        geometry_lat: placeResult.lat || null,
        geometry_lng: placeResult.lng || null,
        rating: placeResult.rating || null,
        business_status: placeResult.business_status || null,
        formatted_address: placeResult.formatted_address || null,
        icon: placeResult.icon || null,
        icon_background_color: placeResult.icon_background_color || null,
        icon_mask_base_uri: placeResult.icon_mask_base_uri || null,
        types: placeResult.types || null,
        user_ratings_total: placeResult.user_ratings_total || null,
      },
      ['id'],
    );
  }

  async selectAll() {
    return await this.placeRepository.find();
  }

  async selectOne(placeId: string) {
    return await this.placeRepository.findOneBy({ id: placeId });
  }

  async delete(placeId: string) {
    return await this.placeRepository.delete({ id: placeId });
  }
}
