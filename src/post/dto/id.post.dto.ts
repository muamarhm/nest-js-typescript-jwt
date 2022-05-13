import { IsNotEmpty, IsNumber } from 'class-validator';

export class IdPostDto {
  @IsNotEmpty()
  @IsNumber()
  id: number;
}
