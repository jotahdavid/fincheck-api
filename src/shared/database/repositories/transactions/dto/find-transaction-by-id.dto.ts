import { IsNotEmpty, IsString, IsUUID } from 'class-validator';

export class FindTransactionByIdDto {
  @IsString()
  @IsUUID()
  @IsNotEmpty()
  id: string;

  @IsString()
  @IsUUID()
  @IsNotEmpty()
  userId: string;
}
