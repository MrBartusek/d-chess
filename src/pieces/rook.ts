import { Color } from '../types/color';
import { Piece } from '../base/piece';
import { PieceType } from '../types/piece-type';

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
