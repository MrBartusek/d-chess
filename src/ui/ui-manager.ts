import { Board } from '../board';
import { Game } from '../game';
import { BoardGenerator } from './board-generator';

export class UIManager {
	private game: Game;

	private boardGenerator: BoardGenerator;

	private currentDraggedPiece: HTMLImageElement | null = null;
	private dragStartX: number = 0;
	private dragStartY: number = 0;

	constructor(game: Game) {
		this.game = game;
		this.boardGenerator = new BoardGenerator();

		this.onMouseMove = this.onMouseMove.bind(this);
		this.onMouseUp = this.onMouseUp.bind(this);
		this.onStartDragging = this.onStartDragging.bind(this);
	}

	public start() {
		const container = document.getElementById('board')!;
		this.boardGenerator.generateBoard(container);
		this.drawBoard(this.game.getBoard());
	}

	private drawBoard(board: Board) {
		const pieces = this.boardGenerator.drawBoard(board);
		for (const piece of pieces) {
			piece.removeEventListener('mousedown', this.onStartDragging);
			piece.addEventListener('mousedown', this.onStartDragging);
		}
	}

	private onStartDragging(event: MouseEvent) {
		this.currentDraggedPiece = event.target as HTMLImageElement;
		this.currentDraggedPiece.classList.add('dragged');

		this.dragStartX = event.clientX;
		this.dragStartY = event.clientY;

		const currentTileId = this.getTileFromDraggedPiece()!;
		const possibleMoves = this.game.listMoves(currentTileId);
		for (const move of possibleMoves) {
			this.addHighlight(move);
		}

		document.addEventListener('mousemove', this.onMouseMove);
		document.addEventListener('mouseup', this.onMouseUp);
	}

	private onMouseMove(event: MouseEvent) {
		const newX = event.clientX - this.dragStartX;
		const newY = event.clientY - this.dragStartY;

		if (this.currentDraggedPiece) {
			this.currentDraggedPiece.style.transform = `translate(${newX}px, ${newY}px)`;
		}
	}

	private onMouseUp(event: MouseEvent) {
		document.removeEventListener('mousemove', this.onMouseMove);
		document.removeEventListener('mouseup', this.onMouseUp);
		this.removeAllHighlights();

		if (this.currentDraggedPiece) {
			const currentTileId = this.getTileFromDraggedPiece()!;
			this.currentDraggedPiece.style.transform = '';
			this.currentDraggedPiece.classList.remove('dragged');
			this.currentDraggedPiece = null;

			const targetElement = this.getTileFromPoint(event.clientX, event.clientY);
			if (!targetElement) return;

			const targetTileId = Number(targetElement.id.replace('tile-', ''));
			this.game.makeMove(currentTileId, targetTileId);
			this.drawBoard(this.game.getBoard());
		}
	}

	private getTileFromPoint(x: number, y: number) {
		const targetElement = document.elementFromPoint(x, y);
		if (!targetElement) return;

		const isTile = targetElement.classList.contains('tile');
		if (isTile) {
			return targetElement;
		}

		const parent = targetElement.parentElement!;
		const isParentTile = parent.classList.contains('tile');
		if (isParentTile) {
			return parent;
		}

		return null;
	}

	private getTileFromDraggedPiece() {
		if (!this.currentDraggedPiece) return;
		return Number(this.currentDraggedPiece.parentElement!.id.replace('tile-', ''));
	}

	private addHighlight(tileId: number) {
		const tile = document.getElementById(`tile-${tileId}`)!;
		const highlight = document.createElement('div');
		highlight.classList.add('highlighted');
		tile.appendChild(highlight);
	}

	private removeAllHighlights() {
		Array.from(document.getElementsByClassName('highlighted')).forEach((e) => e.remove());
	}
}
