export class UIManager {
	private started = false;

	public start() {
		if (this.started) {
			throw new Error('UIManager is already started');
		}

		this.generateBoard();

		this.started = true;
	}

	private generateBoard() {
		const board = document.getElementById('board')!;
		for (let x = 0; x < 8; x++) {
			const row = document.createElement('div');
			row.classList.add('row');
			row.id = `row-${x}`;
			for (let y = 0; y < 8; y++) {
				const tile = document.createElement('div');
				tile.classList.add('tile');
				tile.id = `tile-${x * 8 + y}`;
				const isVariant = (x + y) % 2;
				if (isVariant) {
					tile.classList.add('tile-variant');
				}
				row.appendChild(tile);
			}
			board.appendChild(row);
		}
	}
}
