import { Game } from './game';
import { UIManager } from './ui/ui-manager';

const manager = new UIManager();
const game = new Game();

function start() {
	manager.start();
	game.setDefaultBoard();
	manager.drawBoard(game.getBoard());
}

document.addEventListener('DOMContentLoaded', () => start());
