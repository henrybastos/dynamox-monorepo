import 'dotenv/config';
import { PrismaClient } from '../../persistence/prisma/generated/main/client'
import Redis from 'ioredis';
import * as amqp from 'amqplib';
import { PrismaPg } from '@prisma/adapter-pg';

const adapter = new PrismaPg({ 
  connectionString: process.env['DATABASE_URL'] 
});

export const prisma = new PrismaClient({ adapter });

// Redis Client
export const redis = new Redis(process.env['REDIS_URL'] || 'redis://localhost:6379');

// RabbitMQ Utils
export async function createRabbitMQConnection() {
  const connection = await amqp.connect(process.env['RABBITMQ_URL'] || 'amqp://localhost:5672');
  const channel = await connection.createChannel();
  return { connection, channel };
}

export * from '@prisma/client';
