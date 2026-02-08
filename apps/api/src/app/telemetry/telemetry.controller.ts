import { Controller, Get, Param, UseGuards, Inject, Query, Delete, ParseIntPipe } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { TelemetryService } from './telemetry.service';

@Controller('telemetry')
@UseGuards(AuthGuard('jwt'))
export class TelemetryController {
  constructor(
    @Inject(TelemetryService)
    private readonly telemetryService: TelemetryService
  ) {}

  @Get()
  async findAll(
    @Query('page') page?: string,
    @Query('limit') limit?: string
  ) {
    return this.telemetryService.findAll(
      page ? parseInt(page) : 1,
      limit ? parseInt(limit) : 10
    );
  }

  @Get('metrics')
  async getMetrics() {
    return this.telemetryService.getMetrics();
  }

  @Get(':id')
  async getHistory(@Param('id') sensorId: string) {
    return this.telemetryService.getHistoryBySensor(sensorId);
  }

  @Delete(':id')
  async deleteOne(@Param('id', ParseIntPipe) id: number) {
    return this.telemetryService.deleteOne(id);
  }
}
