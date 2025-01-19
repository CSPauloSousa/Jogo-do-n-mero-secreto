let listOfDrawnNumbers = [];
let limitNumber = 10;
let numberSecret = generateNumber();
let attempts = 1;

function displayTextOnScreen(tag, text){
    let field = document.querySelector(tag);
    field.innerHTML = text;
    if ('speechSynthesis' in window) {
        let utterance = new SpeechSynthesisUtterance(text);
        utterance.lang = 'pt-BR'; 
        utterance.rate = 1.2; 
        window.speechSynthesis.speak(utterance); 
    } else {
        console.log("Web Speech API não suportada neste navegador.");
    }
}

function initialMessage(){
    displayTextOnScreen('h1', 'Jogo do número secreto');
    displayTextOnScreen('p', 'Escolha um número entre 1 e 10');
}

initialMessage();

function checkKick(){
    let kick = document.querySelector('input').value;
    
    if(kick == numberSecret){
        displayTextOnScreen('h1', 'Acertou');
        let wordAttempts = attempts > 1 ? 'tentativas' : 'tentativa';
        let messageAttempts = `Você descobriu o número secreto com ${attempts} ${wordAttempts}.`;
        displayTextOnScreen('p', messageAttempts);
        document.getElementById('reiniciar').removeAttribute('disabled');
    } else{
        if(kick > numberSecret){
            displayTextOnScreen('p', 'O número secreto é menor.');
        } else{
            displayTextOnScreen('p', 'O número secreto é maior.');
        }
        attempts++;
        clearField()
    }
}

function generateNumber(){
    let chosenNumber = parseInt(Math.random() * limitNumber + 1);
    let numberOfElementsInTheList = listOfDrawnNumbers.length;

    if(numberOfElementsInTheList == limitNumber){
        listOfDrawnNumbers = [];
    }

    if(listOfDrawnNumbers.includes(chosenNumber)){
        return generateNumber();
    } else{
        listOfDrawnNumbers.push(chosenNumber);
        return chosenNumber;
    }
}

function clearField(){
    kick = document.querySelector('input');
    kick.value = '';
}

function restartGame(){
    numberSecret = generateNumber();
    clearField();
    attempts = 1;
    initialMessage();
    document.getElementById('reiniciar').setAttribute('disabled', true);
} 
