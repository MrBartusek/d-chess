import { Board } from './board';
import { Color } from './types/color';
import { Bishop } from './pieces/bishop';
import { King } from './pieces/king';
import { Knight } from './pieces/knight';
import { Pawn } from './pieces/pawn';
import { Queen } from './pieces/queen';
import { Rook } from './pieces/rook';
import { SoundPlayer } from './sound-player';
import { Piece } from './base/piece';
import { PieceType } from './types/piece-type';
import { GameState } from './types/game-state';

export class Game {
	private board: Board;
	private currentTurn = Color.WHITE;
	private state = GameState.STARTED;

	private capturedPieces: { [key in Color]: Piece[] };

	constructor() {
		this.board = new Board();
		this.capturedPieces = {
			[Color.WHITE]: [],
			[Color.BLACK]: [],
		};
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

	public setStalemateTestBoard() {
		this.board.setByPosition(0, 0, new King(Color.BLACK));
		this.board.setByPosition(5, 1, new Queen(Color.BLACK));
		this.board.setByPosition(6, 7, new King(Color.WHITE));
	}

	public restart() {
		this.board.reset();
		this.currentTurn = Color.WHITE;
		this.state = GameState.STARTED;
	}

	public getBoard() {
		return this.board;
	}

	public getState() {
		return this.state;
	}

	public getCapturedPieces() {
		return Object.assign({}, this.capturedPieces);
	}

	public calculateTotalMaterial(color: Color) {
		const capturedPieces = this.getCapturedPieces()[color];
		return capturedPieces
			.map((p) => p.materialValue)
			.reduce((accumulator, a) => accumulator + a, 0);
	}

	public canMakeMove(fromTile: number, toTile: number) {
		if (this.state != GameState.STARTED) return false;

		const movedPiece = this.board.getByIndex(fromTile);
		if (!movedPiece) throw new Error('Invalid fromTile - field is empty');
		const targetedPiece = this.board.getByIndex(toTile);

		if (fromTile == toTile) {
			return false;
		}

		if (targetedPiece) {
			if (targetedPiece.color == movedPiece.color) {
				return false;
			}
		}

		if (this.isEndgameMove(movedPiece, toTile)) {
			return false;
		}

		const allMoves = this.computeMoves(fromTile);
		return allMoves.includes(toTile);
	}

	public listMoves(fromTile: number) {
		const moves = this.computeMoves(fromTile);
		return moves.filter((toTile) => this.canMakeMove(fromTile, toTile));
	}

	public makeMove(fromTile: number, toTile: number) {
		if (!this.canMakeMove(fromTile, toTile)) {
			console.warn(`Illegal move! ${fromTile} -> ${toTile}`);
			return;
		}

		const movedPiece = this.board.getByIndex(fromTile)!;
		const targetedPiece = this.board.getByIndex(toTile);

		if (targetedPiece && targetedPiece.isKing) {
			console.warn(`Cant capture this piece! ${fromTile} -> ${toTile}`);
			return;
		}

		this.board.setByIndex(fromTile, null);
		this.board.setByIndex(toTile, movedPiece);

		const captured = targetedPiece != null;
		if (captured) {
			SoundPlayer.playCapture();
			this.capturedPieces[this.getCurrentTurn()].push(targetedPiece);
		} else {
			SoundPlayer.playMove();
		}

		movedPiece.onMove(fromTile, toTile);

		if (movedPiece.type == PieceType.PAWN && this.isLastRow(toTile, movedPiece.color)) {
			this.promotePawn(toTile);
		}

		this.currentTurn = this.getNextTurn();
		this.updateGameState();
		console.log(`Completed move!  ${fromTile} -> ${toTile}`);
	}

	public getCurrentTurn() {
		return this.currentTurn;
	}

	public getNextTurn() {
		return this.currentTurn == Color.WHITE ? Color.BLACK : Color.WHITE;
	}

	private computeMoves(fromTile: number) {
		const movedPiece = this.board.getByIndex(fromTile);
		if (!movedPiece) throw new Error('Invalid fromTile - field is empty');

		if (movedPiece.color != this.currentTurn) {
			return [];
		}

		return movedPiece.moves.flatMap((m) => m.computeMoves(this.board, fromTile));
	}

	private isLastRow(index: number, color: Color) {
		const row = Math.floor(index / 8);
		if (color == Color.WHITE) {
			return row == 0;
		} else {
			return row == 8;
		}
	}

	private promotePawn(index: number) {
		const piece = this.board.getByIndex(index);
		if (piece?.type != PieceType.PAWN) {
			throw new Error('Cannot promote non-pawn piece');
		}

		this.board.setByIndex(index, new Queen(piece.color));
	}

	private isEndgameMove(movedPiece: Piece, toTile: number) {
		if (!movedPiece.isKing) return false;
		for (let square = 0; square < 64; square++) {
			if (toTile == square) continue;
			const piece = this.board.getByIndex(square);
			if (!piece) continue;
			if (piece.color == movedPiece.color) continue;
			const moves = this.computeMoves(square);
			if (moves.includes(toTile)) {
				console.log('endgame move blocked', { toTile, movedPiece, square });
				return true;
			}
		}
		return false;
	}

	private updateGameState() {
		const isChecked = {
			[Color.WHITE]: false,
			[Color.BLACK]: false,
		};

		const hasMoves = {
			[Color.WHITE]: false,
			[Color.BLACK]: false,
		};

		for (let square = 0; square < 64; square++) {
			const piece = this.board.getByIndex(square);
			if (!piece) continue;
			const moves = this.listMoves(square);
			for (const move of moves) {
				const targetPiece = this.board.getByIndex(move);
				hasMoves[piece.color] = true;
				if (!targetPiece) continue;
				if (targetPiece.isKing) {
					isChecked[targetPiece.color] = true;
				}
			}
		}

		if (this.currentTurn == Color.BLACK) {
			if (isChecked[Color.WHITE]) {
				this.state = GameState.BLACK_WIN;
			} else if (!hasMoves[Color.BLACK]) {
				this.state = GameState.STALEMATE;
			}
		} else if (this.currentTurn == Color.WHITE) {
			if (isChecked[Color.BLACK]) {
				this.state = GameState.WHITE_WIN;
			} else if (!hasMoves[Color.WHITE]) {
				this.state = GameState.STALEMATE;
			}
		}
	}
}
