import {
  Body,
  Controller,
  Delete,
  Param,
  Post,
  Req,
  UseGuards,
} from '@nestjs/common';
import { TripService } from './trip.service';
import { JwtAuthGuard } from '../auth/jwt/jwt.guard';
import { User } from '../../db/entities/user.entity';

@Controller('api/trip')
@UseGuards(JwtAuthGuard)
export class TripController {
  constructor(private readonly tripService: TripService) {}

  // 북마크 추가
  @Post('/bookmark')
  async createBookmark(
    @Body('placeResult') placeResult: google.maps.places.PlaceResult,
    @Req() req,
  ) {
    console.log(placeResult);
    console.log(req.user);

    return this.tripService.createBookMark(req.user, placeResult);
  }

  @Delete('/bookmark/:place_Id')
  async deleteBookmark(
    // @Body('placeResult') placeResult: google.maps.places.PlaceResult,
    @Param('place_Id') place_Id: string,
    @Req() req,
  ) {
    return this.tripService.deleteBookMark(req.user, place_Id);
  }

  // 북마크 삭제

  // 북마크 조회

  // 계획 추가

  // 계획 수정

  // 계획 삭제

  // 계획 가져오기
}
