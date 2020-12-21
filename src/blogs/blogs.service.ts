import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import User from 'src/auth/user.entity';
import Author from 'src/authors/authors.entity';
import Blog from './blogs.entity';
import BlogRepository from './blogs.repository';
import { CreateBlogDto } from './dto/create-blog-dto';
import GetBlogsFilterDto from './dto/get-blogs-filter.dto';

@Injectable()
export class BlogsService {
  constructor(
    @InjectRepository(BlogRepository) private blogRepository: BlogRepository,
  ) {}

  getBlogs(filterDto: GetBlogsFilterDto): Promise<Blog[]> {
    return this.blogRepository.getBlogs(filterDto);
  }

  async createBlog(user: User, createBlogDto: CreateBlogDto): Promise<Blog> {
    // console.log(user);
    // const author = await Author.findOne({ rel: { user:  } });
    // console.log(author);
    return this.blogRepository.createBlog(user, createBlogDto);
  }
}
