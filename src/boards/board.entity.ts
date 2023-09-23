import { BaseEntity, Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import type { BoardStatus } from './board-status';

@Entity()
export class Board extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

  @Column()
  description: string;

  @Column()
  status: BoardStatus;
}
