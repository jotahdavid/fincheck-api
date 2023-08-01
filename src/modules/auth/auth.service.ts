import {
  ConflictException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { compare, hash } from 'bcryptjs';
import { SigninDto } from './dto/signin.dto';
import { SignupDto } from './dto/signup.dto';
import { UsersRepository } from 'src/shared/database/repositories/users/users.repository';

@Injectable()
export class AuthService {
  constructor(
    private readonly usersRepository: UsersRepository,
    private readonly jwtService: JwtService,
  ) {}

  async authenticate(signinDto: SigninDto) {
    const user = await this.usersRepository.findByEmail({
      email: signinDto.email,
    });

    if (!user) {
      throw new UnauthorizedException('Invalid credentials');
    }

    const isPasswordValid = await compare(signinDto.password, user.password);

    if (!isPasswordValid) {
      throw new UnauthorizedException('Invalid credentials');
    }

    const accessToken = await this.generateAccessToken(user.id);

    return { accessToken };
  }

  async signup(signupDto: SignupDto) {
    const isEmailTaken = await this.usersRepository.checkIfUserExistsByEmail({
      email: signupDto.email,
    });

    if (isEmailTaken) {
      throw new ConflictException('This e-mail is already in use');
    }

    const hashedPassword = await hash(signupDto.password, 8);

    const user = await this.usersRepository.create({
      name: signupDto.name,
      email: signupDto.email,
      password: hashedPassword,
      categories: [
        // Income
        { name: 'Salário', icon: 'salary', type: 'INCOME' },
        { name: 'Freelance', icon: 'freelance', type: 'INCOME' },
        { name: 'Outro', icon: 'other', type: 'INCOME' },
        // Expense
        { name: 'Casa', icon: 'home', type: 'EXPENSE' },
        { name: 'Alimentação', icon: 'food', type: 'EXPENSE' },
        { name: 'Educação', icon: 'education', type: 'EXPENSE' },
        { name: 'Lazer', icon: 'fun', type: 'EXPENSE' },
        { name: 'Mercado', icon: 'grocery', type: 'EXPENSE' },
        { name: 'Roupas', icon: 'clothes', type: 'EXPENSE' },
        { name: 'Transporte', icon: 'transport', type: 'EXPENSE' },
        { name: 'Viagem', icon: 'travel', type: 'EXPENSE' },
        { name: 'Outro', icon: 'other', type: 'EXPENSE' },
      ],
    });

    const accessToken = await this.generateAccessToken(user.id);

    return { accessToken };
  }

  private generateAccessToken(userId: string) {
    return this.jwtService.signAsync({
      sub: userId,
    });
  }
}
