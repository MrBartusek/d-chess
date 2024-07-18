import { Color } from '../color';
import { Piece } from '../piece';
import { PieceType } from '../piece-type';

export class Pawn extends Piece {
	constructor(protected color: Color) {
		super(color);
	}

	getType() {
		return PieceType.PAWN;
	}

	getImage(): string {
		return `${this.color}Pawn.png`;
	}
}
