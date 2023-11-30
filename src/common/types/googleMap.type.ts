import { ApiProperty } from '@nestjs/swagger';

export class GoogleMapPlaceResult {
  // backend 에 place 테이블과 일치시키기
  @ApiProperty({
    description: 'business_status',
    default: 'OPERATIONAL',
  })
  business_status?: string;

  @ApiProperty({
    description: 'formatted_address',
    default: '대한민국 경기도 성남시 분당구 성남대로 903',
  })
  formatted_address?: string;

  @ApiProperty({
    description: 'lng',
    default: 37.41132,
  })
  lng?: number;

  @ApiProperty({
    description: 'lat',
    default: 127.128674,
  })
  lat?: number;

  @ApiProperty({
    description: 'icon',
    default:
      'https://maps.gstatic.com/mapfiles/place_api/icons/v1/png_71/generic_business-71.png',
  })
  icon?: string;

  @ApiProperty({
    description: 'icon_background_color',
    default: '#7B9EB0',
  })
  icon_background_color?: string;

  @ApiProperty({
    description: 'icon_mask_base_uri',
    default:
      'https://maps.gstatic.com/mapfiles/place_api/icons/v2/generic_pinlet',
  })
  icon_mask_base_uri?: string;

  @ApiProperty({
    description: 'place_name',
    default: '야탑역',
  })
  name?: string;

  @ApiProperty({
    description: 'isOpen',
    default: 'true',
  })
  isOpen?: boolean;
  // photos?: Array<>;

  @ApiProperty({
    description: 'place_id',
    default: 'ChIJb3SX4XSofDURkMRiEPLn1ac',
  })
  place_id: string;

  @ApiProperty({
    description: 'rating',
    default: 4,
  })
  rating?: number;

  @ApiProperty({
    description: 'business_types',
    default: [
      'subway_station',
      'transit_station',
      'point_of_interest',
      'establishment',
    ],
  })
  types?: Array<string>;

  @ApiProperty({
    description: 'user_rating_total',
    default: 131,
  })
  user_ratings_total?: number;
}
