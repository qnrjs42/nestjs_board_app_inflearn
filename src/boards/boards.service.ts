import { Injectable } from '@nestjs/common';
import { Board } from './boards.model';
import { nanoid } from 'nanoid';
import { CreateBoardDto } from './dto/create-board.dto';

@Injectable()
export class BoardsService {
  private boards: Board[] = []; // 다른 곳에서 접근할 수 없도록 private로 선언

  getAllBoards(): Board[] {
    return this.boards;
  }

  createBoard({ title, description }: CreateBoardDto): Board {
    const board: Board = {
      id: nanoid(),
      title,
      description,
      status: 'PUBLIC',
    };
    this.boards.push(board);
    return board;
  }

  getBoardById(id: string): Board {
    return this.boards.find(board => board.id === id);
  }
}
