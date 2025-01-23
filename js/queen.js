// Import Piece Class From (piece.js) File
import { Bishop } from "./bishop.js";
import { Piece } from "./piece.js";
import { Rook } from "./rook.js";

// Create Queen Pieces
class Queen extends Piece {
    static counter = 1;
    constructor(color, position) {
        super("q"+Queen.counter, color, position);
        Queen.counter++;
    }

    getPossiblePos() {
        let avaPos = [];
        let bisPos = new Bishop(this._color, this._position).getPossiblePos();
        let rookPos = new Rook(this._color, this._position).getPossiblePos();

        avaPos.push(...bisPos, ...rookPos);
        this._avaPos = avaPos;
        return avaPos;
    }
}

export { Queen };