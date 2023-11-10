const score0El = document.querySelector("#score--0");
const score1El = document.querySelector("#score--1");
const current0El = document.querySelector("#current--0");
const current1El = document.querySelector("#current--1");
const diceEl = document.querySelector(".dice");
const btnNew = document.querySelector(".btn--new");
const btnRoll = document.querySelector(".btn--roll");
const btnHold = document.querySelector(".btn--hold");
const player0El = document.querySelector(".player--0");
const player1El = document.querySelector(".player--1");

let score0=0;
let score1=0;
let currentScore0 = 0;
let currentScore1 = 0;
let currentPlayer = 0;
let playing = true;

diceEl.classList.add("hidden");
btnNew.classList.add("hidden");

btnRoll.addEventListener("click", function(){
    if(playing)
    {
        const dice = Math.floor(Math.random()*6+1);
        diceEl.classList.remove("hidden");
        btnNew.classList.remove("hidden");
        diceEl.src = `dice-${dice}.png`;
        if(dice!==1)
        {
            if(currentPlayer)
            {
                currentScore1+=dice;
                current1El.textContent = currentScore1;
            }
            else 
            {
                currentScore0+=dice;
                current0El.textContent = currentScore0;
            }
        }
        else
        {
            changePlayer();
        }
    }
})

btnHold.addEventListener("click", function() {
    if(currentPlayer&&playing)
    {
        score1+=currentScore1;
        score1El.textContent = score1;
        if(score1>=100)
        {
            playing = false;
            player1El.classList.add("player--winner");
            player1El.classList.remove("player--active");
            diceEl.classList.add("hidden");
        }
        else
        {
            changePlayer();
        }
    }
    else if(!currentPlayer&&playing)
    {
        score0+=currentScore0;
        score0El.textContent = score0;
        if(score0>=100)
        {
            playing = false;
            player0El.classList.add("player--winner");
            player0El.classList.remove("player--active");
            diceEl.classList.add("hidden");
        }
        else
        {
            changePlayer();
        }    
    }
});

function changePlayer()
{
    if(currentPlayer)
    {
        currentScore1 = 0;
        current1El.textContent = currentScore1;
        player1El.classList.remove("player--active");
        player0El.classList.add("player--active");
        btnHold.addEventListener("click", function() {
        })
    }
    else
    {
        currentScore0 = 0;
        current0El.textContent = currentScore0;
        player1El.classList.add("player--active");
        player0El.classList.remove("player--active");
    }
    currentPlayer = !currentPlayer;
}

btnNew.addEventListener("click", function(){
    score0=0;
    score1=0;
    currentScore0=0;
    currentScore1=1;
    score0El.textContent=0;
    score1El.textContent=0;
    current0El.textContent=0;
    current1El.textContent=0;
    currentPlayer = 0;
    player0El.classList.remove("player--winner");
    player1El.classList.remove("player--winner");
    player0El.classList.add("player--active");
    player1El.classList.remove("player--active");
    btnNew.classList.add("hidden");
    playing=true;
})