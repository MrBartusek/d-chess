import { Color } from '../color';
import { Piece } from '../piece';
import { PieceType } from '../piece-type';

export class Queen extends Piece {
	constructor(protected color: Color) {
		super(color);
	}

	get type() {
		return PieceType.QUEEN;
	}

	get image(): string {
		return `${this.color}Queen.png`;
	}
}
