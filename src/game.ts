import { Board } from './board';
import { Color } from './color';
import { Bishop } from './pieces/bishop';
import { King } from './pieces/king';
import { Knight } from './pieces/knight';
import { Pawn } from './pieces/pawn';
import { Queen } from './pieces/queen';
import { Rook } from './pieces/rook';

export class Game {
	private board: Board;
	private currentTurn = Color.WHITE;

	constructor() {
		this.board = new Board();
	}

	public setDefaultBoard() {
		this.board.setByPosition(0, 0, new Rook(Color.BLACK));
		this.board.setByPosition(1, 0, new Knight(Color.BLACK));
		this.board.setByPosition(2, 0, new Bishop(Color.BLACK));
		this.board.setByPosition(3, 0, new Queen(Color.BLACK));
		this.board.setByPosition(4, 0, new King(Color.BLACK));
		this.board.setByPosition(5, 0, new Bishop(Color.BLACK));
		this.board.setByPosition(6, 0, new Knight(Color.BLACK));
		this.board.setByPosition(7, 0, new Rook(Color.BLACK));

		this.board.setByPosition(0, 7, new Rook(Color.WHITE));
		this.board.setByPosition(1, 7, new Knight(Color.WHITE));
		this.board.setByPosition(2, 7, new Bishop(Color.WHITE));
		this.board.setByPosition(3, 7, new Queen(Color.WHITE));
		this.board.setByPosition(4, 7, new King(Color.WHITE));
		this.board.setByPosition(5, 7, new Bishop(Color.WHITE));
		this.board.setByPosition(6, 7, new Knight(Color.WHITE));
		this.board.setByPosition(7, 7, new Rook(Color.WHITE));

		// Generate pawns
		const ROW_OFFSET = 8;
		for (let i = 0; i < 8; i++) {
			this.board.setByIndex(1 * ROW_OFFSET + i, new Pawn(Color.BLACK));
			this.board.setByIndex(6 * ROW_OFFSET + i, new Pawn(Color.WHITE));
		}
	}

	public getBoard() {
		return this.board;
	}
}
