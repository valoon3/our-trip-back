export interface GoogleMapPlaceResult {
  // backend 에 place 테이블과 일치시키기

  business_status?: string;
  formatted_address?: string;
  lng?: number;
  lat?: number;
  icon?: string;
  icon_background_color?: string;
  icon_mask_base_uri?: string;
  name?: string;
  isOpen?: boolean;
  // photos?: Array<>;
  place_id?: string;
  rating?: number;
  types?: Array<string>;
  user_ratings_total?: number;
}
