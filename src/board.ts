import { Piece } from './piece';

export class Board {
	private state: Piece[] = new Array(63);

	public get(x: number, y: number) {
		if (x < 0 || x > 7 || y < 0 || y > 7) throw new RangeError('x or y argument out of range');
		return this.state[x + y * 8];
	}

	/**
	 * Sets a new Piece to specified position
	 * @returns old Piece
	 */
	public set(x: number, y: number, piece: Piece) {
		const oldPiece = this.get(x, y);
		this.state[x + y * 8] == piece;
		return oldPiece;
	}

	public setAll(board: Piece[]) {
		if (board.length !== 63) throw new Error('Board must have exactly 63 pieces.');
		this.state = board;
	}
}
