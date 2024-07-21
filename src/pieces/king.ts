import { Color } from '../types/color';
import { Piece } from '../base/piece';
import { PieceType } from '../types/piece-type';

export class King extends Piece {
	constructor(protected _color: Color) {
		super(_color);
	}

	get type() {
		return PieceType.KING;
	}

	get image(): string {
		return `${this.color}King.png`;
	}
}
