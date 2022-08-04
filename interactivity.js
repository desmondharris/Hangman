//ALL WORDS MUST BE IN ALL UPPERCASE
// Only in place now for a simple test word
let currentWord = "ВАВАЛ";
let lettersFound = 0;
let keys = document.querySelectorAll('button');
let guessBox = document.querySelector('.guess-box');

// Create the next button that will later appear and dissapear.
const nextButton = document.createElement('button');
nextButton.textContent = 'Next';
nextButton.style.cssText = 'background-color: black; color: #B8D8D8; border-radius: 10%;';
nextButton.addEventListener('click', moveOn);
insertBlanks();

// Create a function for each key that checks to see if that key's letter
// is in the word and if so, put it onscreen
for(let i=0; i<keys.length; i++){
    keys[i].addEventListener('click', function(){
        console.log(keys[i].textContent);
        return typeKey(keys[i].textContent);
    });
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
    }
}

// Find indices of given letter in word
function findOccurences(letter, str){
    let indices = [];
    for(let i=0; i < str.length; i++){
        if(str[i] === letter){
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

function moveOn(){
    lettersFound = 0;
    insertBlanks();
}