import { Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { AuthCredentialsDto } from './dto/auth-credential.dto';
import { UserRepository } from './user.repository';
import * as bcrypt from 'bcryptjs';

@Injectable()
export class AuthService {
  constructor(@InjectRepository(UserRepository) private userRepository: UserRepository) {}

  async signUp(authCredntialsDto: AuthCredentialsDto): Promise<void> {
    return this.userRepository.createUser(authCredntialsDto);
  }

  async signIn({ username, password }: AuthCredentialsDto): Promise<string> {
    const user = await this.userRepository.findOneBy({ username });

    if (user && (await bcrypt.compare(password, user.password))) {
      return 'login success';
    } else {
      throw new UnauthorizedException('login failed');
    }
  }
}
