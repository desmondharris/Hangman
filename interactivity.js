//ALL WORDS MUST BE IN ALL UPPERCASE
let currentWord = "ВАВАЛ";
let lettersFound = 0;
let keys = document.querySelectorAll('button');
let guessBox = document.querySelector('.guess-box');
const nextButton = document.createElement('button');
nextButton.textContent = 'Next'
nextButton.style.cssText = 'background-color: black; color: #B8D8D8; border-radius: 10%;'
insertBlanks();
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
    let blanks = document.querySelectorAll('b');
    if(currentWord.toUpperCase().includes(letter)){
        let indices = findOccurences(letter, currentWord);
        for(let i=0; i<indices.length; i++){
            blanks[indices[i]].textContent = letter;
            blanks[indices[i]].style.color = '#B8D8D8';
        }
        lettersFound += indices.length;
        if(lettersFound === currentWord.length){
            finishWord();
        }
    }
}

function findOccurences(letter, str){
    let indices = [];
    for(let i=0; i < str.length; i++){
        if(str[i] === letter){
            indices.push(i);
        }
    }
    return indices
}

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

