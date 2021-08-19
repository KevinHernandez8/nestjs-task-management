import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { UsersRepository } from './users.repository';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(UsersRepository)
    private usersRepository: UsersRepository,
  ) {}
  async signUp(createUserDto: CreateUserDto): Promise<void> {
    await this.usersRepository.createUser(createUserDto);
  }
}
