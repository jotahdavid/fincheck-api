import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateTransactionDto } from './dto/create-transaction.dto';
import { UpdateTransactionDto } from './dto/update-transaction.dto';
import { TransactionsRepository } from 'src/shared/database/repositories/transactions/transactions.repository';
import { CategoriesRepository } from 'src/shared/database/repositories/categories/categories.repository';
import { ValidateBankAccountOwnershipService } from '../bank-accounts/services/validate-bank-account-ownership.service';

@Injectable()
export class TransactionsService {
  constructor(
    private readonly transactionsRepository: TransactionsRepository,
    private readonly categoriesRepository: CategoriesRepository,
    private readonly validateBankAccountOwnershipService: ValidateBankAccountOwnershipService,
  ) {}

  async create(userId: string, createTransactionDto: CreateTransactionDto) {
    await this.validateBankAccountOwnershipService.validate(
      userId,
      createTransactionDto.bankAccountId,
    );

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
