// Import Piece Class From (piece.js) File
import { Piece } from "./piece.js";

// Create Knight Pieces
class Knight extends Piece {
    static counter = 1;
    constructor(color, position) {
        super("n"+Knight.counter, color, position);
        Knight.counter++;
    }

    getPossiblePos() {
        let avaPos = [];

        if (this.goTop(1)) {
            if (this.goRight(2)) this.checkPos(this.goTop(1, this.goRight(2)), avaPos);
            if (this.goLeft(2)) this.checkPos(this.goTop(1, this.goLeft(2)), avaPos);
        }
        if (this.goTop(2)) {
            if (this.goRight(1)) this.checkPos(this.goTop(2, this.goRight(1)), avaPos);
            if (this.goLeft(1)) this.checkPos(this.goTop(2, this.goLeft(1)), avaPos);
        }
        if (this.goDown(1)) {
            if (this.goRight(2)) this.checkPos(this.goDown(1, this.goRight(2)), avaPos);
            if (this.goLeft(2)) this.checkPos(this.goDown(1, this.goLeft(2)), avaPos);
        }
        if (this.goDown(2)) {
            if (this.goRight(1)) this.checkPos(this.goDown(2, this.goRight(1)), avaPos);
            if (this.goLeft(1)) this.checkPos(this.goDown(2, this.goLeft(1)), avaPos);
        }
        this._avaPos = avaPos;
        return avaPos;
    }
}

export { Knight };