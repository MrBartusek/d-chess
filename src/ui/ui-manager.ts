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
	}

	public start() {
		const container = document.getElementById('board')!;
		this.boardGenerator.generateBoard(container);
		this.drawBoard(this.game.getBoard());
	}

	private drawBoard(board: Board) {
		const pieces = this.boardGenerator.drawBoard(board);
		for (const piece of pieces) {
			piece.addEventListener('mousedown', (e) => this.onStartDragging(e));
		}
	}

	private onStartDragging(event: MouseEvent) {
		this.currentDraggedPiece = event.target as HTMLImageElement;

		this.dragStartX = event.clientX;
		this.dragStartY = event.clientY;

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

		if (this.currentDraggedPiece) {
			const currentTileId = Number(this.currentDraggedPiece.parentElement!.id.replace('tile-', ''));
			this.currentDraggedPiece.style.transform = '';
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
}
