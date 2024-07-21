import { Board } from '../board';

export abstract class Move {
	abstract computeMoves(board: Board, position: number): number[];
}
