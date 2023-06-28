import {
  IsEnum,
  IsHexColor,
  IsNotEmpty,
  IsNumber,
  IsString,
  IsUUID,
} from 'class-validator';
import { BankAccountType } from 'src/modules/bank-accounts/entities/BankAccount';

export class UpdateBankAccountDto {
  @IsString()
  @IsUUID()
  @IsNotEmpty()
  id: string;

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
