// Import Piece Class From (piece.js) File
import { Piece }  from "./piece.js"
import { Rook } from "./rook.js";

// Create King Pieces
class King extends Piece {
    static counter = 1;
    constructor(color, position) {
        super('k'+King.counter, color, position);
        King.counter++;
    }

    getPossiblePos() {
        let avaPos = [
                this.goTop(1), this.goDown(1),
                this.goLeft(1), this.goRight(1), 
                this.goTop(1, this.goRight(1)), 
                this.goTop(1, this.goLeft(1)),
                this.goDown(1, this.goRight(1)),
                this.goDown(1, this.goLeft(1))
            ];

        if (["e1", "e8"].includes(this._position)) {
            let rookr = document.querySelector(`div[data-position="${this.goRight(3)}"] img`);
            let rookl = document.querySelector(`div[data-position="${this.goLeft(4)}"] img`);
            console.log(avaPos[3], document.querySelector(`div[data-position="${this.goRight(2)}"] img`),this.getColor(rookr)[1]);
            if (
                avaPos[3] &&
                !document.querySelector(`div[data-position="${this.goRight(2)}"] img`) &&
                rookr && this.getColor(rookr)[1] == this._color
            )
                avaPos.push(this.goRight(2));

            
            if (
                avaPos[2] && 
                !document.querySelector(`div[data-position="${this.goLeft(2)}"] img`) && 
                !document.querySelector(`div[data-position="${this.goLeft(3)}"] img`) &&
                rookl && this.getColor(rookl)[1] == this._color
            ) 
                avaPos.push(this.goLeft(2));
        }
        avaPos = avaPos.filter((pos) =>(pos && !this.checkPos(pos)[0]));
        return avaPos;
    }
    
    castling(target) {
        let avaPos = this.getPossiblePos();
        let leftPos = this.goLeft(2), rightPos = this.goRight(2);

        function removeRook(rook, column, pieceOb) {
            if (!rook) return;

            let rookImg = rook.querySelector("img");
            let rookInfo = pieceOb.getColor(rookImg);
            let newRook = new Rook(rookInfo[1], `${column}${pieceOb._position[1]}`);

            rookImg.remove();
            newRook.AddPiece(document.querySelector(`div[data-position="${column}${pieceOb._position[1]}"]`));
        }


        if (avaPos.includes(leftPos) && leftPos == target.dataset.position) {
            // Left Rook
            removeRook(document.querySelector(`div[data-position="a${this._position[1]}"]`), 'd', this);
        }
        if (avaPos.includes(rightPos) && rightPos == target.dataset.position) {
            // Right Rook
            removeRook(document.querySelector(`div[data-position="h${this._position[1]}"]`), 'f', this);
        }
    }
}


export { King };