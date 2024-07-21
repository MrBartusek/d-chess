import { Move } from '../base/moving-strategy';
import { Board } from '../board';

export enum SlideDirection {
	TOP = 'TOP',
	TOP_RIGHT = 'TOP_RIGHT',
	RIGHT = 'RIGHT',
	BOTTOM_RIGHT = 'BOTTOM_RIGHT',
	BOTTOM = 'BOTTOM',
	BOTTOM_LEFT = 'BOTTOM_LEFT',
	LEFT = 'LEFT',
	TOP_LEFT = 'TOP_LEFT',
}

export class SlidingMove extends Move {
	constructor(protected direction: SlideDirection) {
		super();
	}

	computeMoves(board: Board, position: number): number[] {
		const moves = [];
		let newPosition = position;

		while (newPosition >= 0 && newPosition <= 63) {
			moves.push(newPosition);

			const nextPosition = this.calculateStepDiff() + newPosition;

			// Handle board edges
			if (this.isEdgeCase(newPosition, nextPosition)) {
				break;
			}

			newPosition = nextPosition;

			const pieceAtStep = board.getByIndex(newPosition);
			if (pieceAtStep != null) {
				const currentPiece = board.getByIndex(position)!;
				if (pieceAtStep.color != currentPiece.color) {
					moves.push(newPosition);
				}
				break;
			}
		}

		return moves;
	}

	private calculateStepDiff() {
		switch (this.direction) {
			case SlideDirection.TOP:
				return -8;
			case SlideDirection.TOP_RIGHT:
				return -7;
			case SlideDirection.RIGHT:
				return 1;
			case SlideDirection.BOTTOM_RIGHT:
				return 9;
			case SlideDirection.BOTTOM:
				return 8;
			case SlideDirection.BOTTOM_LEFT:
				return 7;
			case SlideDirection.LEFT:
				return -1;
			case SlideDirection.TOP_LEFT:
				return -9;
			default:
				throw new Error('Invalid slide direction');
		}
	}

	private isEdgeCase(currentPosition: number, nextPosition: number): boolean {
		const currentRow = Math.floor(currentPosition / 8);
		const nextRow = Math.floor(nextPosition / 8);

		switch (this.direction) {
			case SlideDirection.LEFT:
			case SlideDirection.RIGHT:
				return currentRow !== nextRow;
			case SlideDirection.TOP_LEFT:
			case SlideDirection.BOTTOM_LEFT:
				return nextPosition % 8 === 7;
			case SlideDirection.TOP_RIGHT:
			case SlideDirection.BOTTOM_RIGHT:
				return nextPosition % 8 === 0;
			default:
				return false;
		}
	}
}
