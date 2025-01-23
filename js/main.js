import { Piece } from "./piece.js";
import { Pawn } from "./pawn.js";
import { Rook } from "./rook.js";
import { King } from "./king.js";
import { Bishop } from "./bishop.js";
import { Queen } from "./queen.js";
import { Knight } from "./knight.js";

let container = document.querySelector(".container");

// Define The Chass Board By Sample Array
let chessBoardArray = [
    ["rb", "nb", "bb", "qb", "kb", "bb", "nb", "rb"],
    ["pb", "pb", "pb", "pb", "pb", "pb", "pb", "pb"],
    ["", "", "", "", "", "", "", ""],
    ["", "", "", "", "", "", "", ""],
    ["", "", "", "", "", "", "", ""],
    ["", "", "", "", "", "", "", ""],
    ["pl", "pl", "pl", "pl", "pl", "pl", "pl", "pl"],
    ["rl", "nl", "bl", "ql", "kl", "bl", "nl", "rl"],
];

let changeColor = true;

for (let i = 8; i >= 1;i--) {
    for (let j = 0; j< 8; j++) {
        let box = document.createElement("div");
        let piecePosition = ["a", "b", "c", "d", "e", "f", "g", "h"][j] + i;

        box.classList.add("box");
        box.setAttribute("data-position", piecePosition);
        box.setAttribute("data-die", false);
        
        if ((i % 2 && !(j % 2)) || (!(i % 2) && (j % 2))) box.classList.add("brown");
        
        if (!(i % 8)) changeColor = changeColor ? false : true;

        if (chessBoardArray[8-i][j]) {
            let piece;
            if (chessBoardArray[8-i][j][0] == 'p') piece = new Pawn(chessBoardArray[8-i][j][1], piecePosition); // Add Pawn
            else if (chessBoardArray[8-i][j][0] == 'r') piece = new Rook(chessBoardArray[8 - i][j][1], piecePosition); // Add Rook
            else if (chessBoardArray[8-i][j][0] == 'k') piece = new King(chessBoardArray[8 - i][j][1], piecePosition); // Add King
            else if (chessBoardArray[8-i][j][0] == 'b') piece = new Bishop(chessBoardArray[8 - i][j][1], piecePosition); // Add Bishop
            else if (chessBoardArray[8-i][j][0] == 'q') piece = new Queen(chessBoardArray[8-i][j][1], piecePosition); // Add Queen
            else if (chessBoardArray[8-i][j][0] == 'n') piece = new Knight(chessBoardArray[8 - i][j][1], piecePosition); // Add Knight
            else piece = new Piece(chessBoardArray[8-i][j][0], chessBoardArray[8-i][j][1], piecePosition);
            piece.AddPiece(box);
        }

        container.appendChild(box);
    }
}