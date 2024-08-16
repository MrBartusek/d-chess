# d-chess 

![GitHub Actions Workflow Status](https://img.shields.io/github/actions/workflow/status/MrBartusek/d-chess/build.yaml)

[![demo](https://dokurno.dev/d-chess/static/img/demo.png)](https://dokurno.dev/d-chess/)

Chess game implementation made with Typescript. Made as final project for [CS50](https://pll.harvard.edu/course/cs50-introduction-computer-science). The goal of this project was to challenge myself to create a proper
architecture for this application. You can find details of the implementation below.

## Live Demo

You can play d-chess at: [https://dokurno.dev/d-chess/](https://dokurno.dev/d-chess/)

## Architecture

### `Game`

[`Game`](./src/game.ts) - It's a *glue* that bonds the whole app. It contains most high-level logic:

- Checking available moves
- Actually making moves
- Checking if any player has won or game is in stalemate

This class doesn't do any actual calculation of possible moves. It rather delegates it to `Piece` and `Move`.

### `Board`

[`Board`](./src/board.ts) - It's a wrapper around array with 64 elements. I've chosen to represent the game state as one long continuos array and make all operations on it via single number. Moving right is `+1` while moving down is `-8`. This array on each position can have `Piece` element or `null` to represent empty field.

### `UIManager`

[`UIManager`](./src/ui/ui-manager.ts) - Alongside it's utilities `PlayerGenerator` and `BoardGenerator` this is let's say a *frontend* for this game. It renders the board and allows users to make moves via drag&drop. It is a link between human interactions and `Game` object.

### `Piece`

[`Piece`](./src/base/piece.ts) is a abstract class that represents a chess piece. There are implementations for all of the regular chess pieces:

- [`Pawns`](./src/pieces/pawn.ts)
- [`Rooks`](./src/pieces/rook.ts)
- [`Knights`](./src/pieces/knight.ts)
- [`Bishops`](./src/pieces/bishop.ts)
- [`Queens`](./src/pieces/queen.ts)
- [`Kings`](./src/pieces/king.ts)

These classes specify:

- The type of the piece via `PieceType` enum
- Piece image to display on board
- Material value, for material counter
- List of possible moves

### `Move`

[`Move`](./src/base/moving-strategy.ts) is yet another abstract class that calculates actual move created by piece. There are couple of moves:

- [`RegularMove`](./src/moves/regular-move.ts) - Regular move by `n` squares.
- [`SlidingMove`](./src/moves/sliding-move.ts) - Move that slides in one direction.
- [`PawnDoubleMove`](./src/moves/pawn-double-move.ts) - Move when pawn moves two squares forward.
- [`EnPassant`](./src/moves/en-passant.ts) - [*En passant*](https://en.wikipedia.org/wiki/En_passant)



## Installation

To get started with `d-chess`, you can clone the repository and install the necessary dependencies.

```sh
git clone https://github.com/MrBartusek/d-chess.git
cd d-chess
npm install
```

After installing the dependencies, you can start the build in watch mode:

```sh
npm run watch
```

This will start a build process. You can then open `public/index.html` file directly or use
extension such as [Live Server](https://marketplace.visualstudio.com/items?itemName=ritwickdey.LiveServer) to
launch development server.

