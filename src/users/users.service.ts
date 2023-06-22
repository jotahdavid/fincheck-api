import { ConflictException, Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { PrismaService } from 'src/database/prisma.service';
import { hash } from 'bcryptjs';

@Injectable()
export class UsersService {
  constructor(private readonly prismaService: PrismaService) {}

  async create(createUserDto: CreateUserDto) {
    const isEmailTaken = await this.prismaService.user.findUnique({
      where: { email: createUserDto.email },
      select: { id: true },
    });

    if (isEmailTaken) {
      throw new ConflictException('This e-mail is already in use');
    }

    const hashedPassword = await hash(createUserDto.password, 8);

    const user = await this.prismaService.user.create({
      data: {
        name: createUserDto.name,
        email: createUserDto.email,
        password: hashedPassword,
      },
    });

    return {
      name: user.name,
      email: user.email,
    };
  }
}
