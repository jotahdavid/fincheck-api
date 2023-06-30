import { Injectable } from '@nestjs/common';
import { CreateTransactionDto } from '../dto/create-transaction.dto';
import { UpdateTransactionDto } from '../dto/update-transaction.dto';
import { TransactionsRepository } from 'src/shared/database/repositories/transactions/transactions.repository';
import { ValidateTransactionOwnershipService } from './validate-transaction-ownership.service';
import { ValidateBankAccountOwnershipService } from '../../bank-accounts/services/validate-bank-account-ownership.service';
import { ValidateCategoryOwnershipService } from '../../categories/services/validate-category-ownership.service';

@Injectable()
export class TransactionsService {
  constructor(
    private readonly transactionsRepository: TransactionsRepository,
    private readonly validateTransactionOwnershipService: ValidateTransactionOwnershipService,
    private readonly validateBankAccountOwnershipService: ValidateBankAccountOwnershipService,
    private readonly validateCategoryOwnershipService: ValidateCategoryOwnershipService,
  ) {}

  async create(userId: string, createTransactionDto: CreateTransactionDto) {
    await this.validatEntitiesOwnership({
      userId,
      bankAccountId: createTransactionDto.bankAccountId,
      categoryId: createTransactionDto.categoryId,
    });

    return this.transactionsRepository.create({
      userId,
      ...createTransactionDto,
    });
  }

  findAllByUserId(userId: string) {
    return this.transactionsRepository.findAllByUserId(userId);
  }

  async update(
    userId: string,
    transactionId: string,
    updateTransactionDto: UpdateTransactionDto,
  ) {
    await this.validatEntitiesOwnership({
      userId,
      transactionId,
      bankAccountId: updateTransactionDto.bankAccountId,
      categoryId: updateTransactionDto.categoryId,
    });

    return this.transactionsRepository.update({
      ...updateTransactionDto,
      id: transactionId,
    });
  }

  remove(id: number) {
    return `This action removes a #${id} transaction`;
  }

  private async validatEntitiesOwnership({
    userId,
    bankAccountId,
    categoryId,
    transactionId,
  }: {
    userId: string;
    bankAccountId?: string;
    categoryId?: string;
    transactionId?: string;
  }) {
    await Promise.all([
      transactionId &&
        this.validateTransactionOwnershipService.validate(
          userId,
          transactionId,
        ),
      bankAccountId &&
        this.validateBankAccountOwnershipService.validate(
          userId,
          bankAccountId,
        ),
      categoryId &&
        this.validateCategoryOwnershipService.validate(userId, categoryId),
    ]);
  }
}
