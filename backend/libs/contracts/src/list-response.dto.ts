import { PaginationDto } from './pagination.dto';

export class ListResponseDto<T> {
  metadata: PaginationDto;
  data: T[];
}
