import { EntityRepository, Repository } from 'typeorm';
import Blog from './blogs.entity';
import { InternalServerErrorException, Logger } from '@nestjs/common';
import GetBlogsFilterDto from './dto/get-blogs-filter.dto';
import { CreateBlogDto } from './dto/create-blog-dto';
import User from 'src/auth/user.entity';
import Author from 'src/authors/authors.entity';

@EntityRepository(Blog)
export default class BlogRepository extends Repository<Blog> {
  private logger = new Logger('BlogRepository');

  async getBlogs(filterBlogDto: GetBlogsFilterDto): Promise<Blog[]> {
    const { title, description } = filterBlogDto;
    const query = this.createQueryBuilder('blog');

    if (title && description) {
      query.where('blog.title like :search or blog.description like :search', {
        search: `%${title}%`,
      });
    } else if (title) {
      query.where('blog.title like :search', { search: `%${title}%` });
    } else if (description) {
      query.where('blog.description like :search', {
        search: `%${description}%`,
      });
    }

    try {
      const blogs: Blog[] = await query.getMany();

      return blogs;
    } catch (error) {
      this.logger.error(error);
      throw new InternalServerErrorException();
    }
  }

  async createBlog(user: User, createBlogDto: CreateBlogDto): Promise<Blog> {
    const { title, description } = createBlogDto;

    try {
      const author = await this.createQueryBuilder('author')
        .leftJoinAndSelect('author.user', 'user')
        .getOne();
      console.log(author);
      const query = this.createQueryBuilder('blog');
      query
        .insert()
        .into(Blog)
        .values({ title, description, author: author[0] });

      const blog = await query.execute();

      return blog;
    } catch (error) {
      console.log(error);
      throw new InternalServerErrorException();
    }
  }
}
