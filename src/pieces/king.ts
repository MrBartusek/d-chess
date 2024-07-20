import { Color } from '../color';
import { Piece } from '../piece';
import { PieceType } from '../piece-type';

export class King extends Piece {
	constructor(protected color: Color) {
		super(color);
	}

	get type() {
		return PieceType.KING;
	}

	get image(): string {
		return `${this.color}King.png`;
	}
}
