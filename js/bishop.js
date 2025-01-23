// Import Piece Class From (piece.js) File
import { Piece } from "./piece.js";

// Create Bishop Pieces
class Bishop extends Piece {
    static counter = 1;
    constructor(color, position) {
        super("b" + Bishop.counter, color, position);
        Bishop.counter++;
    }

    getPossiblePos() {
        let avaPos = [];
        let [stopTopLeft, stopTopRight, stopBottomLeft, stopBottomRight] = [false, false, false, false];
        for (let i = 0; i++ < 7;) {

            if (this.goTop(i)) {
                if (!stopTopRight && this.goRight(i)) stopTopRight = this.checkPos(this.goTop(i, this.goRight(i)), avaPos)[0];
                if (!stopTopLeft && this.goLeft(i)) stopTopLeft = this.checkPos(this.goTop(i, this.goLeft(i)), avaPos)[0];
            }

            if (this.goDown(i)) {
                if (!stopBottomRight && this.goRight(i)) stopBottomRight = this.checkPos(this.goDown(i, this.goRight(i)), avaPos)[0];
                if (!stopBottomLeft && this.goLeft(i)) stopBottomLeft = this.checkPos(this.goDown(i, this.goLeft(i)), avaPos)[0];
            }

        }
        this._avaPos = avaPos;
        return avaPos;

    }
}

export { Bishop };