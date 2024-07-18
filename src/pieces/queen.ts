import { Color } from '../color';
import { Piece } from '../piece';
import { PieceType } from '../piece-type';

export class Queen extends Piece {
	constructor(protected color: Color) {
		super(color);
	}

	getType() {
		return PieceType.QUEEN;
	}

	getImage(): string {
		return `${this.color}Queen.png`;
	}
}
