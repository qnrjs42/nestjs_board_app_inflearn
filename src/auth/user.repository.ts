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

    await this.save(user);
  }
}
