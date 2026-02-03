import { Injectable } from '@nestjs/common';
import { prisma, redis } from '@source/persistence';

@Injectable()
export class AppService {
  async processTelemetry(data: { sensorId: string; value: number; timestamp?: string }) {
    const { sensorId, value } = data;
    const timestamp = data.timestamp ? new Date(data.timestamp) : new Date();

    console.log(`Processing telemetry for sensor ${sensorId}: ${value}`);

    try {
      // 1. Store in PostgreSQL
      await prisma.telemetry.create({
        data: {
          sensorId,
          value,
          timestamp,
        },
      });

      // 2. Update Global Counter in Redis
      await redis.incr('telemetry:global:total_count');

      // 3. Update Latest State in Redis (Hash)
      await redis.hset(`telemetry:sensor:${sensorId}:latest`, {
        value: value.toString(),
        timestamp: timestamp.toISOString(),
      });

      // 4. Update Stream (List/Stream for real-time charts)
      await redis.lpush(`telemetry:sensor:${sensorId}:stream`, JSON.stringify({ value, timestamp }));
      await redis.ltrim(`telemetry:sensor:${sensorId}:stream`, 0, 999); // Keep last 1000 points

    } catch (error) {
      console.error('Error processing telemetry:', error);
    }
  }

  async handleSensorUpdate(data: any) {
    console.log('Sensor update received:', data);
    // Logic to sync cache or similar if needed
  }
}
