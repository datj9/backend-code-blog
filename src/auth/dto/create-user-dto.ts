import { IsEmail, IsNotEmpty, MaxLength, MinLength } from 'class-validator';

export default class CreateUserDto {
  @IsNotEmpty()
  @IsEmail()
  email: string;

  @IsNotEmpty()
  @MaxLength(10)
  firstName: string;

  @IsNotEmpty()
  @MaxLength(10)
  lastName: string;

  @IsNotEmpty()
  @MinLength(8)
  @MaxLength(20)
  password: string;
}
