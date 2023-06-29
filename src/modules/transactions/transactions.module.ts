import { Module } from '@nestjs/common';
import { TransactionsService } from './transactions.service';
import { TransactionsController } from './transactions.controller';
import { ValidateBankAccountOwnershipService } from '../bank-accounts/services/validate-bank-account-ownership.service';
import { ValidateCategoryOwnershipService } from '../categories/services/validate-category-ownership.service';

@Module({
  controllers: [TransactionsController],
  providers: [
    TransactionsService,
    ValidateBankAccountOwnershipService,
    ValidateCategoryOwnershipService,
  ],
})
export class TransactionsModule {}
