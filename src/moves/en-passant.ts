import { Move } from '../base/moving-strategy';
import { Board } from '../board';
import { Pawn } from '../pieces/pawn';

export class EnPassant extends Move {
	constructor(protected step: -7 | -9 | 7 | 9) {
		super();
	}

	computeMoves(board: Board, position: number): number[] {
		const newPosition = position + this.step;

		const target = board.getByIndex(this.step > 0 ? newPosition - 8 : newPosition + 8);
		if (target instanceof Pawn) {
			if (target.canEnPassant) {
				return [newPosition];
			}
		}
		return [];
	}
}
