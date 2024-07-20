import { Color } from '../color';
import { Piece } from '../piece';
import { PieceType } from '../piece-type';

export class Rook extends Piece {
	constructor(protected color: Color) {
		super(color);
	}

	get type() {
		return PieceType.ROOK;
	}

	get image(): string {
		return `${this.color}Rook.png`;
	}
}
