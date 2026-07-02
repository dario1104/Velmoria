import { IsArray, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';
import { CreateGpsPointDto } from './create-gps-point.dto';

export class BatchGpsPointsDto {
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => CreateGpsPointDto)
  points: (CreateGpsPointDto & { tripId: string })[];
}
