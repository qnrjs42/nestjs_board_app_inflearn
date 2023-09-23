import { ArgumentMetadata, BadRequestException, PipeTransform } from '@nestjs/common';
import { BoardStatus } from '../board-status';

export class BoardStatusValidationPipe implements PipeTransform {
  readonly StatusOptions: BoardStatus[] = ['PUBLIC', 'PRIVATE'];

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  transform(value: any, metadata: ArgumentMetadata) {
    value = value.toUpperCase();

    if (!this.isStatusValid(value)) {
      throw new BadRequestException(`${value} isn't in the status options`);
    }

    return value;
  }

  // PUBLIC, PRIVATE 둘 중 하나가 아니면 false를 반환
  private isStatusValid(status: any): boolean {
    const idx = this.StatusOptions.indexOf(status);
    return idx !== -1;
  }
}
