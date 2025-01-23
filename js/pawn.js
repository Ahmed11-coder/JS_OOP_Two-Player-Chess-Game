// Import Piece Class From (piece.js) File
import { Piece } from "./piece.js";

// Create Pawn Pieces
class Pawn extends Piece {
    static counter = 1;
    constructor(color, position) {
        super('p'+Pawn.counter, color, position);
        this._fristMove = false;
        Pawn.counter++;
    }

    // Modify AddPiece Method To Fir With Pawn
    AddPiece(place) {
        super.AddPiece(place);
        place.setAttribute("data-move", "f");
        this._fristMove = !this._moved ? true : false;
    }

    getPossiblePos() {
        let avaPos = [this._color == 'l' ? this.goTop(1) : this.goDown(1)],eatPos = [];
        avaPos = avaPos.filter((pos)=>!this.checkPos(pos)[0]);

        if (this._fristMove) {
            if (this._color == "l"){
                if (avaPos[0] && !this.checkPos(this.goTop(2))[0]) avaPos.push(this.goTop(2));
            } else {
                if (avaPos[0] && !this.checkPos(this.goDown(2))[0]) avaPos.push(this.goDown(2));
            }
        }

        if (this.goLeft(1)) {
            this.checkPos(this.goTop(1, this.goLeft(1)), eatPos);
            this.checkPos(this.goDown(1, this.goLeft(1)), eatPos);
        }
        if (this.goRight(1)) {
            this.checkPos(this.goTop(1, this.goRight(1)), eatPos);
            this.checkPos(this.goDown(1, this.goRight(1)), eatPos);
        }

        avaPos.push(...eatPos.filter((pos) => (document.querySelector(`div[data-position="${pos}"] img`) && this.getColor(document.querySelector(`div[data-position="${pos}"] img`))[1] != this._color)));
        this._avaPos = avaPos;

        return avaPos;
    }
    movePiece(position, allPos, piece) {
        super.movePiece(position, allPos, piece);
    }
}

export { Pawn };