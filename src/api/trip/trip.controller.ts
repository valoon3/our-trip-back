import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Req,
  UseGuards,
} from '@nestjs/common';
import { TripService } from './trip.service';
import { JwtAuthGuard } from '../auth/jwt/jwt.guard';
import { User } from '../../db/entities/User.entity';
import { GoogleMapPlaceResult } from '../../common/types/googleMap.type';
import { Place } from '../../db/entities/trip/Place.entity';

@Controller('api/trip')
@UseGuards(JwtAuthGuard)
export class TripController {
  constructor(private readonly tripService: TripService) {}

  // 북마크 조회
  @Get('/bookmark')
  async getBookmark(@Req() req): Promise<string[]> {
    const userLoginInfo = req.user;

    console.log(await this.tripService.getBookMark(userLoginInfo));

    return this.tripService.getBookMark(userLoginInfo);
  }

  @Get('/bookmark/:place_Id')
  async getBookmarkByOne(
    @Req() req,
    @Param('place_Id') place_Id: string,
  ): Promise<boolean> {
    const userLoginInfo = req.user;

    const result = await this.tripService.getBookMarkByOne(
      userLoginInfo,
      place_Id,
    );

    console.log(result);

    return result;
  }

  // 북마크 추가
  @Post('/bookmark')
  async createBookmark(
    @Body('placeResult') placeResult: GoogleMapPlaceResult,
    @Req() req,
  ) {
    console.log(placeResult);
    console.log(req.user);

    return this.tripService.createBookMark(req.user, placeResult);
  }

  // 북마크 삭제
  @Delete('/bookmark/:place_Id')
  async deleteBookmark(
    // @Body('placeResult') placeResult: google.maps.places.PlaceResult,
    @Param('place_Id') place_Id: string,
    @Req() req,
  ) {
    return this.tripService.deleteBookMark(req.user, place_Id);
  }

  // 계획 추가

  // 계획 수정

  // 계획 삭제

  // 계획 가져오기
}
