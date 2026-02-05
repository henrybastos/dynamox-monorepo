import * as amqp from 'amqplib';

const RABBITMQ_URL = process.env['RABBITMQ_URL'] || 'amqp://localhost:5672';
const QUEUE = 'telemetry_queue';

async function simulate() {
  try {
    const connection = await amqp.connect(RABBITMQ_URL);
    const channel = await connection.createChannel();

    await channel.assertQueue(QUEUE, { durable: true });

    const sensors = ['sensor_hf_01', 'sensor_tcag_01'];

    console.log('Simulator started. Sending data every 2 seconds...');

    setInterval(async () => {
      const sensorId = sensors[Math.floor(Math.random() * sensors.length)];
      const accelerationValue = parseFloat((Math.random() * 2).toFixed(2));
      const velocityValue = parseFloat((Math.random() * 10).toFixed(2));
      const temperatureValue = parseFloat((20 + Math.random() * 60).toFixed(2));
      
      const payload = {
        pattern: 'telemetry_data',
        data: {
          sensorId,
          accelerationValue,
          velocityValue,
          temperatureValue,
          timestamp: new Date().toISOString(),
        }
      };

      channel.sendToQueue(QUEUE, Buffer.from(JSON.stringify(payload)));
      console.log(`Sent: ${sensorId} -> A:${accelerationValue} V:${velocityValue} T:${temperatureValue}`);
    }, 2000);

  } catch (error) {
    console.error('Simulator error:', error);
  }
}

simulate();
