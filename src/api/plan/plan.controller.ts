import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  Req,
  UseFilters,
  ValidationPipe,
} from '@nestjs/common';
import { PlanService } from './plan.service';
import { CreatePlanDto } from './dto/create-plan.dto';
import { UpdatePlanDto } from './dto/update-plan.dto';
import { JwtAuthGuard } from '../auth/jwt/jwt.guard';
import { HttpExceptionFilter } from '../../common/exceptions/http-exception.filter';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { GoogleMapPlaceResult } from '../../common/types/googleMap.type';

@Controller('api/plan')
@UseGuards(JwtAuthGuard)
@UseFilters(HttpExceptionFilter)
@ApiTags('plan controller api')
export class PlanController {
  constructor(private readonly planService: PlanService) {}

  @Post('/')
  @ApiOperation({
    summary: '계획 가져오기',
    description: '계획에 대한 정보를 가져온다.',
  })
  createPlan(@Req() req: any, @Body() createPlanDto: CreatePlanDto) {
    const user = req.user;
    return this.planService.createPlan(user, createPlanDto);
  }

  @Post('/detail')
  @ApiOperation({
    summary: '계획 상세 가져오기',
    description: '계획에 대한 상세 정보를 가져온다.',
  })
  createDetailPlan(
    @Req() req: any,
    @Body('selectedPlan') selectedPlan: CreatePlanDto,
    @Body('selectedDate')
    selectedDate: Date,
    @Body('placeResult') placeResult: GoogleMapPlaceResult,
  ) {
    const user = req.user;

    console.log(selectedPlan);
    console.log(typeof selectedDate);
    console.log(selectedDate);
    console.log(selectedDate.getDate());
    console.log(placeResult);

    return this.planService.createDetailPlan(user, selectedPlan, placeResult);
  }

  @Get('/')
  findAll(@Req() req: any) {
    const user = req.user;
    return this.planService.findAllPlan(user);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.planService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updatePlanDto: UpdatePlanDto) {
    // return this.planService.update(+id, updatePlanDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    // return this.planService.removePlan(+id);
  }
}
