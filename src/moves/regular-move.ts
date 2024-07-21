import { Move } from '../base/moving-strategy';
import { Board } from '../board';

export class RegularMove extends Move {
	constructor(protected tiles: number) {
		super();
	}

	computeMoves(_board: Board, position: number): number[] {
		const newPosition = position + this.tiles;

		if (newPosition >= 0 && newPosition <= 63) {
			return [newPosition];
		}
		return [];
	}
}
