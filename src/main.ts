import { Game } from './game';
import { UIManager } from './ui/ui-manager';

const uiManager = new UIManager();
const game = new Game();

function start() {
	uiManager.start();
	game.setDefaultBoard();
	uiManager.drawBoard(game.getBoard());
}

document.addEventListener('DOMContentLoaded', () => start());
