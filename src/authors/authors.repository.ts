import { InternalServerErrorException, Logger } from '@nestjs/common';
import User from 'src/auth/user.entity';
import { EntityRepository, Repository } from 'typeorm';
import Author from './authors.entity';

@EntityRepository(Author)
export default class AuthorRepository extends Repository<Author> {
  private logger = new Logger('AuthorRepository');

  async getAuthors(): Promise<Author[]> {
    const query = this.createQueryBuilder('authors');

    try {
      const authors: Author[] = await query.getMany();

      return authors;
    } catch (error) {
      throw new InternalServerErrorException();
    }
  }

  async getAuthorByUser(user: User) {
    const author = await this.createQueryBuilder('author')
      .leftJoinAndSelect('author.user', 'user')
      .where('user.user_id = :userId', { userId: user.id })
      .getOne();

    author.user.deletePassword();
    return author;
  }

  async createAuthor(user: User): Promise<Author> {
    const author = new Author();
    author.user = user;
    user.isAuthor = true;
    await author.save();
    await user.save();
    delete author.user;
    return author;
  }
}
