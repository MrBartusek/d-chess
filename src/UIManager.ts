enum NotationPosition {
	TOP = 'notation-top',
	BOTTOM = 'notation-bot',
}

export class UIManager {
	public start() {
		const container = document.getElementById('board')!;
		this.generateBoard(container);
	}

	private generateBoard(container: HTMLElement) {
		for (let x = 0; x < 8; x++) {
			const row = this.createRow(x);
			container.appendChild(row);

			for (let y = 0; y < 8; y++) {
				const tile = this.createTile(x, y);
				row.appendChild(tile);

				if (x == 1 || x == 6) {
					const figure = document.createElement('img');
					figure.src = 'static/img/pieces/wP.png';
					figure.classList.add('figure');
					tile.appendChild(figure);
				}
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
}
