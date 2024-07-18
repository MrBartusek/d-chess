import { Color } from '../color';
import { Piece } from '../piece';
import { PieceType } from '../piece-type';

export class Bishop extends Piece {
	constructor(protected color: Color) {
		super(color);
	}

	getType() {
		return PieceType.BISHOP;
	}

	getImage(): string {
		return `${this.color}Bishop.png`;
	}
}
