import { PaginationDto } from './pagination.dto';
import { IsOptional, IsString } from 'class-validator';

export class ListRequestDto extends PaginationDto {
  @IsOptional()
  @IsString()
  searchLocation?: string;
}
