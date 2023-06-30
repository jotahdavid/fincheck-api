import { Module } from '@nestjs/common';
import { TransactionsService } from './services/transactions.service';
import { TransactionsController } from './transactions.controller';
import { ValidateTransactionOwnershipService } from './services/validate-transaction-ownership.service';
import { ValidateBankAccountOwnershipService } from '../bank-accounts/services/validate-bank-account-ownership.service';
import { ValidateCategoryOwnershipService } from '../categories/services/validate-category-ownership.service';

@Module({
  controllers: [TransactionsController],
  providers: [
    TransactionsService,
    ValidateTransactionOwnershipService,
    ValidateBankAccountOwnershipService,
    ValidateCategoryOwnershipService,
  ],
})
export class TransactionsModule {}
