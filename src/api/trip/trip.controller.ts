import { Controller, Post } from '@nestjs/common';
import { TripService } from './trip.service';

@Controller('api/trip')
export class TripController {
  constructor(private readonly tripService: TripService) {}

  // 북마크 추가

  // 북마크 삭제

  // 북마크 가져오기

  // 계획 추가

  // 계획 수정

  // 계획 삭제

  // 계획 가져오기
}
