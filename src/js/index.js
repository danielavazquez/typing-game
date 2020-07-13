const word = document.getElementById('word');
const text = document.getElementById('text');
const scoreEl = document.getElementById('score');
const timeEl = document.getElementById('time');
const endgameEl = document.getElementById('end-game-container');
const settingsBtn = document.getElementById('settings-btn');
const settings = document.getElementById('settings');
const settingsForm = document.getElementById('settings-form');
const difficultySelect = document.getElementById('difficulty');

//*First bring in all the DOM elements
//*Second create global variables for random word chosen let randomWord let score let time, we want to reassign these
//*Third ceate getRandomWord function
//*Fourth create function to add word to DOM
//*Fifth add text.eventListener within this listener we will be using an updateScore function not yet created
//*Sixth create updateScore function

//List of words for game
const words = [
  'sigh',
  'tense',
  'airplane',
  'ball',
  'pies',
  'juice',
  'warlike',
  'bad',
  'north',
  'dependent',
  'steer',
  'silver',
  'highfalutin',
  'superficial',
  'quince',
  'eight',
  'feeble',
  'admit',
  'drag',
  'loving',
  'spain',
  'italy',
  'france',
  'brazil',
  'croatia',
  'japan',
  'china',
  'mexico',
];

//Init word
let randomWord;

//Init score
let score = 0;

//Init time
let time = 10;

//Generate random word from array
//we have an arr called words and we need a random index or element from this arr
//could also use an API with random words
function getRandomWord() {
  return words[Math.floor(Math.random() * words.length)];
}


//Add word to DOM, code for word not displayed using HTML but JavaScript
function addWordToDOM() {
  randomWord = getRandomWord();
  word.innerHTML = randomWord;
}


//Update score function
//increment score then set scoreEl to whatever score incremented to
function updateScore() {
  score++;
  scoreEl.innerHTML = score;
}
addWordToDOM();

//Event Listeners

//listens for a text input and listens for an event
//will capture what user is typing and put it in a variable
text.addEventListener('input', e => {
  const insertedText = e.target.value;

  //check to see if inserted text is actually equal to the randomWord, if true call addWordToDOM function and then clear target value
  if (insertedText === randomWord) {
    addWordToDOM();
    updateScore();

    //clear e.target.value set to empty string
    e.target.value = '';
  }
});