import { Piece } from './piece';

export class Board {
	private state: Piece[] = new Array(63);

	public getByPosition(x: number, y: number) {
		if (x < 0 || x > 7 || y < 0 || y > 7) throw new RangeError('x or y argument out of range');
		return this.state[x + y * 8];
	}

	public getByIndex(index: number) {
		return this.state[index];
	}

	/**
	 * Sets a new Piece to specified position
	 * @returns old Piece
	 */
	public setByPosition(x: number, y: number, piece: Piece) {
		const oldPiece = this.getByPosition(x, y);
		this.state[x + y * 8] = piece;
		return oldPiece;
	}

	/**
	 * Sets a new Piece to specified index
	 * @returns old Piece
	 */
	public setByIndex(index: number, piece: Piece) {
		const oldPiece = this.getByIndex(index);
		this.state[index] = piece;
		return oldPiece;
	}

	public setAll(board: Piece[]) {
		if (board.length !== 63) throw new Error('Board must have exactly 63 pieces.');
		this.state = board;
	}
}
