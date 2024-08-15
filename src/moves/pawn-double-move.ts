import { Move } from '../base/moving-strategy';
import { Board } from '../board';

/**
 * This is a special move where pawn which have not been moved
 * can move 2 squares forward without checking
 */
export class PawnDoubleMove extends Move {
	constructor(protected step: -16 | 16) {
		super();
	}

	computeMoves(board: Board, position: number): number[] {
		const newPosition = position + this.step;
		const halfPosition = position + this.step / 2;

		const halfPositionPiece = board.getByIndex(halfPosition);
		const newPositionPiece = board.getByIndex(newPosition);

		if (halfPositionPiece == null && newPositionPiece == null) {
			return [newPosition];
		} else {
			return [];
		}
	}
}
