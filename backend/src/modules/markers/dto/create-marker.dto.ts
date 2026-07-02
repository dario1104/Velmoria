import { IsString, IsNumber, IsOptional, Min, Max } from 'class-validator';

export class CreateMarkerDto {
  @IsNumber() @Min(-90) @Max(90)
  latitude: number;

  @IsNumber() @Min(-180) @Max(180)
  longitude: number;

  @IsString()
  type: string;

  @IsString() @IsOptional()
  content?: string;

  @IsString() @IsOptional()
  mood?: string;
}
