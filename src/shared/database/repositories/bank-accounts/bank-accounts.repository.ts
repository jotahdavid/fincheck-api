import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../prisma.service';
import { CreateBankAccountDto } from './dto/create-bank-account.dto';
import { FindBankAccountByIdDto } from './dto/find-bank-account-by-id.dto';
import { UpdateBankAccountDto } from './dto/update-bank-account.dto';

@Injectable()
export class BankAccountsRepository {
  constructor(private readonly prismaService: PrismaService) {}

  findById(findBankAccountByIdDto: FindBankAccountByIdDto) {
    return this.prismaService.bankAccount.findFirst({
      where: {
        id: findBankAccountByIdDto.id,
        userId: findBankAccountByIdDto.userId,
      },
    });
  }

  findAllByUserId(userId: string) {
    return this.prismaService.bankAccount.findMany({
      where: { userId },
      select: {
        id: true,
        name: true,
        initialBalance: true,
        color: true,
        type: true,
      },
    });
  }

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

  update(updateBankAccountDto: UpdateBankAccountDto) {
    return this.prismaService.bankAccount.update({
      where: { id: updateBankAccountDto.id },
      data: {
        name: updateBankAccountDto.name,
        initialBalance: updateBankAccountDto.initialBalance,
        type: updateBankAccountDto.type,
        color: updateBankAccountDto.color,
      },
    });
  }

  delete(bankAccountId: string) {
    return this.prismaService.bankAccount.delete({
      where: { id: bankAccountId },
    });
  }
}
