import { Piece } from '../base/piece';
import { Game } from '../game';
import { Color } from '../types/color';

export class PlayerGenerator {
	public drawPlayers(game: Game) {
		for (const color of [Color.WHITE, Color.BLACK]) {
			const nextMove = document.getElementById(`${color}-next-move`)!;
			nextMove.style.display = game.getCurrentTurn() == color ? 'inline-block' : 'none';

			const materialPieces = document.getElementById(`${color}-material-pieces`)!;
			const capturePieces = game.getCapturedPieces()[color];
			materialPieces.replaceChildren(...capturePieces.map(this.generateMaterialPiece));

			const materialElement = document.getElementById(`${color}-material-value`)!;
			const totalMaterial = game.calculateTotalMaterial(color);
			materialElement.innerText = `(${totalMaterial > 0 ? '+' : ''}${totalMaterial})`;
		}
	}

	private generateMaterialPiece(piece: Piece) {
		const element = document.createElement('img');
		element.src = `static/img/pieces/${piece.image}`;
		element.className = 'material-piece';
		return element;
	}
}
