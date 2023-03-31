const playButton = document.getElementById("play");
const checkButton = document.getElementById("valider");
const restartButton = document.getElementById("recommencer");
const scoreContainer = document.querySelector(".score");
const jurons = document.querySelectorAll("main div");
const iaText = document.querySelector(".iadatacontainer");
const playerText = document.querySelector(".playerdatacontainer");
let score = 0;
let ID;
let juronID;
let IAData = [];
let playerData = [];

function init() {
  checkButton.style.display = "none";
  restartButton.style.display = "none";
  choose();
  valider();
}

init();

function generateID(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function play() {
  playButton.addEventListener("click", () => {
    ID = generateID(1, 5);
    IADataPush();
    iaText.innerHTML += ID;
    playButton.style.display = "none";
    checkButton.style.display = "inline-block";
  });
}

play();

function IADataPush() {
  IAData.push(ID);
}

function choose() {
  jurons.forEach((juron) => {
    juronID = document.getElementById(`${juron.id}`);
    juronID.addEventListener("click", (e) => {
      let newJuronID = e.target.id;
      juronID = document.getElementById(`${newJuronID}`);
      playerText.innerHTML += juronID.id;
    });
  });
}

function playerDataPush() {
  playerData.push(juronID.id);
}

function valider() {
  checkButton.addEventListener("click", () => {
    if (iaText.textContent == playerText.textContent) {
      score = IAData.length;
      scoreContainer.innerHTML = `${IAData.length}`;
      checkButton.style.display = "none";
      playButton.style.display = "inline-block";
      playerDataPush();
    } else {
      score = 0;
      scoreContainer.innerHTML = `Perdu !`;
      restartButton.style.display = "inline-block";
    }
  });
}
