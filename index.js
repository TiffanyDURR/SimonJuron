const playButton = document.querySelector(".commencer");
const checkButton = document.querySelector(".valider");
const restartButton = document.querySelector(".perdu");
const scoreContainer = document.querySelector(".score");
const jurons = document.querySelectorAll(".gameContainer img");
const iaText = document.querySelector(".iadatacontainer");
const playerText = document.querySelector(".playerdatacontainer");
const delayTest = document.querySelector(".delaytest");
const wkinprogress = document.querySelector(".wiprogress");
const allButton = document.querySelectorAll(".mainbutton img");
let score = 0;
let ID;
let juronID;
let IAData = [];
let playerData = [];
let i;
let x = 1;
let y;

function init() {
  checkButton.style.display = "none";
  restartButton.style.display = "none";
  wkinprogress.style.display = "none";
  nouvellePartie();
  tourDuJoueur();
  valider();
}

init();

function generateID(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function tourIA() {
  ID = generateID(1, 5);
  IAData.push(`${ID}`);
  iaText.innerHTML += ID;
  playButton.style.display = "none";
  checkButton.style.display = "none";
  wkinprogress.style.display = "block";
  playerText.innerHTML = "";
  readDataInterval();
  setTimeout(() => {
    checkButton.style.display = "block";
  }, 800 * i);
}

function nouvellePartie() {
  playButton.addEventListener("click", () => {
    tourIA();
  });
}

function tourDuJoueur() {
  console.log(IAData.length + " Longueur de la suite");
  jurons.forEach((juron) => {
    juronID = document.getElementById(`${juron.id}`);
    juronID.addEventListener("click", (e) => {
      let newJuronID = e.target.id;
      juronID = document.getElementById(`${newJuronID}`);
      playerText.innerHTML += juronID.id;
      playerData.push(juronID.id);
      animation();
      console.log(playerData.length);
      console.log(playerData);
      console.log(iaText.textContent);
    });
  });
}

function valider() {
  checkButton.addEventListener("click", () => {
    if (iaText.textContent == playerText.textContent) {
      score = IAData.length;
      scoreContainer.innerHTML = `${IAData.length}`;
      checkButton.style.display = "none";
      playButton.style.display = "none";
      playerText.innerHTML = "";
      playerData = [];
      tourIA();
    } else {
      score = 0;
      scoreContainer.innerHTML = `Perdu !`;
      restartButton.style.display = "inline-block";
      checkButton.style.display = "none";
      musicLooser(y);
    }
  });
}

function readDataInterval() {
  for (i = 0; i < IAData.length; i++) {
    intervalDelay(i);
  }

  function intervalDelay(i) {
    setTimeout(function () {
      juronID = document.getElementById(`${IAData[i]}`);
      x = IAData[i];
      musicPlay(x);
      animation();
    }, 800 * i);
  }
}

function animation() {
  juronID.classList.add("animation");
  setTimeout(function () {
    juronID.classList.remove("animation");
  }, 180);
}

function musicPlay(x) {
  const audio = new Audio();
  audio.src = `${x}.mp3`;
  audio.play();
}

function musicLooser(y) {
  y = generateID(1, 5);
  const audio = new Audio();
  audio.src = `loose${y}.mp3`;
  audio.play();
}
