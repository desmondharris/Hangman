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
let hinted = false;

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
        if(guessCount === 0){
            failedWord()
        }
        if(guessCount <= 4){
            displayHint();
        }
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

function failedWord(){
    guessBox.innerHTML = `<b> Rats! The word was ${currentWord}. Move on to next word?</b>`;
    innerWords = document.querySelector('b');
    innerWords.style.color = "#B8D8D8";
    innerWords.style.border = "0";
    guessBox.appendChild(nextButton);
}
// Insert correct number of blank lines into guess flexbox
function insertBlanks(){
    basicString = "";
    for(let i=0; i < currentWord.length; i++){
        basicString = basicString + " <b>&nbsp;</b>";
    }
    guessBox.innerHTML = basicString;
}

function displayHint(){
    if(hinted){
        return undefined;
    }
    let hintText;
    switch(currentWord){
        case 'солнышко':
            hintText = "HINT: Russian endearing name, think of sunshine";
            break;
        case 'любовь':
            hintText = "HINT: Talkin' bout love, baby!";
            break;
        case 'милашка':
            hintText = "HINT: Nickname, something you might call a cat, or you if I'm feeling frisky";
            break;
        case 'уют':
            hintText = "HINT: Think relaxing by the fireplace, I have a bracelet with this very word on it";
            break;
        case 'игра':
            hintText = "HINT: What are you playing right now? Hangman, yes, but what's hangman?"
            break;
        case 'кошка':
            hintText = "HINT: My favorite one of these is fat, hairless, Korean, and named Jadu"
            break;
    }
    titleBox = document.querySelector('.title-box');
    hintP = document.createElement('p');
    hintP.textContent = hintText;
    hintP.style.cssText = "color: #B8D8D8; font-size: large; margin-top: 0;";
    hintP.classList.add("hint");
    titleBox.appendChild(hintP);
    hinted = true;
}

function finishWord(){
    if(hinted){
        titleBox = document.querySelector('.title-box');
        hint = document.querySelector('.hint');
        titleBox.removeChild(hint);
    }
    if(currentWord === 'кошка'){
        guessBox.innerHTML = "<b> That's the last one! Ready to finish the game?</b>"; 
    } else{
        guessBox.innerHTML = "<b> Congrats! Move on to the next word?</b>";
    }
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
            currentWord = 'милашка';;
            break;
        case 'милашка':
            guessCount = 10;
            currentWord = 'уют';
            break;
        case 'уют':
            guessCount = 10;
            currentWord = 'игра';;
            break;
        case 'игра':
            currentWord = 'кошка';
            break;
        case 'кошка':
            currentWord = 'done';
            break;
    }
}

function moveOn(){
    lettersFound = 0;
    hinted = false;
    addKeyFctns();
    nextWord(currentWord);
    if(currentWord === 'done'){
        finalScreen();
        return null;
    }
    guessCount = Math.floor(currentWord.length * 1.5) + 1;
    guessCntTxt.textContent = `Guesses Remaining: ${guessCount}`;
    insertBlanks();
}
function finalScreen(){
    titleBox = document.querySelector('.title-box');
    titleBox.style.marginBottom = "0";
    titleText = document.querySelector('#title-text');
    titleText.textContent = 'Happy Birthday, Reagan ♡';
    guessBox.style.marginTop = "0";
    guessBox.innerHTML = "<b> Whenever I need project inspiration, you've always given me the<br> fantastic advice \
     that I should just make hangman. <br> So, I figured since it's your birthday, I should finally get around to<br> making it.\
     Happy 17th Reagan, I hope you had a wonderful birthday <br> and enjoyed your little game. I look forward to the next year of knowing you.";  
    innerWords = document.querySelector('b');
    innerWords.style.color = "#B8D8D8";
    innerWords.style.textAlign = "center"
    innerWords.style.border = "0";

    for(let i=0; i<keys.length; i++){
        keys[i].onclick = null;
    }
}