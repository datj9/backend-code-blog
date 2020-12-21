import { Controller, Get, Post, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { GetUser } from 'src/auth/get-user.decorator';
import User from 'src/auth/user.entity';
import { AuthorsService } from './authors.service';
import { Authorize } from '../auth/authorize.decorator';
import { UserRoles } from 'src/auth/user-roles';

@Controller('authors')
export class AuthorsController {
  constructor(private authorService: AuthorsService) {}

  @Get()
  @UseGuards(AuthGuard('jwt'))
  getAuthors() {
    return this.authorService.getAuthors();
  }

  @Get('get-author-info')
  @UseGuards(AuthGuard('jwt'))
  getAuthorByUser(@GetUser() user: User) {
    return this.authorService.getAuthorByUser(user);
  }

  @Post()
  @UseGuards(AuthGuard('jwt'))
  createAuthor(@GetUser() user: User) {
    return this.authorService.createAuthor(user);
  }
}
