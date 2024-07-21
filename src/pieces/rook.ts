import { Color } from '../types/color';
import { Piece } from '../base/piece';
import { PieceType } from '../types/piece-type';
import { RegularMove } from '../moves/regular-move';
import { Move } from '../base/moving-strategy';

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

	get moves(): Move[] {
		return [];
	}
}
