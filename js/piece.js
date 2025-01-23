let turn = 'l';
// Piece Class To Create Piece With Defualt Behavoir
class Piece {
    constructor(name, color, position) {
        this._name = name;
        this._color = color;
        this._position = position;
        this._moved = false;
        this._avaPos;
        this._died = false;
    }

    // Add Piece To Chess Board
    AddPiece(place) {
        // Create Piece
        let chessPiece = document.createElement("img"), piece = this; // Create Piece Image
        chessPiece.src = `./images/${this._name[0]}${this._color}.svg`; // Add Piece Image
        place.append(chessPiece); // Add Piece To Board

        function play() {
            if (this._died) place.removeEventListener("click", play); // If Piece Died, It Stop To Play
            piece.selectPiece(place, showPos, play); // Select Piece To Play
            // place.removeEventListener("click", play);
        }
        
        function showPos() {
            if (piece._died) place.removeEventListener("mouseover", showPos); // Remove Possible Position Of Died Pieces
            piece.showPossiblePos();
        }

        place.addEventListener("mouseover", showPos); // Show Possible Position When Make Mouse Over Of Piece
        place.addEventListener("mouseleave", () => { // Remove Possible Position When Mouse Leave Piece
            if (!place.classList.contains("selected")) {
                document.querySelectorAll(".pos-ps").forEach((box) => box.classList.remove("pos-ps"));
            }
        })
        // Make Piece Ready To Play
        place.addEventListener("click", play);
    }

    // Get All Move, Eat Piece Position (Redefined For Each Piece Type)
    getPossiblePos() {}

    // Get Other Piece Color
    getColor(oPiece) {
        return oPiece.src.match(/\/\w{2}.svg/)[0].slice(1, 3); // Return The Type Of The Piece
    }

    // Make Piece Selected
    selectPiece(place, fun, fun2) {
        if (turn != this._color) return;
        let currentPos = document.querySelector(`div[data-position="${this._position}"]`);
        // Check If Piece Isn't Eated , and Make It Died If That
        if (!currentPos.children[0] || this._color != this.getColor(currentPos.querySelector("img"))[1]){
            this._died = true;
            return;
        }
        if (place != currentPos) return; // Make Previous Position Not Work
        let possiblePositions = this._avaPos ? this._avaPos : this.getPossiblePos();
        possiblePositions.forEach((pos) => this.movePiece(pos, this, fun, fun2));
        // Remove (selected) Class If The Piece Is Already Selected
        document.querySelectorAll(".pos-ps").forEach((box) => box.classList.remove("pos-ps"))
        document.querySelectorAll(".sel").forEach((box)=> box.classList.remove("sel"));
        
        if (place.classList.contains("selected")) place.classList.remove("selected"); // If User Click On The Select Piece Than Remove The Selection From It
        else { // Else If User Click On Another The Select Piece Than Add "sel" Class For The Possible Move Position For That New Selected Piece
            possiblePositions.forEach((pos) => pos ? document.querySelector(`div[data-position="${pos}"]`).classList.add("sel") : ""); // Add "sel" Class For Possible Move Position
            // Remove (selected) Class From All Pieces
            document.querySelectorAll("div[data-position]").forEach((el)=> el.classList.remove("selected"));
            // Add The (selected) Class To The Current Piece
            place.classList.add("selected");
        }
    }

    showPossiblePos() {
        if (turn != this._color) return;
        let currentPos = document.querySelector(`div[data-position="${this._position}"]`);
        // Check If Piece Isn't Eated , and Make It Died If That
        if (!currentPos.children[0] || this._color != this.getColor(currentPos.children[0])[1]){
            this._died = true;
            return;
        }
        let possiblePositions = this.getPossiblePos(); // Get All Avaiable Positions To Move
        possiblePositions.forEach((pos) => {
            if (pos) { // Check That Is Not There Position Out Of Board
                document.querySelector(`div[data-position="${pos}"]`).classList.add("pos-ps"); // Select Boxs And Add To It "pos-ps" Class
            }
        })
    }

    // Function To Set The Current Position To Another One
    setCurrentPosition(newPosition) {
        turn = turn == 'l' ? 'b' : 'l'; // Make Turn To Another Color
        document.querySelector(".turn div").style.cssText = `background-color: ${turn == 'l' ? "white" : "black"};`;
        let MoveTo = document.querySelector(`div[data-position="${newPosition}"]`);
        this._moved = true; // Modify moved Attribute To true
        if (MoveTo.children[0]) MoveTo.querySelector("img").remove();
        document.querySelector(`div[data-position="${this._position}"] img`).remove(); // Remove Image In Old Position
        this.AddPiece(MoveTo); // Add Image In New Position
        this._position = newPosition; // Modify position Attribute To New Position
        document.querySelector(".selected").classList.remove("selected"); // Remove Selection Of New Position After Move
        // Get Possible Positons Again To Check If There Is Kash
        this.getPossiblePos();
    } 

    // Check If The Suggest Positon, It Can Be Avalible Position For Piece Or Not
    checkPos(position, avaPosArray= []) {
        let posEl = document.querySelector(`div[data-position="${position}"]`);
        if(posEl && posEl.children[0] && posEl.children[0].src) { // Check If Box Has An Image
            if(this.getColor(posEl.children[0])[1] != this._color) { // Check If That Has Different Color
                if (this.getColor(posEl.children[0])[0] === "k") posEl.classList.add("kash"); // If The Suggest Position Has King , Than Add For King Positon "kash" Class
                else avaPosArray.push(position); // Else Push It To Avaiable Position That May To Eat Or Move To It 
                return [true, avaPosArray];
            }else return [true, avaPosArray]; // Not Add Position That Has Same Color Piece
        }else {
            avaPosArray.push(position); // Suggeet Position Is Not Has Any Piece
        }
        return [false, avaPosArray];
    }

    // Function To Return Next Top Position Board
    goTop(number, position=this._position) {
        if (number+ +position[1] <= 8) return `${position[0]}${+position[1]+number}`;
        else return null;
    }
    
    // Function To Return Next Down Position On Board
    goDown(number, position=this._position) {
        if (+position[1]-number > 0) return `${position[0]}${+position[1] - number}`;
        else return null
    }

    // Function To Return Next Right Position On Board
    goRight(number, position=this._position) {
        let columnPos = ["a", "b", "c", "d", "e", "f", "g", "h"];
        let thisPos = columnPos.indexOf(position[0]);
        if (number+thisPos < 8) return `${columnPos[thisPos + number]}${position[1]}`;
        else return null;
    }

    // Function To Return Next Left Position On Board
    goLeft(number, position=this._position) {
        let columnPos = ["a", "b", "c", "d", "e", "f", "g", "h"];
        let thisPos = columnPos.indexOf(position[0]);
        if (thisPos-number >= 0) return `${columnPos[thisPos - number]}${position[1]}`;
        else return null
    }

    // Function To Move And Make Pieces To Be Ready To Move
    movePiece(position, piece, fun, fun2) {
        if (!position) return; // Check If The Position Is Not Null (Out Of Board)
        let tarBox = document.querySelector(`div[data-position="${position}"]`); // Target Box That Will Be Move To
        let currentPos = document.querySelector(`div[data-position="${this._position}"]`);
        // Check If Target Box Is The Same Current Piece Box
        // if (tarBox == document.querySelector(`div[data-position="${this._position}"]`)) return;
        const PieceOb = this;
        

        function move() {
            // console.log(this.children[0]);
            console.log(currentPos);
            if (currentPos.querySelector("img")) {
                // Remove Event Listener
                currentPos.removeEventListener("mouseover", fun);
                currentPos.removeEventListener("click", fun2); 
            }
            
            if (PieceOb._name[0] === 'k') {
                PieceOb.castling(tarBox);
            }

            piece.setCurrentPosition(position); // Set The Positon Of The Piece To Position Of Eated Piece
            piece._avaPos = piece.getPossiblePos(); // Change avaPos To All Possible Position Of Piece In Now Position 

            let posAndSel = [...document.querySelectorAll(".pos-ps"), ...document.querySelectorAll(".sel")]; // Select All Possible Position Of Eated Piece
            posAndSel.forEach((pos)=>pos.classList.remove("pos-ps", "sel")); // Remove All Highlighted
            
        }
        
        function targetBox(records) {
            for(const record of records) {
                if (record.removedNodes.length) {
                    tarBox.removeEventListener("click", move) // Make All Possible Position Of The Piece Ready To Move For It
                }
            }
        }
        
        tarBox.addEventListener("click", move)
        let observer = new MutationObserver(targetBox);
        observer.observe(document.querySelector(`div[data-position="${piece._position}"]`), {childList: true});
        
    }
}

export {Piece}