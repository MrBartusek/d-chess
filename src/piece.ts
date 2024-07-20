import { Color } from './color';
import { PieceType } from './piece-type';

export abstract class Piece {
	constructor(protected color: Color) {}

	abstract get type(): PieceType;
	abstract get image(): string;
}
