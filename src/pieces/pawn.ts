import { Color } from '../color';
import { Piece } from '../piece';
import { PieceType } from '../piece-type';

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
