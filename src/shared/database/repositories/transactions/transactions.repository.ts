import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../prisma.service';
import { CreateTransactionDto } from './dto/create-transaction.dto';
import { FindTransactionByIdDto } from './dto/find-transaction-by-id.dto';
import { UpdateTransactionDto } from './dto/update-transaction.dto';

@Injectable()
export class TransactionsRepository {
  constructor(private readonly prismaService: PrismaService) {}

  findById(findTransactionByIdDto: FindTransactionByIdDto) {
    return this.prismaService.transaction.findFirst({
      where: {
        id: findTransactionByIdDto.id,
        userId: findTransactionByIdDto.userId,
      },
    });
  }

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

  update(updateTransactionDto: UpdateTransactionDto) {
    return this.prismaService.transaction.update({
      where: { id: updateTransactionDto.id },
      data: {
        bankAccountId: updateTransactionDto.bankAccountId,
        categoryId: updateTransactionDto.categoryId,
        name: updateTransactionDto.name,
        value: updateTransactionDto.value,
        date: updateTransactionDto.date,
        type: updateTransactionDto.type,
      },
    });
  }
}
