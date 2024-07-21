import { Move } from '../base/moving-strategy';
import { Board } from '../board';

export class RegularMove extends Move {
	constructor(protected step: number) {
		super();
	}

	computeMoves(_board: Board, position: number): number[] {
		const newPosition = position + this.step;

		const currentRow = position % 8;
		const nextRow = newPosition % 8;

		if (Math.abs(currentRow - nextRow) > 2) {
			return [];
		}

		if (newPosition >= 0 && newPosition <= 63) {
			return [newPosition];
		}
		return [];
	}
}
