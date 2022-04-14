const spanLvl = document.querySelector(".lvl");
const spanSeconds = document.querySelector(".seconds");
const startBtn = document.querySelector(".start");
const theWord = document.querySelector(".the-word");
const input = document.querySelector(".input");
const upCommingWords = document.querySelector(".upcoming-words");
const spanTime = document.querySelector(".time span");
const spanGot = document.querySelector(".got");
const spanTotal = document.querySelector(".total");
const finishMessage = document.querySelector(".finish-message");

// levels
const lvl = {
  Easy: "5",
  Normal: "3",
  Hard: "2",
};

// words
const words = [
  "Facebook",
  "Twitter",
  "Linkedin",
  "Google",
  "Code",
  "Github",
  "Whatsapp",
  "Youtube",
  "Fast",
  "Udemy",
  "Subscribe",
  "Damage",
  "Attractive",
  "Window",
  "Generously",
  "Safely",
  "Hello",
  "Cartoon",
  "Careless",
  "Beautiful",
];

// Default
const defaultSpanLvl = "Normal";
const defaultSpanSeconds = lvl.Normal;

// level + seconds + score
spanLvl.innerHTML = defaultSpanLvl;
spanSeconds.innerHTML = defaultSpanSeconds;
spanTime.innerHTML = defaultSpanSeconds;
spanTotal.innerHTML = words.length;

// Disable paste
input.onpaste = function () {
  return false;
};

// when click start
startBtn.addEventListener("click", (eo) => {
  startBtn.remove();
  input.focus();
  // Call Generate word function
  GenWord();
});

// Generate word function
function GenWord() {
  let randomWord = words[Math.floor(Math.random() * words.length)];
  // Get word index
  let wordIndex = words.indexOf(randomWord);
  // Remove word from array
  words.splice(wordIndex, 1);
  // show the random word
  theWord.innerHTML = randomWord;
  // Empty upComming words
  upCommingWords.innerHTML = "";
  //Generate words
  for (let i = 0; i < words.length; i++) {
    // create div element
    let div = document.createElement("div");
    let txt = document.createTextNode(words[i]);
    div.appendChild(txt);
    upCommingWords.appendChild(div);
  }
  // Call start play function
  startPlay();
}

// start play function
function startPlay() {
  spanTime.innerHTML = defaultSpanSeconds;
  let start = setInterval(() => {
    spanTime.innerHTML--;
    if (spanTime.innerHTML === "0") {
      clearInterval(start);
      // compare words
      if (input.value.toLowerCase() == theWord.innerHTML.toLowerCase()) {
        // empty input field
        input.value = "";
        // add score
        spanGot.innerHTML++;
        if (words.length > 0) {
          // call Generate word function
          GenWord();
        } else {
          // create span
          const span = document.createElement("span");
          span.classList = "good";
          const txt = document.createTextNode("Congrats");
          span.appendChild(txt);
          finishMessage.appendChild(span);
        }
      } else {
        // create span
        const span = document.createElement("span");
        span.classList = "bad";
        const txt = document.createTextNode("Game Over");
        span.appendChild(txt);
        finishMessage.appendChild(span);
      }
    }
  }, 1000);
}
