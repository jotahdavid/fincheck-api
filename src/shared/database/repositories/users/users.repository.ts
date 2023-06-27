import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../prisma.service';
import { FindByEmailDto } from './dto/find-by-email.dto';
import { CreateUserDto } from './dto/create-user.dto';

@Injectable()
export class UsersRepository {
  constructor(private readonly prismaService: PrismaService) {}

  create(createUserDto: CreateUserDto) {
    return this.prismaService.user.create({
      data: {
        name: createUserDto.name,
        email: createUserDto.email,
        password: createUserDto.password,
        categories:
          createUserDto.categories?.length > 0
            ? {
                createMany: {
                  data: createUserDto.categories,
                },
              }
            : undefined,
      },
    });
  }

  findById(userId: string) {
    return this.prismaService.user.findUnique({
      where: { id: userId },
    });
  }

  findByEmail(findByEmailDto: FindByEmailDto) {
    return this.prismaService.user.findUnique({
      where: { email: findByEmailDto.email },
    });
  }

  async checkIfUserExistsByEmail(findByEmailDto: FindByEmailDto) {
    const user = await this.prismaService.user.findUnique({
      where: {
        email: findByEmailDto.email,
      },
      select: {
        id: true,
      },
    });
    return Boolean(user);
  }
}
