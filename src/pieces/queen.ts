import { Color } from '../types/color';
import { Piece } from '../base/piece';
import { PieceType } from '../types/piece-type';

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
