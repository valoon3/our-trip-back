import { GoogleMapPlaceResult } from '../../../common/types/googleMap.type';
import { IsDate } from 'class-validator';
import { Type } from 'class-transformer';

export class CreatePlanDto extends GoogleMapPlaceResult {
  title: string;
  description?: string;

  @Type(() => Date)
  @IsDate({
    message: ({ value, constraints, targetName, object, property }) =>
      `${value} 매개변수가 잘못되었다.`,
  })
  startDate: Date;

  @Type(() => Date)
  @IsDate({
    message: ({ value, constraints, targetName, object, property }) =>
      `${value} 매개변수가 잘못되었다.`,
  })
  endDate: Date;

  @Type(() => Date)
  @IsDate({
    message: ({ value, constraints, targetName, object, property }) =>
      `${value} 매개변수가 잘못되었다.`,
  })
  createdAt: Date;

  @Type(() => Date)
  @IsDate({
    message: ({ value, constraints, targetName, object, property }) =>
      `${value} 매개변수가 잘못되었다.`,
  })
  updatedAt: Date;
}
