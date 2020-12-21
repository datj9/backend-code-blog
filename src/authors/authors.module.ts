import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthorsController } from './authors.controller';
import AuthorRepository from './authors.repository';
import { AuthorsService } from './authors.service';

@Module({
  imports: [TypeOrmModule.forFeature([AuthorRepository])],
  exports: [TypeOrmModule.forFeature([AuthorRepository])],
  providers: [AuthorsService],
  controllers: [AuthorsController],
})
export class AuthorsModule {}
