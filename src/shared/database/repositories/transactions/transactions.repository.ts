import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../prisma.service';

@Injectable()
export class TransactionsRepository {
  constructor(private readonly prismaService: PrismaService) {}

  findAllByUserId(userId: string) {
    return this.prismaService.transaction.findMany({
      where: { userId },
      select: {
        id: true,
        bankAccountId: true,
        categoryId: true,
        name: true,
        value: true,
        date: true,
        type: true,
      },
    });
  }
}
