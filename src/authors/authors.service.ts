import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import User from 'src/auth/user.entity';
import Author from './authors.entity';
import AuthorRepository from './authors.repository';

@Injectable()
export class AuthorsService {
  constructor(
    @InjectRepository(AuthorRepository)
    private authorRepository: AuthorRepository,
  ) {}

  getAuthors(): Promise<Author[]> {
    return this.authorRepository.getAuthors();
  }

  getAuthorByUser(user: User) {
    return this.authorRepository.getAuthorByUser(user);
  }

  createAuthor(user: User): Promise<Author> {
    return this.authorRepository.createAuthor(user);
  }
}
