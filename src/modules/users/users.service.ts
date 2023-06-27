import { Injectable } from '@nestjs/common';
import { UsersRepository } from 'src/shared/database/repositories/users/users.repository';

@Injectable()
export class UsersService {
  constructor(private readonly usersRepository: UsersRepository) {}

  async getUserById(userId: string) {
    const user = await this.usersRepository.findById(userId);
    return {
      name: user.name,
      email: user.email,
    };
  }
}
