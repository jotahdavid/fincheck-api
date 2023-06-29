import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateTransactionDto } from './dto/create-transaction.dto';
import { UpdateTransactionDto } from './dto/update-transaction.dto';
import { TransactionsRepository } from 'src/shared/database/repositories/transactions/transactions.repository';
import { BankAccountsRepository } from 'src/shared/database/repositories/bank-accounts/bank-accounts.repository';
import { CategoriesRepository } from 'src/shared/database/repositories/categories/categories.repository';

@Injectable()
export class TransactionsService {
  constructor(
    private readonly transactionsRepository: TransactionsRepository,
    private readonly bankAccountsRepository: BankAccountsRepository,
    private readonly categoriesRepository: CategoriesRepository,
  ) {}

  async create(userId: string, createTransactionDto: CreateTransactionDto) {
    const bankAccount = await this.bankAccountsRepository.findById({
      id: createTransactionDto.bankAccountId,
      userId,
    });

    if (!bankAccount) {
      throw new NotFoundException('Bank account not found.');
    }

    const category = await this.categoriesRepository.findById({
      id: createTransactionDto.categoryId,
      userId,
    });

    if (!category) {
      throw new NotFoundException('Category not found.');
    }

    return this.transactionsRepository.create({
      userId,
      ...createTransactionDto,
    });
  }

  findAllByUserId(userId: string) {
    return this.transactionsRepository.findAllByUserId(userId);
  }

  findOne(id: number) {
    return `This action returns a #${id} transaction`;
  }

  update(id: number, updateTransactionDto: UpdateTransactionDto) {
    return `This action updates a #${id} transaction`;
  }

  remove(id: number) {
    return `This action removes a #${id} transaction`;
  }
}
