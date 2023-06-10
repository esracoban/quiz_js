const questions = [
    {
        question: "yazılım eğitiminde kim daha iyi ?",
        answers:[
            { text: "Aydın Köksal", correct: false },
            { text: "Emre Can Doğan", correct: false },
            { text: "Mehmet Can Seyhan", correct: true },
            { text: "Aslı Sayitoğlu", correct: false },
        ]
    },
    {
        question: "En eğlenceli yazılım dili hangisidir ?",
        answers:[
            { text: "Javascript", correct: true },
            { text: "Html", correct: false },
            { text: "Css", correct: false },
            { text: "C#", correct: false },
        ]
    },

    {
        question: "Türkiye'nin en güzel şehri ?",
        answers:[
            { text: "Trabzon", correct: false },
            { text: "Eskişehir", correct: false },
            { text: "İzmir", correct: false },
            { text: "İstanbul ", correct: true },
        ]
    },

    {
        question: "En sevdiğin hayvan ?",
        answers:[
            { text: "Kedi", correct: true },
            { text: "Köpek", correct: false },
            { text: "Ayı", correct: false },
            { text: "Geyik", correct: false },
        ]
    }
];

const questionElement = document.getElementById("question");
const answerButtons = document.getElementById("answer-buttons");
const nextButton = document.getElementById("next-btn");


let currentQuestionIndex = 0;
let score = 0;

function startQuiz(){
    currentQuestionIndex = 0;
    score = 0;
    nextButton.innerHTML = "Next";
    showQuestion();
}

function showQuestion(){
    resetState();
    let currentQuestion = questions[currentQuestionIndex];
    let questionNo = currentQuestionIndex + 1;
    questionElement.innerHTML = questionNo + ". " + currentQuestion.
    question;


    currentQuestion.answers.forEach(answer => {
         const button = document.createElement("button");
         button.innerHTML = answer.text;
         button.classList.add("btn");
         answerButtons.appendChild(button);
         if(answer.correct){
            button.dataset.correct = answer.correct;
         }
         button.addEventListener("click", selectAnswer);
    });
}


function resetState(){
    nextButton.style.display = "none";
    while(answerButtons.firstChild){
        answerButtons.removeChild(answerButtons.firstChild);
    }
}

function selectAnswer(e){
    const selectedBtn = e.target;
    const isCorrect = selectedBtn.dataset.correct === "true";
    if(isCorrect){
        selectedBtn.classList.add("correct");
        score++;
    }else{
        selectedBtn.classList.add("incorrect");
    }

    Array.from(answerButtons.children).forEach(button =>{
        if(button.dataset.correct === "true"){
            button.classList.add("correct");
        }
        button.disabled = true;
    });

    nextButton.style.display = "block";
}

function showScore() {
    resetState();
    questionElement.innerHTML = `You scored ${score} out of ${questions.length}!`;
    nextButton.innerHTML = "Play Again";
    nextButton.style.display = "block";
}


function handleNextButton(){
    currentQuestionIndex++;
    if(currentQuestionIndex < questions.length){
        showQuestion();
    }else{
        showScore();
    }
}

nextButton.addEventListener("click", ()=>{
    if(currentQuestionIndex < questions.length){
        handleNextButton();
    }else{
        startQuiz();
    }
});

startQuiz();