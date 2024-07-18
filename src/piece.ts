import { Color } from './color';
import { PieceType } from './piece-type';

export abstract class Piece {
	constructor(protected color: Color) {}

	abstract getType(): PieceType;
	abstract getImage(): string;
}
