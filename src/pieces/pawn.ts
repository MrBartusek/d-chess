import { Color } from '../types/color';
import { Piece } from '../base/piece';
import { PieceType } from '../types/piece-type';

export class Pawn extends Piece {
	constructor(protected _color: Color) {
		super(_color);
	}

	get type() {
		return PieceType.PAWN;
	}

	get image(): string {
		return `${this.color}Pawn.png`;
	}
}
