import { Color } from '../color';
import { Piece } from '../piece';

export class Pawn extends Piece {
	constructor(protected color: Color) {
		super(color);
	}

	getImage(): string {
		return `${this.color}Pawn.png`;
	}
}
