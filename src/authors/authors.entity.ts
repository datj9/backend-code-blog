import User from 'src/auth/user.entity';
import Blog from 'src/blogs/blogs.entity';
import {
  BaseEntity,
  Column,
  Entity,
  JoinColumn,
  OneToMany,
  OneToOne,
  PrimaryColumn,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
export default class Author extends BaseEntity {
  @PrimaryGeneratedColumn('uuid', { name: 'author_id' })
  id: string;

  @OneToOne(() => User)
  @JoinColumn({ name: 'user_id' })
  user: User;

  @OneToMany(() => Blog, (blog) => blog.author, { lazy: true })
  blogs: Blog[];

  @Column({ name: 'blog_website', nullable: true })
  blogWebsite: string;

  @Column({ name: 'youtube_channel', nullable: true })
  youtubeChannel: string;
}
