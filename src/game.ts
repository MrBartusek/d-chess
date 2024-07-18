import { Board } from './board';
import { Color } from './color';
import { Piece } from './piece';
import { Pawn } from './pieces/pawn';

export class Game {
	private board: Board;

	constructor() {
		this.board = new Board();
	}

	public setDefaultBoard() {
		const newBoard: Piece[] = Array(63);

		const ROW_OFFSET = 8;
		for (let i = 0; i < 8; i++) {
			newBoard[1 * ROW_OFFSET + i] = new Pawn(Color.WHITE);
			newBoard[6 * ROW_OFFSET + i] = new Pawn(Color.WHITE);
		}

		this.board.setAll(newBoard);
	}

	public getBoard() {
		return this.board;
	}
}
