import { Color } from '../types/color';
import { Piece } from '../base/piece';
import { PieceType } from '../types/piece-type';
import { Move } from '../base/moving-strategy';
import { RegularMove } from '../moves/regular-move';
import { PawnDoubleMove } from '../moves/pawn-double-move';

export class Pawn extends Piece {
	private moved = false;

	constructor(protected _color: Color) {
		super(_color);
	}

	get type() {
		return PieceType.PAWN;
	}

	get image(): string {
		return `${this.color}Pawn.png`;
	}

	get isKing(): boolean {
		return false;
	}

	get moves(): Move[] {
		const moves = [];
		if (this._color == Color.WHITE) {
			moves.push(new RegularMove(-8, { canCapture: false }));

			// Diagonal Captures
			moves.push(new RegularMove(-7, { onlyCapture: true }));
			moves.push(new RegularMove(-9, { onlyCapture: true }));

			if (!this.moved) {
				moves.push(new PawnDoubleMove(-16));
			}
		} else {
			moves.push(new RegularMove(8, { canCapture: false }));

			// Diagonal Captures
			moves.push(new RegularMove(7, { onlyCapture: true }));
			moves.push(new RegularMove(9, { onlyCapture: true }));

			if (!this.moved) {
				moves.push(new PawnDoubleMove(16));
			}
		}

		return moves;
	}

	get materialValue(): number {
		return 1;
	}

	public onMove(oldTile: number, newTile: number): void {
		this.moved = true;
	}
}
