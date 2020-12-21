import {
  AfterLoad,
  BaseEntity,
  BeforeInsert,
  Column,
  Entity,
  PrimaryColumn,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { compare, hash } from 'bcryptjs';
import { Expose } from 'class-transformer';
import { v4 as uuid } from 'uuid';
import { UserRoles } from './user-roles';

@Entity()
export default class User extends BaseEntity {
  @PrimaryGeneratedColumn('uuid', { name: 'user_id' })
  id: string;

  @Column({ unique: true })
  email: string;

  @Column()
  password: string;

  @Column({ name: 'first_name' })
  firstName: string;

  @Column({ name: 'last_name' })
  lastName: string;

  @Column({ name: 'is_author', default: false })
  isAuthor: boolean;

  @Column({ default: 'client' })
  role: UserRoles;

  @Expose()
  get fullName() {
    return this.firstName + ' ' + this.lastName;
  }

  @BeforeInsert()
  async hashPassword() {
    this.password = await hash(this.password, 10);
  }

  deletePassword() {
    delete this.password;
  }

  comparePassword(password: string): Promise<boolean> {
    return compare(password, this.password);
  }
}
