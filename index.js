const playButton = document.getElementById("play");
const checkButton = document.getElementById("valider");
const restartButton = document.getElementById("recommencer");
const scoreContainer = document.querySelector(".score");
const jurons = document.querySelectorAll("main div");
const iaText = document.querySelector(".iadatacontainer");
const playerText = document.querySelector(".playerdatacontainer");
const delayTest = document.querySelector(".delaytest");
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
      checkButton.style.display = "none";
    }
  });
}

function readDataInterval() {
  for (let i = 0; i < IAData.length; i++) {
    intervalDelay(i);
  }
  function intervalDelay(i) {
    setTimeout(function () {
      console.log(IAData[i]);
      juronID = document.getElementById(`${IAData[i]}`);
      console.log(juronID);
      animation();
    }, 1000 * i);
  }
}

function animation() {
  juronID.classList.add("animation");
  setTimeout(function () {
    juronID.classList.remove("animation");
  }, 340);
}
