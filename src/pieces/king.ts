import { Color } from '../color';
import { Piece } from '../piece';
import { PieceType } from '../piece-type';

export class King extends Piece {
	constructor(protected color: Color) {
		super(color);
	}

	getType() {
		return PieceType.KING;
	}

	getImage(): string {
		return `${this.color}King.png`;
	}
}
