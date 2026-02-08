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

  async findAll(page = 1, limit = 10) {
    const skip = (page - 1) * limit;
    const [items, total] = await Promise.all([
      prisma.telemetry.findMany({
        skip,
        take: limit,
        orderBy: { timestamp: 'desc' },
        include: {
          sensor: {
            include: {
              monitoringPoint: true,
            },
          },
        },
      }),
      prisma.telemetry.count(),
    ]);

    return { items, total, page, limit };
  }

  async deleteOne(id: number) {
    return prisma.telemetry.delete({
      where: { id },
    });
  }
}
