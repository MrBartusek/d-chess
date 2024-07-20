import { Color } from '../color';
import { Piece } from '../piece';
import { PieceType } from '../piece-type';

export class Queen extends Piece {
	constructor(protected _color: Color) {
		super(_color);
	}

	get type() {
		return PieceType.QUEEN;
	}

	get image(): string {
		return `${this.color}Queen.png`;
	}
}
