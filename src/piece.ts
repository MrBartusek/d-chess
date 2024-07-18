import { Color } from './color';

export abstract class Piece {
	constructor(protected color: Color) {}

	abstract getImage(): string;
}
