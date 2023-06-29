import { IsNotEmpty, IsString, IsUUID } from 'class-validator';

export class FindCategoryByIdDto {
  @IsString()
  @IsUUID()
  @IsNotEmpty()
  id: string;

  @IsString()
  @IsUUID()
  @IsNotEmpty()
  userId: string;
}
