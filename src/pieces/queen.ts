import { Move } from '../base/moving-strategy';
import { Piece } from '../base/piece';
import { SlideDirection, SlidingMove } from '../moves/sliding-move';
import { Color } from '../types/color';
import { PieceType } from '../types/piece-type';

export class Queen extends Piece {
	constructor(protected _color: Color) {
		super(_color);
	}

	get type() {
		return PieceType.QUEEN;
	}

	get image(): string {
		return `${this.color}Queen.png`;
	}

	get materialValue(): number {
		return 9;
	}

	get isKing(): boolean {
		return false;
	}

	get moves(): Move[] {
		return [
			new SlidingMove(SlideDirection.TOP_LEFT),
			new SlidingMove(SlideDirection.TOP_RIGHT),
			new SlidingMove(SlideDirection.RIGHT),
			new SlidingMove(SlideDirection.BOTTOM_RIGHT),
			new SlidingMove(SlideDirection.BOTTOM),
			new SlidingMove(SlideDirection.BOTTOM_LEFT),
			new SlidingMove(SlideDirection.LEFT),
			new SlidingMove(SlideDirection.TOP),
		];
	}
}
