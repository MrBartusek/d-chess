import { Move } from '../base/moving-strategy';
import { Board } from '../board';

export interface RegularMoveOptions {
	/**
	 * Can this move capture another piece?
	 * @default true
	 */
	canCapture?: boolean;

	/**
	 * Can this move only be made to capture
	 * @default false
	 */
	onlyCapture?: boolean;
}

export class RegularMove extends Move {
	constructor(
		protected step: number,
		protected options: RegularMoveOptions = {},
	) {
		super();
	}

	computeMoves(board: Board, position: number): number[] {
		const newPosition = position + this.step;

		const currentRow = position % 8;
		const nextRow = newPosition % 8;

		if (Math.abs(currentRow - nextRow) > 2) {
			return [];
		}

		if (newPosition >= 0 && newPosition <= 63) {
			const canCapture = this.options.canCapture ?? true;
			if (board.getByIndex(newPosition) != null && !canCapture) {
				return [];
			}
			const onlyCapture = this.options.onlyCapture ?? false;
			if (board.getByIndex(newPosition) == null && onlyCapture) {
				return [];
			}
			return [newPosition];
		}
		return [];
	}
}
