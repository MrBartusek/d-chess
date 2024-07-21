import { Color } from '../types/color';
import { Piece } from '../base/piece';
import { PieceType } from '../types/piece-type';
import { Move } from '../base/moving-strategy';
import { RegularMove } from '../moves/regular-move';

export class King extends Piece {
	constructor(protected _color: Color) {
		super(_color);
	}

	get type() {
		return PieceType.KING;
	}

	get image(): string {
		return `${this.color}King.png`;
	}

	get moves(): Move[] {
		return [
			new RegularMove(-9),
			new RegularMove(-8),
			new RegularMove(-7),
			new RegularMove(-1),
			new RegularMove(1),
			new RegularMove(7),
			new RegularMove(8),
			new RegularMove(9),
		];
	}
}
