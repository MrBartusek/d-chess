import { Game } from './game';
import { UIManager } from './ui/ui-manager';

function start() {
	const game = new Game();
	game.setDefaultBoard();
	const uiManager = new UIManager(game);
	uiManager.start();
}

document.addEventListener('DOMContentLoaded', () => start());
