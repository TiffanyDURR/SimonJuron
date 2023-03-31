const playButton = document.getElementById("play");
const checkButton = document.getElementById("valider");
const restartButton = document.getElementById("recommencer");
const scoreContainer = document.querySelector(".score");
const jurons = document.querySelectorAll("main img");
const iaText = document.querySelector(".iadatacontainer");
const playerText = document.querySelector(".playerdatacontainer");
const delayTest = document.querySelector(".delaytest");
let score = 0;
let ID;
let juronID;
let IAData = [];
let i;
let x = 1;
let y;

function init() {
  checkButton.style.display = "none";
  restartButton.style.display = "none";
  choose();
  valider();
  play();
}

init();

function generateID(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function play() {
  playButton.addEventListener("click", () => {
    ID = generateID(1, 5);
    IAData.push(ID);
    iaText.innerHTML += ID;
    playButton.style.display = "none";
    checkButton.style.display = "inline-block";
    playerText.innerHTML = "";
    readDataInterval();
    console.log(800 * i);
  });
}

function choose() {
  jurons.forEach((juron) => {
    juronID = document.getElementById(`${juron.id}`);
    juronID.addEventListener("click", (e) => {
      let newJuronID = e.target.id;
      juronID = document.getElementById(`${newJuronID}`);
      playerText.innerHTML += juronID.id;
      animation();
    });
  });
}

function valider() {
  checkButton.addEventListener("click", () => {
    if (iaText.textContent == playerText.textContent) {
      score = IAData.length;
      scoreContainer.innerHTML = `${IAData.length}`;
      checkButton.style.display = "none";
      playButton.style.display = "inline-block";
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
  }, 400);
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
