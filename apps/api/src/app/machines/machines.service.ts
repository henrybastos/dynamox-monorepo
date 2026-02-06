import { Injectable, BadRequestException, NotFoundException } from '@nestjs/common';
import { prisma, MachineType } from '@source/persistence';

@Injectable()
export class MachinesService {
  async findAll() {
    return prisma.machine.findMany({
      include: { monitoringPoints: { include: { sensor: true } } },
    });
  }

  async findOne(id: number) {
    const machine = await prisma.machine.findUnique({
      where: { id },
      include: { monitoringPoints: { include: { sensor: true } } },
    });
    if (!machine) throw new NotFoundException(`Machine with ID ${id} not found`);
    return machine;
  }

  async create(data: { name: string; type: MachineType }) {
    return prisma.machine.create({
      data: {
        name: data.name,
        type: data.type,
      },
    });
  }

  async update(id: number, data: { name?: string; type?: MachineType }) {
    return prisma.machine.update({
      where: { id },
      data,
      include: { monitoringPoints: { include: { sensor: true } } },
      // include: { _count: { select: { monitoringPoints: true } } },
    });
  }

  async remove(id: number) {
    return prisma.$transaction(async (tx) => {
      // 1. Find all monitoring points for this machine
      const monitoringPoints = await tx.monitoringPoint.findMany({
        where: { machineId: id },
        select: { id: true },
      });

      const mpIds = monitoringPoints.map((mp) => mp.id);

      // 2. Find all sensors for these monitoring points
      const sensors = await tx.sensor.findMany({
        where: { monitoringPointId: { in: mpIds } },
        select: { id: true },
      });

      const sensorIds = sensors.map((s) => s.id);

      // 3. Delete Telemetry associated with these sensors
      await tx.telemetry.deleteMany({
        where: { sensorId: { in: sensorIds } },
      });

      // 4. Delete Sensors associated with these monitoring points
      await tx.sensor.deleteMany({
        where: { monitoringPointId: { in: mpIds } },
      });

      // 5. Delete MonitoringPoints associated with this machine
      await tx.monitoringPoint.deleteMany({
        where: { machineId: id },
      });

      // 6. Finally, delete the Machine
      return tx.machine.delete({
        where: { id },
      });
    });
  }
}
