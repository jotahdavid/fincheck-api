import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../prisma.service';

@Injectable()
export class CategoriesRepository {
  constructor(private readonly prismaService: PrismaService) {}

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
