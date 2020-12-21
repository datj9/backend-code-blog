import { EntityRepository, Repository } from 'typeorm';
import CreateUserDto from './dto/create-user-dto';
import User from './user.entity';
import {
  ConflictException,
  InternalServerErrorException,
  Logger,
} from '@nestjs/common';

@EntityRepository(User)
export default class UserRepository extends Repository<User> {
  private logger = new Logger('UserRepository');

  async createUser(createUserDto: CreateUserDto): Promise<User> {
    try {
      const { email, password, firstName, lastName } = createUserDto;

      const user = new User();
      user.email = email;
      user.password = password;
      user.firstName = firstName;
      user.lastName = lastName;

      await user.save();

      return user;
    } catch (error) {
      const userAlreadyExists = error.code === '23505';

      if (userAlreadyExists) throw new ConflictException();
      throw new InternalServerErrorException();
    }
  }

  async getUserByEmail(email: string) {
    try {
      const query = this.createQueryBuilder('user');

      const user = await query.where('user.email = :email', { email }).getOne();

      return user;
    } catch (error) {
      this.logger.error(error);

      throw new InternalServerErrorException();
    }
  }
}
