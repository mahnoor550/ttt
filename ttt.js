let board = ["","","","","","","","",""];
let currentPlayer = "X";
let gameOver = false;

const cells = document.querySelectorAll(".cell");
const statusText = document.getElementById("status");

const winPatterns = [
    [0,1,2],[3,4,5],[6,7,8],
    [0,3,6],[1,4,7],[2,5,8],
    [0,4,8],[2,4,6]
];

function play(index){

    if(gameOver || board[index]!="")
        return;

    board[index]="X";
    cells[index].textContent="X";

    if(checkWinner("X")){
        statusText.textContent="🎉 You Win!";
        gameOver=true;
        return;
    }

    if(boardFull()){
        statusText.textContent="Draw!";
        gameOver=true;
        return;
    }

    statusText.textContent="Computer Thinking...";

    setTimeout(computerMove,500);
}

function computerMove(){

    let empty=[];

    for(let i=0;i<board.length;i++){
        if(board[i]=="")
            empty.push(i);
    }

    if(empty.length==0 || gameOver)
        return;

    let randomIndex=empty[Math.floor(Math.random()*empty.length)];

    board[randomIndex]="O";
    cells[randomIndex].textContent="O";

    if(checkWinner("O")){
        statusText.textContent="💻 Computer Wins!";
        gameOver=true;
        return;
    }

    if(boardFull()){
        statusText.textContent="Draw!";
        gameOver=true;
        return;
    }

    statusText.textContent="Your Turn";
}

function checkWinner(player){

    for(let pattern of winPatterns){

        let a=pattern[0];
        let b=pattern[1];
        let c=pattern[2];

        if(
            board[a]==player &&
            board[b]==player &&
            board[c]==player
        ){
            return true;
        }
    }

    return false;
}

function boardFull(){
    return !board.includes("");
}

function resetGame(){

    board=["","","","","","","","",""];

    gameOver=false;

    statusText.textContent="Your Turn";

    cells.forEach(cell=>{
        cell.textContent="";
    });

}