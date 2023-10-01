import { GoogleMapPlaceResult } from '../../../common/types/googleMap.type';

export class CreatePlanDto extends GoogleMapPlaceResult {
  title: string;
  startPlanDate?: Date;
  endPlanDate?: Date;
}
