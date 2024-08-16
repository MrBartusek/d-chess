import { Color } from '../types/color';
import { Piece } from '../base/piece';
import { PieceType } from '../types/piece-type';
import { Move } from '../base/moving-strategy';
import { RegularMove } from '../moves/regular-move';
import { PawnDoubleMove } from '../moves/pawn-double-move';
import { EnPassant } from '../moves/en-passant';

export class Pawn extends Piece {
	private moved = false;
	private _canEnPassant = false;

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

	get canEnPassant() {
		return this._canEnPassant;
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

			moves.push(new EnPassant(-7));
			moves.push(new EnPassant(-9));
		} else {
			moves.push(new RegularMove(8, { canCapture: false }));

			// Diagonal Captures
			moves.push(new RegularMove(7, { onlyCapture: true }));
			moves.push(new RegularMove(9, { onlyCapture: true }));

			if (!this.moved) {
				moves.push(new PawnDoubleMove(16));
			}

			moves.push(new EnPassant(7));
			moves.push(new EnPassant(9));
		}

		return moves;
	}

	get materialValue(): number {
		return 1;
	}

	public onMove(oldTile: number, newTile: number): void {
		if (!this.moved) {
			this.moved = true;
			const isDoubleMove = Math.abs(oldTile - newTile) == 16;
			if (isDoubleMove) {
				this._canEnPassant = true;
				return;
			}
		}
		this._canEnPassant = false;
	}
}
