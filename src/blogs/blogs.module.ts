import { Module } from '@nestjs/common';
import { BlogsService } from './blogs.service';
import { BlogsController } from './blogs.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import BlogRepository from './blogs.repository';
import { PassportModule } from '@nestjs/passport';

@Module({
  imports: [PassportModule, TypeOrmModule.forFeature([BlogRepository])],
  providers: [BlogsService],
  controllers: [BlogsController],
})
export class BlogsModule {}
