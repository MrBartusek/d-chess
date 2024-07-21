import { Move } from '../base/moving-strategy';
import { Piece } from '../base/piece';
import { Color } from '../types/color';
import { PieceType } from '../types/piece-type';

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

	get moves(): Move[] {
		return [];
	}
}
