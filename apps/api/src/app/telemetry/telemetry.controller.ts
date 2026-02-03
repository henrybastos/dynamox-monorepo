import { Controller, Get, Param, UseGuards, Inject } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { TelemetryService } from './telemetry.service';

@Controller('telemetry')
@UseGuards(AuthGuard('jwt'))
export class TelemetryController {
  constructor(
    @Inject(TelemetryService)
    private readonly telemetryService: TelemetryService
  ) {}

  @Get('metrics')
  async getMetrics() {
    return this.telemetryService.getMetrics();
  }

  @Get(':id')
  async getHistory(@Param('id') sensorId: string) {
    return this.telemetryService.getHistoryBySensor(sensorId);
  }
}
