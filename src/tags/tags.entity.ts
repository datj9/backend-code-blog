import Blog from 'src/blogs/blogs.entity';
import {
  BaseEntity,
  Column,
  Entity,
  ManyToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
export default class Tag extends BaseEntity {
  @PrimaryGeneratedColumn('uuid', { name: 'tag_id' })
  id: number;

  @Column()
  name: string;

  @ManyToMany(() => Blog, (blog) => blog.tags, { lazy: true })
  blogs: Blog[];
}
