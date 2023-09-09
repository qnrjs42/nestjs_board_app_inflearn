import { Injectable } from '@nestjs/common';

@Injectable()
export class BoardsService {
  private boards = ['asd', 'sdf', 'dfg']; // 다른 곳에서 접근할 수 없도록 private로 선언

  getAllBoards() {
    return this.boards;
  }
}
