import { Move } from '../base/moving-strategy';
import { Piece } from '../base/piece';
import { RegularMove } from '../moves/regular-move';
import { Color } from '../types/color';
import { PieceType } from '../types/piece-type';

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

	get materialValue(): number {
		return 0; // Invaluable
	}

	get isKing(): boolean {
		return true;
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
