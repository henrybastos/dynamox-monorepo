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
    });
  }

  async remove(id: number) {
    return prisma.machine.delete({
      where: { id },
    });
  }
}
