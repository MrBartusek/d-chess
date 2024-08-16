# d-chess 

![GitHub Actions Workflow Status](https://img.shields.io/github/actions/workflow/status/MrBartusek/d-chess/build.yaml)

[![demo](https://dokurno.dev/d-chess/static/img/demo.png)](https://dokurno.dev/d-chess/)

*d-chess* is a fully-featured chess game implementation developed in TypeScript. It was created as the final project for the [CS50](https://pll.harvard.edu/course/cs50-introduction-computer-science). The primary objective of this project was to challenge myself to design and implement a proper architecture with good coding practices.

## Live Demo

You can play d-chess at: [https://dokurno.dev/d-chess/](https://dokurno.dev/d-chess/)

## Architecture

The architecture of d-chess is carefully structured into several key components, each responsible for specific aspects of the game's functionality. Below is an overview of the main components:

### `Game`

[`Game`](./src/game.ts) - It's a *glue* that bonds the whole app. It's a central hub that bonds the whole application together. The `Game` object is responsible for high level logic such as:

- Checking list of legal moves for current player. In reality this check is done by `Move` strategies but this class servers as aggregator for all of the moves.
- Making moves, updating the game state and handling captures
- Updating the game status, assessing whether the game has ended, whether by checkmate, stalemate, or draw.

The `Game` class delegates the actual computation of possible moves to the `Piece` and `Move` classes.

### `Board`

[`Board`](./src/board.ts) - It's a main data structure in this game. It represents the chessboard as a single array with 64 elements, corresponding to the 8x8 grid of a traditional chessboard. Each position in this array can either hold a `Piece` object or null to represent an empty square. I've chosen to represent the game state as one long continuos array and make all operations on it via single number. Moving right is `+1` while moving down is `-8`. 

### `UIManager`

[`UIManager`](./src/ui/ui-manager.ts) - Alongside it's utilities `PlayerGenerator` and `BoardGenerator` handles the user interface aspects of the game. This can be thought of as the frontend for d-chess, responsible for rendering the board and pieces, as well as managing user interactions like dragging and dropping pieces.

### `Piece`

[`Piece`](./src/base/piece.ts) is an abstract class representing a chess piece. It serves as a blueprint for the various specific piece types in chess, such as pawns, rooks, knights, bishops, queens, and kings. Each of these is implemented as a separate class:

- [`Pawns`](./src/pieces/pawn.ts)
- [`Rooks`](./src/pieces/rook.ts)
- [`Knights`](./src/pieces/knight.ts)
- [`Bishops`](./src/pieces/bishop.ts)
- [`Queens`](./src/pieces/queen.ts)
- [`Kings`](./src/pieces/king.ts)

Each of these classes defines:

- *Piece Type:* The type of the piece via `PieceType` enum
- *Piece Image:* File name of the image to display for this piece
- *Material Value:* Material value for each piece for material counter
- *Possible Moves:* List of all of the possible `Moves` for this piece

### `Move`

[`Move`](./src/base/moving-strategy.ts) class is another abstract class that is responsible for calculating the actual moves a piece can make. Different types of moves are implemented as subclasses:

- [`RegularMove`](./src/moves/regular-move.ts) - Represents a standard move, where a piece moves a specified number of squares in array.
- [`SlidingMove`](./src/moves/sliding-move.ts) - Handles moves where a piece can slide in one direction, like rooks, bishops, and queens.
- [`PawnDoubleMove`](./src/moves/pawn-double-move.ts) - Specific to pawns, allowing them to move two squares forward on their first move.
- [`EnPassant`](./src/moves/en-passant.ts) - Implements the special [*En passant*](https://en.wikipedia.org/wiki/En_passant) move 


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

