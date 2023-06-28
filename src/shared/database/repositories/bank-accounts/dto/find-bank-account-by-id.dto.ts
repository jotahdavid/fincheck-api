import { IsNotEmpty, IsString, IsUUID } from 'class-validator';

export class FindBankAccountByIdDto {
  @IsString()
  @IsUUID()
  @IsNotEmpty()
  id: string;

  @IsString()
  @IsUUID()
  @IsNotEmpty()
  userId: string;
}
