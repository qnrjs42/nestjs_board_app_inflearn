import { Injectable } from '@nestjs/common';
import { Board } from './boards.model';

@Injectable()
export class BoardsService {
  private boards: Board[] = []; // 다른 곳에서 접근할 수 없도록 private로 선언

  getAllBoards() {
    return this.boards;
  }
}
