import { IsInt, IsOptional, Min } from 'class-validator';
import { Transform, Expose } from 'class-transformer';

export class PaginationDto {
  @IsOptional()
  @Transform(({ value }) => parseInt(value, 10))
  @IsInt()
  @Min(1)
  page?: number = 1;

  @IsOptional()
  @Transform(({ value }) => parseInt(value, 10))
  @IsInt()
  @Min(1)
  pageSize: number = 5;

  @Expose({ toClassOnly: true }) // This field will only appear in responses, not in requests
  total?: number;
}
