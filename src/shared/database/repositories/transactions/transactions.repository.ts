import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../prisma.service';
import { CreateTransactionDto } from './dto/create-transaction.dto';

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

  create(createTransactionDto: CreateTransactionDto) {
    return this.prismaService.transaction.create({
      data: {
        userId: createTransactionDto.userId,
        bankAccountId: createTransactionDto.bankAccountId,
        categoryId: createTransactionDto.categoryId,
        name: createTransactionDto.name,
        value: createTransactionDto.value,
        date: createTransactionDto.date,
        type: createTransactionDto.type,
      },
    });
  }
}
