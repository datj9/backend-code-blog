import { IsNotEmpty, IsOptional } from 'class-validator';

export default class GetBlogsFilterDto {
  @IsOptional()
  @IsNotEmpty()
  title: string;

  @IsOptional()
  @IsNotEmpty()
  description: string;
}
