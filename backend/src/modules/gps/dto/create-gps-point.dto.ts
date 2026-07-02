import { IsNumber, IsString, IsOptional, Min, Max } from 'class-validator';

export class CreateGpsPointDto {
  @IsNumber() @Min(-90) @Max(90)
  latitude: number;

  @IsNumber() @Min(-180) @Max(180)
  longitude: number;

  @IsString() timestamp: string;

  @IsNumber() @IsOptional()
  speed?: number;

  @IsNumber() @IsOptional()
  accuracy?: number;

  @IsNumber() @IsOptional()
  altitude?: number;
}
