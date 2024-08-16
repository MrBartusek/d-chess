import { Color } from '../types/color';
import { PieceType } from '../types/piece-type';
import { Move } from './moving-strategy';

export abstract class Piece {
	constructor(protected _color: Color) {}

	get color(): Color {
		return this._color;
	}

	abstract get type(): PieceType;
	abstract get image(): string;
	abstract get materialValue(): number;
	abstract get canCapture(): boolean;
	abstract get moves(): Move[];

	public onMove(oldTile: number, newTile: number) {
		return;
	}
}
