const body = document.querySelector("body");
const main = document.querySelector("main")

//===================== lien API ================//
const apiLink = "https://opentdb.com/api.php?amount=20&category=21&difficulty=medium&type=multiple&encode=base64";
const question = document.createElement("p");

//============= boutons=============//
const buttons = document.createElement("div");
buttons.className = "buttons";
//============= Afficher le score =============//
const score = document.querySelector(".score")
const displayScore = document.createElement("button");
displayScore.textContent = "SCORE";
//============= nouvelle questions =============//
const newQuestions = document.createElement("button");
newQuestions.textContent = "NEW QUESTIONS";

//============== request DATA du lien ===============//
fetch(apiLink)
.then(response => (response.json()))
.then(array => {
    const arrayAPI = array.results;

    const title = document.createElement("h1");
    title.textContent = `${b64DecodeUnicode(arrayAPI[0].category)} Trivia`;
    main.appendChild(title);

    for(let i = 0; i < arrayAPI.length; i++){

        const questionsAnswers = document.createElement("div");
        questionsAnswers.className = "questionsAnswers";
        main.appendChild(questionsAnswers);

        const question = document.createElement('p');
        question.className = "question";
        question.textContent = b64DecodeUnicode(arrayAPI[i].question);
        questionsAnswers.appendChild(question);

        const answers = document.createElement("div");
        answers.className = "answers";
        questionsAnswers.appendChild(answers);

        const questionArr = arrayAPI[i].incorrect_answers;

        const correctAnsw = arrayAPI[i].correct_answer;
        questionArr.push(correctAnsw)

        shuffle(questionArr);

        for(let answer of questionArr){

            const inputLabelDiv = document.createElement("div");
            inputLabelDiv.className = "inputLabelDiv";
            answers.appendChild(inputLabelDiv);

            const input = document.createElement("input");
            input.for = b64DecodeUnicode(answer);
            input.className = "input"+i;
            input.type = "radio";
            input.name = "answers" + i;
            inputLabelDiv.appendChild(input)

            const label = document.createElement("label");
            label.className = "label";
            label.id = b64DecodeUnicode(answer);
            label.textContent = b64DecodeUnicode(answer);
            inputLabelDiv.appendChild(label);

        }
    main.appendChild(buttons)
    buttons.appendChild(displayScore);
    buttons.appendChild(newQuestions);
    }

})


function b64DecodeUnicode(str) {
   
return decodeURIComponent(atob(str).split('').map(function(c) {
    return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
}).join(''));
}

function shuffle(arr){
    for(let i=arr.length-1; i>0; i--){
        let j = Math.floor(Math.random() * (i+1));
        [arr[i],arr[j]]=[arr[j],arr[i]];
    }
}