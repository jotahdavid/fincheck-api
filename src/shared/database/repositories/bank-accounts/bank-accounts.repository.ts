import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../prisma.service';
import { CreateBankAccountDto } from './dto/create-bank-account.dto';

@Injectable()
export class BankAccountsRepository {
  constructor(private readonly prismaService: PrismaService) {}

  create(createBankAccountDto: CreateBankAccountDto) {
    return this.prismaService.bankAccount.create({
      data: {
        userId: createBankAccountDto.userId,
        name: createBankAccountDto.name,
        initialBalance: createBankAccountDto.initialBalance,
        type: createBankAccountDto.type,
        color: createBankAccountDto.color,
      },
    });
  }
}
