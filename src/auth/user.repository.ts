import { ConflictException, InternalServerErrorException } from '@nestjs/common';
import { CustomRepository } from 'src/configs/typeorm.decorator';
import { DataSource, Repository } from 'typeorm';
import { AuthCredentialsDto } from './dto/auth-credential.dto';
import { User } from './user.entity';

@CustomRepository(User)
export class UserRepository extends Repository<User> {
  constructor(dataSource: DataSource) {
    super(User, dataSource.createEntityManager());
  }

  async createUser(authCredntialsDto: AuthCredentialsDto): Promise<void> {
    const user = this.create(authCredntialsDto);

    try {
      await this.save(user);
    } catch (error) {
      if (error.code === '23505') {
        throw new ConflictException('Username already exists');
      } else {
        throw new InternalServerErrorException();
      }
    }
  }
}
