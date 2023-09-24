import { User } from 'src/auth/user.entity';
import { CustomRepository } from 'src/configs/typeorm.decorator';
import { DataSource, Repository } from 'typeorm';
import { Board } from './board.entity';
import { CreateBoardDto } from './dto/create-board.dto';

@CustomRepository(Board)
export class BoardRepository extends Repository<Board> {
  constructor(dataSource: DataSource) {
    super(Board, dataSource.createEntityManager());
  }

  async createBoard(createBoardDto: CreateBoardDto, user: User): Promise<Board> {
    const board = this.create({ ...createBoardDto, status: 'PUBLIC', user });
    await this.save(board);
    return board;
  }
}
