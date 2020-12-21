import {
  Body,
  Controller,
  Get,
  Post,
  Query,
  UseGuards,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { GetUser } from 'src/auth/get-user.decorator';
import User from 'src/auth/user.entity';
import Blog from './blogs.entity';
import { BlogsService } from './blogs.service';
import { CreateBlogDto } from './dto/create-blog-dto';
import GetBlogsFilterDto from './dto/get-blogs-filter.dto';

@Controller('blogs')
export class BlogsController {
  constructor(private blogService: BlogsService) {}

  @Get()
  getBlogs(@Query() filterDto: GetBlogsFilterDto): Promise<Blog[]> {
    return this.blogService.getBlogs(filterDto);
  }

  @Post()
  @UseGuards(AuthGuard('jwt'))
  createBlog(@GetUser() user: User, @Body() createBlogDto: CreateBlogDto) {
    return this.blogService.createBlog(user, createBlogDto);
  }
}
