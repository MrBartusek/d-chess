import { Color } from '../color';
import { Piece } from '../piece';
import { PieceType } from '../piece-type';

export class Knight extends Piece {
	constructor(protected color: Color) {
		super(color);
	}

	getType() {
		return PieceType.KNIGHT;
	}

	getImage(): string {
		return `${this.color}Knight.png`;
	}
}
