import { Color } from './color';
import { PieceType } from './piece-type';

export abstract class Piece {
	constructor(protected _color: Color) {}

	get color(): Color {
		return this._color;
	}

	abstract get type(): PieceType;
	abstract get image(): string;
}
