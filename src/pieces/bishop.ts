import { Color } from '../color';
import { Piece } from '../piece';
import { PieceType } from '../piece-type';

export class Bishop extends Piece {
	constructor(protected _color: Color) {
		super(_color);
	}

	get type() {
		return PieceType.BISHOP;
	}

	get image(): string {
		return `${this.color}Bishop.png`;
	}
}
