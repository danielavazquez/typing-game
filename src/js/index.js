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
//*Seventh when page refreshes want cursor to automatically be in text area input field used text.focus();
//*Eighth create const variable timeInterval that will allow us to run a function updateTime every 1000 miliseconds or 1s
//*Ninth create updateTime function
//*Tenth create gameOver function used in updateTime function
//*Eleventh add time+= 5; to append time 
//*Twelveth create settingsBtn and settingsForm eventListeners
//*Thirteenth create global variable for difficulty level in local storage, then set difficulty select value
//*Fourteenth need to implement difficulty level in typing eventListener because it is available in local storage but not yet available for use in app
//*add if difficulty === hard then set time increment to 2... statement in eventListener Typing


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

//Set difficulty to value in local storage or medium
//ternary operator for difficulty level vs. local storage
//if difficulty !== not equal to null (if a difficulty is set to local storage) then set varible to localStorage getItem difficulty else set it to medium
let difficulty =
  localStorage.getItem('difficulty') !== null
    ? localStorage.getItem('difficulty')
    : 'medium';

// Set difficulty select value
difficultySelect.value =
  localStorage.getItem('difficulty') !== null
    ? localStorage.getItem('difficulty')
    : 'medium';

// Focus on text on start
text.focus();

// Start counting down
const timeInterval = setInterval(updateTime, 1000);



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

//Update time
//every second or whatever is set in timeInterval local variable want time to count down
function updateTime() {
  time--;
  timeEl.innerHTML = time + 's';

  //if we don't add this timer will display negative seconds 
  //use JS property called clearInterval and pass in variable timeInterval
  if (time === 0) {
    clearInterval(timeInterval);

    //end game
    gameOver();
  }
}

//Game over, show end screen
//added inline eventListener in button tag to listen for a click
//in CSS we have endgameEl class end-game-container set to display none must change it to display flex
function gameOver() {
  endgameEl.innerHTML = `
  <h1>Time ran out</h1>
  <p>Your final score is ${score}</p>
  <button onclick="location.reload()">Reload</button>
  `;

  endgameEl.style.display = 'flex';
}


addWordToDOM();

//Event Listeners

//Typing
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

    if (difficulty === 'hard') {
      time += 2;
    } else if (difficulty === 'medium') {
      time += 3;
    } else {
      time += 5;
    }

    updateTime();
  }
});

//Settings btn click
settingsBtn.addEventListener('click', () => settings.classList.toggle('hide'));

//Settings select
//take our local storage object and call setItem which sets an item in local storage
//we are going to call the item difficulty, and set it to that difficulty variable
settingsForm.addEventListener('change', e => {
  difficulty = e.target.value;
  localStorage.setItem('difficulty', difficulty);
});