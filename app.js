let boxes = document.querySelectorAll(".box");
let resetBtn = document.querySelector("#reset-btn");
let newGameBtn = document.querySelector("#new-game");
let msgcontainer = document.querySelector(".msg-container");
let msg = document.querySelector("#msg"); 
let info = document.querySelector("#info");

let turnO = true;
let count = 0;

const winPattrens = [
    [0, 1, 2],
    [0, 3, 6],
    [0, 4, 8],
    [1, 4, 7],
    [2, 5, 8],
    [2, 4, 6],
    [3, 4, 5],
    [6, 7, 8],
];

const resetgame = () =>{
    turnO = true;
    enableBoxes();
    count = 0;
    msgcontainer.classList.add("hide");
    info.innerText = "Turn of O";
}

boxes.forEach((box) => {
    box.addEventListener("click", () => {
        if(turnO){
            box.innerText = "O";
            turnO = false;
            info.innerText = "Turn of X";
        }else{
            box.innerText = "x";
            turnO = true;
            info.innerText = "Turn of O";
        }
        box.disabled = true;
        count++;
        let isWinner = checkWinner();
       if (count=== 9 && !isWinner){
        gameDraw();
       }
    });
});

const gameDraw =() =>{
    msg.innerText =`Game was Draw.`;
    msgcontainer.classList.remove("hide");
    disableBoxes();
}

const disableBoxes = () =>{
    for(box of boxes){
        box.disabled = true;
    }
}

const enableBoxes = () =>{
    for(box of boxes){
        box.disabled = false;
        box.innerText = "";
    }
}

const showWinner = (winner) =>{
     msg.innerText = `Congratulations, winner is ${winner}`;
    msgcontainer.classList.remove("hide");
    disableBoxes();
}

const checkWinner=()=>{
 for( let pattren of winPattrens){
    let pos1val = boxes[pattren[0]].innerText
    let pos2val = boxes[pattren[1]].innerText
    let pos3val = boxes[pattren[2]].innerText
    if(pos1val != "" && pos2val != "" && pos3val != ""){
        if(pos1val === pos2val && pos2val === pos3val){
            showWinner(pos1val);
            return true;
        }
    }
 }
};

newGameBtn.addEventListener("click", resetgame);
resetBtn.addEventListener("click", resetgame);
