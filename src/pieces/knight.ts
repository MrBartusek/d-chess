import { Color } from '../types/color';
import { Piece } from '../base/piece';
import { PieceType } from '../types/piece-type';
import { Move } from '../base/moving-strategy';
import { RegularMove } from '../moves/regular-move';

export class Knight extends Piece {
	constructor(protected _color: Color) {
		super(_color);
	}

	get type() {
		return PieceType.KNIGHT;
	}

	get image(): string {
		return `${this.color}Knight.png`;
	}

	get moves(): Move[] {
		return [
			new RegularMove(17), // Move up 2, right 1
			new RegularMove(15), // Move up 2, left 1
			new RegularMove(10), // Move up 1, right 2
			new RegularMove(6), // Move up 1, left 2
			new RegularMove(-17), // Move down 2, left 1
			new RegularMove(-15), // Move down 2, right 1
			new RegularMove(-10), // Move down 1, left 2
			new RegularMove(-6), // Move down 1, right 2
		];
	}
}
