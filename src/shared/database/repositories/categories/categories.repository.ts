import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../prisma.service';
import { FindCategoryByIdDto } from './dto/find-category-by-id.dto';

@Injectable()
export class CategoriesRepository {
  constructor(private readonly prismaService: PrismaService) {}

  findById(findCategoryByIdDto: FindCategoryByIdDto) {
    return this.prismaService.category.findFirst({
      where: {
        id: findCategoryByIdDto.id,
        userId: findCategoryByIdDto.userId,
      },
    });
  }

  findAllByUserId(userId: string) {
    return this.prismaService.category.findMany({
      where: { userId },
      select: {
        id: true,
        name: true,
        icon: true,
        type: true,
      },
    });
  }
}
