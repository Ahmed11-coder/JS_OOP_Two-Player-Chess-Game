// Import Piece Class From (piece.js) File
import { Piece } from "./piece.js";

class Rook extends Piece {
    static counter = 1;
    constructor(color, position) {
        super('r'+Rook.counter, color, position);
        Rook.counter++;
    }

    getPossiblePos() {
        let avaPos = [];
        let [stopRight, stopLeft, stopTop, stopBottom] = [false, false, false, false];

        // Array Of All Possible Positions
        for (let i = 0; i++ < 7;) {
            if (!stopRight && this.goRight(i)) stopRight = this.checkPos(this.goRight(i), avaPos)[0];
            if (!stopLeft && this.goLeft(i)) stopLeft = this.checkPos(this.goLeft(i), avaPos)[0];
            if (!stopTop && this.goTop(i)) stopTop = this.checkPos(this.goTop(i), avaPos)[0];
            if (!stopBottom && this.goDown(i)) stopBottom = this.checkPos(this.goDown(i), avaPos)[0];
        }

        this._avaPos = avaPos;

        return avaPos;
    }
}

export { Rook };