import { IsString, MinLength, IsOptional } from 'class-validator';

export class CreateTripDto {
  @IsString()
  @MinLength(1)
  title: string;

  @IsString()
  @IsOptional()
  description?: string;
}
