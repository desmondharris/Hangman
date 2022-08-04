//ALL WORDS MUST BE IN ALL UPPERCASE
// Only in place now for a simple test word
let currentWord = "солнышко";
let lettersFound = 0;
let keys = document.querySelectorAll('button');
let guessBox = document.querySelector('.guess-box');

// Create the next button that will later appear and dissapear.
const nextButton = document.createElement('button');
nextButton.textContent = 'Next';
nextButton.style.cssText = 'background-color: black; color: #B8D8D8; border-radius: 10%;';
nextButton.addEventListener('click', moveOn);
insertBlanks();
addKeyFctns();

let guessCount = Math.floor(currentWord.length * 1.5) + 1;
let guessCntTxt = document.querySelector('#title-text');
guessCntTxt.textContent = `Guesses Remaining: ${guessCount}`;

// Create a function for each key that checks to see if that key's letter
// is in the word and if so, put it onscreen
function addKeyFctns(){
    for(let i=0; i<keys.length; i++){
        keys[i].onclick = (function(){
            return typeKey(keys[i].textContent);
        })
        keys[i].style.color = '#B8D8D8';
    }
}

function getKey(letter){
    for(current of keys){
        if(current.textContent === letter){
            return current;
        }
    }
}

function typeKey(letter){
    // All the <b> tags that contain blank letters
    let blanks = document.querySelectorAll('b');
    getKey(letter).style.color = 'black';
    getKey(letter).onclick = null;
    if(currentWord.toUpperCase().includes(letter)){
        // Find where the queried letter is in the word
        // And insert those letters
        let indices = findOccurences(letter, currentWord);
        for(let i=0; i<indices.length; i++){
            blanks[indices[i]].textContent = letter;
            blanks[indices[i]].style.color = '#B8D8D8';
        }
        // Add however many new letters were found 
        lettersFound += indices.length;
        if(lettersFound === currentWord.length){
            finishWord();
        }
    } else{
        guessCount--;
        guessCntTxt.textContent = `Guesses Remaining: ${guessCount}`;
    }
}

// Find indices of given letter in word
function findOccurences(letter, str){
    let indices = [];
    for(let i=0; i < str.length; i++){
        if(str[i].toUpperCase() === letter){
            indices.push(i);
        }
    }
    return indices
}

// Insert correct number of blank lines into guess flexbox
function insertBlanks(){
    basicString = "";
    for(let i=0; i < currentWord.length; i++){
        basicString = basicString + " <b>&nbsp;</b>";
    }
    guessBox.innerHTML = basicString;
}

function finishWord(){
    guessBox.innerHTML = "<b> Congrats! Move on to the next word?</b>";
    innerWords = document.querySelector('b');
    innerWords.style.color = "#B8D8D8";
    innerWords.style.border = "0";
    guessBox.appendChild(nextButton);
}

function nextWord(current){
    switch(current){
        case 'солнышко':
            currentWord = 'любовь';
            break;
        case 'любовь':
            finalScreen();
            break;
    }
}
function moveOn(){
    lettersFound = 0;
    addKeyFctns();
    nextWord(currentWord);
    insertBlanks();
    guessCount = Math.floor(currentWord.length * 1.5) + 1;
    guessCntTxt.textContent = `Guesses Remaining: ${guessCount}`;
}
function finalScreen(){
    console.log('Done!');
}