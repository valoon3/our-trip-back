import { GoogleMapPlaceResult } from '../../../common/types/googleMap.type';

export class CreatePlanDto extends GoogleMapPlaceResult {
  title: string;
  description?: string;
  startDate: Date;
  endDate: Date;
}
