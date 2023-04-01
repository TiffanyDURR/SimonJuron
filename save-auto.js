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
let playerData = [];
let i;
let x = 1;
let y;

// Fonction qui génère un chiffre au hasard
function generateID(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function playButtonFunction() {
  // Quand le joueur cliquer sur le bouton "jouer"
  playButton.addEventListener("click", () => {
    autoplay();
  });
}

playButtonFunction();

// Fonction jouer
function autoplay() {
  console.log("Tour de l'IA");
  // Je genère un chiffre entre 1 et 5
  // ID prend la valeur du chiffre généré
  ID = generateID(1, 5);
  // J'ajoute ID dans mon tableau "IA DATA"
  IAData.push(ID);
  // J'ajoute ID en tant que contenu textuel de ma balise "iaText"
  iaText.innerHTML += ID;
  // Je masque le bouton Play
  playButton.style.display = "none";
  // J'affiche le bouton "valider"
  checkButton.style.display = "inline-block";
  // Le contenu textuel de ma balise "PlayerText" est vidé
  playerText.innerHTML = "";
  // Je joue ma fonction readDataInterval
  // Cette fonction permet de jouer les sons et les animations avec une intervalle de 800ms entre chaque élément de ma data
  readDataInterval();
  // Fonction qui me servira pour tard
  setTimeout(() => {
    console.log("delais");
  }, 800 * i);
  console.log("Function autoplay : L'IA a joué " + ID);
  console.log(`"Function autoplay : ${IAData.length} / ${playerData.length}`);
  choose();
}

// Fonction qui permet au joueur de jouer
function choose() {
  console.log("Tour du joueur");
  // Pour chaque élément juron
  jurons.forEach((juron) => {
    // Je focus dans ma structure HTMl la balise juron voulue
    juronID = document.getElementById(`${juron.id}`);
    // A chaque fois que le joueur clique sur une balise juron
    juronID.addEventListener("click", (e) => {
      // Je récupère l'ID de la balise cliquée et le stocke l'information dans une variable "newJuronID"
      let newJuronID = e.target.id;
      // J'applique la valeur de l'ID récupérée à juronID
      juronID = document.getElementById(`${newJuronID}`);
      // J'ajoute la valeur de juronID.id en tant que contenu textuel de ma balise "iaText"
      playerText.innerHTML += juronID.id;
      // Je l'ajoute aussi dans mon tableau
      playerData.push(juronID.id);
      // Je joue animation
      // Pour chaque élément cliqué l'animation va se jouer
      animation();
      console.log("Function choose : Le joueur a joué " + juronID.id);
      console.log(`"Function choose : ${IAData.length} / ${playerData.length}`);
      console.log("Suite de chiffes IA : " + iaText.textContent + " Suite de chiffres Player " + playerText.textContent);
    });
  });
  check();
}

function check() {
  if (IAData.length == playerData.length) {
    console.log("Comparaison de la longueur des tableaux");
    valider();
  } else {
    console.log("Rien");
  }
}

// Fonction valider
function valider() {
  console.log("Validation ");
  // Si le contenu textul de iaText est égal au contenu textuel de playerText
  if (iaText.textContent == playerText.textContent) {
    // Alors mon score est égal à la longueur de mon tableau "IAData"
    score = IAData.length;
    // J'affiche à l'écran mon score
    scoreContainer.innerHTML = `${IAData.length}`;
    // Je masque le bouton valider
    checkButton.style.display = "none";
    // J'affiche le bouton "jouer"
    playButton.style.display = "inline-block";
    playerText.textContent = "";
    autoplay();
  } else {
    // Mon score est retombe à 0
    score = 0;
    // J'affiche "perdu"
    scoreContainer.innerHTML = `Perdu !`;
    // J'affiche mon bouton "recommencer"
    restartButton.style.display = "inline-block";
    // Je masque mon bouton valider
    checkButton.style.display = "none";
    // Je joue une musique de game over en fonction d'un nombre aléatoire
    musicLooser(y);
  }
}

// Fonction lecture d'interval
function readDataInterval() {
  // Tant que i est inférieur à la longueur de mon tableau alors j'incrémente i de 1 à chaque boucle
  for (i = 0; i < IAData.length; i++) {
    // Je joue la fonction "intervalDelay" en fonction de i
    intervalDelay(i);
  }

  // Fonction interval delais
  function intervalDelay(i) {
    // J'ajoute un setTimeout - fonction qui va se lire après un délais de 800ms
    setTimeout(function () {
      // J'initialise juron ID qui correspond à l'index [i] de ma data
      juronID = document.getElementById(`${IAData[i]}`);
      // J'initialise x en indiquant qu'il est égal à l'index [i] de ma data
      x = IAData[i];
      // Je joue ma fonction musicPlay en fonction de x
      musicPlay(x);
      // Je joue mon animation
      animation();
    }, 800 * i);
  }
}

// Animation des touches
// CSS
function animation() {
  // J'ajoute ma classe "animation"
  juronID.classList.add("animation");
  setTimeout(function () {
    // Je l'enlève au bout de 180ms
    juronID.classList.remove("animation");
  }, 180);
}

// Joue l'audio en fonction de x
function musicPlay(x) {
  const audio = new Audio();
  audio.src = `${x}.mp3`;
}

// Joue l'audio en fonction de y
function musicLooser(y) {
  y = generateID(1, 5);
  const audio = new Audio();
  audio.src = `loose${y}.mp3`;
}
