import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class PostDto {
  @IsNotEmpty()
  @IsString()
  title: string;
}
