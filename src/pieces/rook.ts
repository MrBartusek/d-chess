import { Color } from '../types/color';
import { Piece } from '../base/piece';
import { PieceType } from '../types/piece-type';
import { RegularMove } from '../moves/regular-move';
import { Move } from '../base/moving-strategy';
import { SlideDirection, SlidingMove } from '../moves/sliding-move';

export class Rook extends Piece {
	constructor(protected _color: Color) {
		super(_color);
	}

	get type() {
		return PieceType.ROOK;
	}

	get image(): string {
		return `${this.color}Rook.png`;
	}

	get materialValue(): number {
		return 5;
	}

	get moves(): Move[] {
		return [
			new SlidingMove(SlideDirection.TOP),
			new SlidingMove(SlideDirection.RIGHT),
			new SlidingMove(SlideDirection.BOTTOM),
			new SlidingMove(SlideDirection.LEFT),
		];
	}
}
