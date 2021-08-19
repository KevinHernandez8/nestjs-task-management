import { EntityRepository, Repository } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { User } from './user.entity';

@EntityRepository(User)
export class UsersRepository extends Repository<User> {
  async createUser(createUserDto: CreateUserDto): Promise<void> {
    const { username, password } = createUserDto;
    const newUser = await this.create({ username, password });
    await this.save(newUser);
  }
}
