import { Color } from '../color';
import { Piece } from '../piece';
import { PieceType } from '../piece-type';

export class Rook extends Piece {
	constructor(protected _color: Color) {
		super(_color);
	}

	get type() {
		return PieceType.ROOK;
	}

	get image(): string {
		return `${this.color}Rook.png`;
	}
}
