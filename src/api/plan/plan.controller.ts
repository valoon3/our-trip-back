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
} from '@nestjs/common';
import { PlanService } from './plan.service';
import { CreatePlanDto } from './dto/create-plan.dto';
import { UpdatePlanDto } from './dto/update-plan.dto';
import { JwtAuthGuard } from '../auth/jwt/jwt.guard';
import { HttpExceptionFilter } from '../../common/exceptions/http-exception.filter';
import { ApiOperation, ApiTags } from '@nestjs/swagger';

@Controller('api/plan')
@UseGuards(JwtAuthGuard)
@UseFilters(HttpExceptionFilter)
@ApiTags('plan controller api')
export class PlanController {
  constructor(private readonly planService: PlanService) {}

  @Post('/')
  @ApiOperation({ summary: '계획 만들기', description: '회원가입 API' })
  createPlan(@Req() req: any, @Body() createPlanDto: CreatePlanDto) {
    const user = req.user;
    return this.planService.createPlan(user, createPlanDto);
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
