import { Injectable, NotFoundException } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { PrismaService } from '../prisma/prisma.service.js';
import { CreateTicketDto } from './dto/create-ticket.dto.js';
import { UpdateTicketDto } from './dto/update-ticket.dto.js';
import { TicketQueryDto } from './dto/ticket-query.dto.js';

@Injectable()
export class TicketsService {
  constructor(private readonly prisma: PrismaService) {}

  async create(createTicketDto: CreateTicketDto) {
    // 1. Verify user exists
    const user = await this.prisma.user.findUnique({
      where: { id: createTicketDto.userId },
    });

    if (!user) {
      throw new NotFoundException(`User with ID ${createTicketDto.userId} does not exist`);
    }

    // 2. Create ticket linked to user
    return this.prisma.ticket.create({
      data: {
        subject: createTicketDto.subject,
        description: createTicketDto.description,
        priority: createTicketDto.priority,
        userId: createTicketDto.userId,
      },
      include: {
        user: {
          select: {
            id: true,
            name: true,
            email: true,
            role: true,
          },
        },
      },
    });
  }

  async findAll(query: TicketQueryDto) {
    const { page, limit, status, priority, userId, search, sortBy, sortOrder } = query;
    const skip = (page - 1) * limit;

    // Dynamic where conditions
    const where: Prisma.TicketWhereInput = {};

    if (status) {
      where.status = status;
    }

    if (priority) {
      where.priority = priority;
    }

    if (userId) {
      where.userId = userId;
    }

    if (search) {
      where.OR = [
        { subject: { contains: search, mode: 'insensitive' } },
        { description: { contains: search, mode: 'insensitive' } },
      ];
    }

    // Execute queries in parallel for high performance
    const [data, total] = await Promise.all([
      this.prisma.ticket.findMany({
        where,
        skip,
        take: limit,
        orderBy: {
          [sortBy]: sortOrder,
        },
        include: {
          user: {
            select: {
              id: true,
              name: true,
              email: true,
              role: true,
            },
          },
        },
      }),
      this.prisma.ticket.count({ where }),
    ]);

    const totalPages = Math.ceil(total / limit);

    return {
      data,
      meta: {
        total,
        page,
        limit,
        totalPages,
        hasNextPage: page < totalPages,
        hasPrevPage: page > 1,
      },
    };
  }

  async findOne(id: string) {
    const ticket = await this.prisma.ticket.findUnique({
      where: { id },
      include: {
        user: {
          select: {
            id: true,
            name: true,
            email: true,
            role: true,
          },
        },
      },
    });

    if (!ticket) {
      throw new NotFoundException(`Ticket with ID '${id}' not found`);
    }

    return ticket;
  }

  async update(id: string, updateTicketDto: UpdateTicketDto) {
    // 1. Ensure ticket exists
    await this.findOne(id);

    // 2. If userId is being changed, ensure new user exists
    if (updateTicketDto.userId) {
      const user = await this.prisma.user.findUnique({
        where: { id: updateTicketDto.userId },
      });
      if (!user) {
        throw new NotFoundException(`User with ID ${updateTicketDto.userId} does not exist`);
      }
    }

    return this.prisma.ticket.update({
      where: { id },
      data: updateTicketDto,
      include: {
        user: {
          select: {
            id: true,
            name: true,
            email: true,
            role: true,
          },
        },
      },
    });
  }

  async remove(id: string) {
    // Ensure ticket exists before deleting
    await this.findOne(id);

    await this.prisma.ticket.delete({
      where: { id },
    });

    return {
      success: true,
      message: `Ticket with ID '${id}' has been permanently deleted`,
      deletedId: id,
    };
  }
}
