import {
  IsEnum,
  IsHexColor,
  IsNotEmpty,
  IsNumber,
  IsString,
} from 'class-validator';
import { BankAccountType } from 'src/modules/bank-accounts/entities/BankAccount';

export class UpdateBankAccountDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsNumber()
  @IsNotEmpty()
  initialBalance: number;

  @IsEnum(BankAccountType)
  @IsNotEmpty()
  type: BankAccountType;

  @IsString()
  @IsHexColor()
  @IsNotEmpty()
  color: string;
}
