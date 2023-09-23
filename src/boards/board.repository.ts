import { CustomRepository } from 'src/configs/typeorm.decorator';
import { DataSource, Repository } from 'typeorm';
import { Board } from './board.entity';
import { CreateBoardDto } from './dto/create-board.dto';

@CustomRepository(Board)
export class BoardRepository extends Repository<Board> {
  constructor(dataSource: DataSource) {
    super(Board, dataSource.createEntityManager());
  }

  async createBoard(createBoardDto: CreateBoardDto): Promise<Board> {
    const board = this.create({ ...createBoardDto, status: 'PUBLIC' });
    await this.save(board);
    return board;
  }
}
