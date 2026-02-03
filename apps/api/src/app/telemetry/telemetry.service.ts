import { Injectable } from '@nestjs/common';
import { prisma, redis } from '@source/persistence';

@Injectable()
export class TelemetryService {
  async getMetrics() {
    // Total count from Redis (updated by worker)
    const count = await redis.get('telemetry:global:total_count');
    return {
      total_telemetry_count: count ? parseInt(count) : 0,
    };
  }

  async getHistoryBySensor(sensorId: string) {
    return prisma.telemetry.findMany({
      where: { sensorId },
      orderBy: { timestamp: 'desc' },
      take: 100, // Return last 100 points
    });
  }
}
