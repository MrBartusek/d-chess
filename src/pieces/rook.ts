import { Color } from '../color';
import { Piece } from '../piece';
import { PieceType } from '../piece-type';

export class Rook extends Piece {
	constructor(protected color: Color) {
		super(color);
	}

	getType() {
		return PieceType.ROOK;
	}

	getImage(): string {
		return `${this.color}Rook.png`;
	}
}
