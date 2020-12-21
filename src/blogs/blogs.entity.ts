import Author from 'src/authors/authors.entity';
import Tag from 'src/tags/tags.entity';
import {
  BaseEntity,
  Column,
  Entity,
  JoinColumn,
  JoinTable,
  ManyToMany,
  ManyToOne,
  PrimaryColumn,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
export default class Blog extends BaseEntity {
  @PrimaryGeneratedColumn('uuid', { name: 'blog_id' })
  id: string;

  @Column()
  title: string;

  @Column()
  description: string;

  @ManyToOne(() => Author, (author) => author.blogs, { lazy: true })
  @JoinColumn({ name: 'author_id' })
  author: Author;

  @ManyToMany(() => Tag, (tag) => tag.blogs, { lazy: true })
  @JoinTable({
    name: 'blog_tag',
    joinColumn: { name: 'blog_id', referencedColumnName: 'id' },
    inverseJoinColumn: {
      name: 'tag_id',
      referencedColumnName: 'id',
    },
  })
  tags: Tag[];
}
