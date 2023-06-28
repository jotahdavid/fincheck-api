import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateBankAccountDto } from './dto/create-bank-account.dto';
import { UpdateBankAccountDto } from './dto/update-bank-account.dto';
import { BankAccountsRepository } from 'src/shared/database/repositories/bank-accounts/bank-accounts.repository';

@Injectable()
export class BankAccountsService {
  constructor(
    private readonly bankAccountsRepository: BankAccountsRepository,
  ) {}

  create(userId: string, createBankAccountDto: CreateBankAccountDto) {
    return this.bankAccountsRepository.create({
      userId,
      ...createBankAccountDto,
    });
  }

  findAllByUserId(userId: string) {
    return this.bankAccountsRepository.findAllByUserId(userId);
  }

  findOne(id: number) {
    return `This action returns a #${id} bankAccount`;
  }

  async update(
    userId: string,
    bankAccountId: string,
    updateBankAccountDto: UpdateBankAccountDto,
  ) {
    const bankAccount = await this.bankAccountsRepository.findById({
      id: bankAccountId,
      userId,
    });

    if (!bankAccount) {
      throw new NotFoundException('Bank account not found.');
    }

    return this.bankAccountsRepository.update({
      id: bankAccountId,
      ...updateBankAccountDto,
    });
  }

  async remove(userId: string, bankAccountId: string) {
    const bankAccount = await this.bankAccountsRepository.findById({
      id: bankAccountId,
      userId,
    });

    if (!bankAccount) {
      throw new NotFoundException('Bank account not found.');
    }

    await this.bankAccountsRepository.delete(bankAccountId);
  }
}
