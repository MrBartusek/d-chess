import { Board } from '../board';

export enum NotationPosition {
	TOP = 'notation-top',
	BOTTOM = 'notation-bot',
}

export class BoardGenerator {
	/**
	 * Draw specified board and return all pieces
	 */
	public drawBoard(board: Board): HTMLDivElement[] {
		const result: HTMLDivElement[] = [];

		for (let i = 0; i < 64; i++) {
			const realPiece = board.getByIndex(i);
			const tile = document.getElementById(`tile-${i}`)! as HTMLDivElement;
			const currentPiece = this.getPieceElement(tile);

			if (currentPiece && realPiece) {
				const isRightPiece =
					currentPiece.classList.contains(realPiece.type) &&
					currentPiece.classList.contains(realPiece.color);
				if (isRightPiece) {
					result.push(currentPiece);
					continue;
				}
				currentPiece.remove();
			}

			if (currentPiece && !realPiece) {
				currentPiece.remove();
			} else if (realPiece) {
				const image = `static/img/pieces/${realPiece.image}`;
				const pieceElement = this.createPiece(image, realPiece.type, realPiece.color);
				tile.appendChild(pieceElement);
				result.push(pieceElement);
			}
		}

		return result;
	}

	public generateBoard(container: HTMLElement) {
		for (let x = 0; x < 8; x++) {
			const row = this.createRow(x);
			container.appendChild(row);

			for (let y = 0; y < 8; y++) {
				const tile = this.createTile(x, y);
				row.appendChild(tile);

				if (y == 0) {
					const notation = this.createNotation(`${x + 1}`, NotationPosition.TOP);
					tile.appendChild(notation);
				}
				if (x == 7) {
					const letters = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h'];
					const notation = this.createNotation(letters[y], NotationPosition.BOTTOM);
					tile.appendChild(notation);
				}
			}
		}
	}

	private createRow(x: number): HTMLDivElement {
		const row = document.createElement('div');
		row.classList.add('row');
		row.id = `row-${x}`;
		return row;
	}

	private createTile(x: number, y: number): HTMLDivElement {
		const tile = document.createElement('div');
		tile.classList.add('tile');
		tile.id = `tile-${x * 8 + y}`;

		const isVariant = (x + y) % 2;
		if (isVariant) {
			tile.classList.add('tile-variant');
		}

		return tile;
	}

	private createNotation(text: string, position: NotationPosition): HTMLDivElement {
		const notation = document.createElement('div');
		notation.classList.add('notation', position);
		notation.textContent = text;
		return notation;
	}

	private createPiece(image: string, name: string, color: string): HTMLDivElement {
		const piece = document.createElement('img');
		piece.classList.add('piece', name, color);
		piece.src = image;
		piece.draggable = false;
		return piece;
	}

	private getPieceElement(tile: HTMLDivElement): HTMLDivElement | null {
		const children = tile.getElementsByClassName('piece');
		if (children.length > 0) {
			return children[0] as HTMLDivElement;
		}
		return null;
	}
}
