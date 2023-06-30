import {
  IsDateString,
  IsEnum,
  IsNotEmpty,
  IsNumber,
  IsPositive,
  IsString,
  IsUUID,
} from 'class-validator';
import { TransactionType } from 'src/modules/transactions/entities/Transaction';

export class UpdateTransactionDto {
  @IsString()
  @IsUUID()
  @IsNotEmpty()
  id: string;

  @IsString()
  @IsUUID()
  @IsNotEmpty()
  bankAccountId: string;

  @IsString()
  @IsUUID()
  @IsNotEmpty()
  categoryId: string;

  @IsString()
  @IsNotEmpty()
  name: string;

  @IsNumber()
  @IsNotEmpty()
  @IsPositive()
  value: number;

  @IsDateString()
  @IsNotEmpty()
  date: Date;

  @IsEnum(TransactionType)
  @IsNotEmpty()
  type: TransactionType;
}
