//sounds
const success = new Audio('sounds/win.mp3');
const fail = new Audio('sounds/lose.mp3');


//letters
const letters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";

//get array of letters
let lettersArray = Array.from(letters);

//select letter container
let lettersContainer = document.querySelector(".letters");
//generate letters
lettersArray.forEach(letter => {
    //create span       
    let span = document.createElement("span");
    //create letter text node
    let theLetter = document.createTextNode(letter);    
    //append the letter to span
    span.appendChild(theLetter);    
    //add class to span
    span.className = 'letter-box';
    //append span to the letters container
    lettersContainer.appendChild(span);
});
//object of words + categories
const words = {
    programming: ["php", "javascript", "go", "scala", "fortran", "r", "mysql", "python"],
    movies: ["prestige", "inception", "parasite", "interstellar", "whiplash", "memento", "coco", "up"],
    people: ["albert einstein", "cleopatra", "mahatma gandhi", "abraham lincoln", "mother teresa"],
    countries: ["syria", "brazil", "germany", "nepal", "ethiopia", "croatia", "bangladesh", "venezuela"]
};
//get random property
let allKeys = Object.keys(words);
let randomPropNumber = Math.floor(Math.random() * allKeys.length);
let randomPropName = allKeys[randomPropNumber];
//get random word
let randomPropValue = words[randomPropName];
let randomValueNumber = Math.floor(Math.random() * randomPropValue.length);
let randomWord = randomPropValue[randomValueNumber];
//set category info
document.querySelector(" .cateogry span").textContent = randomPropName;
//select letters guess container
let lettersGuessContainer = document.querySelector(".letters-guess");
//convert random word to array
let randomWordArray = Array.from(randomWord.toLowerCase());
//create spans depend on word letters
randomWordArray.forEach(letter => {
    //create empty span
    let emptySpan = document.createElement("span");
    //if letter is space
    if (letter === ' ') {
        //add class to the span
        emptySpan.className = 'with-space';
    }
    //append span to the letters guess container
    lettersGuessContainer.appendChild(emptySpan);
});

//select guess span
let guessSpans = document.querySelectorAll('.letters-guess span')

// set wrong attempts
let wrongAttempts = 0;

//select the hangman drawing parts
let theDraw = document.querySelector('.hangman-draw ');



//handle clicking on letters
document.addEventListener('click', function(e){
    if(e.target.className === 'letter-box'){
        e.target.classList.add('clicked');
        

        //set status chooes
        let theStatus = false;

        //get clicked letter
        let theClickedLetter = e.target.innerHTML.toLowerCase();

        //the chosen word
        randomWordArray.forEach((wordLetter, wordIndex) => {
            //if the clicked letter equal to one of the word random
            if(theClickedLetter === wordLetter){
                //set status to correct
                theStatus = true;
            
                

                //loop on all guess spans
                guessSpans.forEach((span, spanIndex) => {
                    if (wordIndex === spanIndex){
                        

                        span.innerHTML = wordLetter //or clickedletter
                    };
                });
               
        };
        });
    


        //outside loop
        //if letter is wrong
         if (theStatus){
                     let allCorrect = true;
                    guessSpans.forEach((span, spanIndex) => {
                       
                        if(span.innerHTML === ''){
                            allCorrect = false;
                        };
                    });
            
                    if(allCorrect){
                        
                        success.play();

                        alert('Congratulations You Win!');
                        lettersContainer.classList.add('finished');
                };

                
            }
        else{
            //increase the wrong attempts
            wrongAttempts++;
            fail.play();
            //add class to the hangman drawing parts
            theDraw.classList.add(`wrong-${wrongAttempts}`);
            //check if wrong attempts is 8
            if(wrongAttempts === 8 ){
                
                lettersContainer.classList.add('finished');
                alert(`Game Over The Word Is ${randomWord}`);
            
            }
    };
    };
});








console.log(randomWord);
let restart = document.querySelector('#restart');
restart.addEventListener('click', function(){
    window.location.reload();
});
