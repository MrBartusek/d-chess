import { Game } from './game';
import { UIManager } from './ui-manager';

const manager = new UIManager();
const game = new Game();
game.setDefaultBoard();

document.addEventListener('DOMContentLoaded', () => manager.start());
