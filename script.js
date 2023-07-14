const questions = [
    {
        question: "Chatrapati Shivaji Maharaj was born on?",
        answers:[
            {text: "19 Feb 1630-Shivneri",correct: true},
            {text: "16 Feb 1629-Raigad",correct: false},
            {text: "19 Feb 1638-Torna",correct: false},
            {text: "11 Feb 1635-Shivneri",correct: false},
        ]
    },
    {
        question: "Bhagat singh died when and where?",
        answers:[
            {text: "23-March-1934, Tihar Jail Delhi",correct: false},
            {text: "23-June-1931, Lahore Central Jail",correct: true},
            {text: "23-March-1933, Yerwada Jail, Maharashtra",correct: false},
            {text: "23-August-1931, Madras Central Jail, Chennai",correct: false},
        ]
    },
    {
        question: "What was the name of Subhash Chandra Bose's Army?",
        answers:[
            {text: "Azad Hind Fauj",correct: true},
            {text: "Azad Hind Sena",correct: false},
            {text: "Bose Hind Fauj",correct: false},
            {text: "Gumnaam Hind Fauj",correct: false},
        ]
    },
    {
        question: "What was the name of first Indian missile?",
        answers:[
            {text: "Trishul",correct: false},
            {text: "Barak 8",correct: false},
            {text: "Agni 1",correct: false},
            {text: "Prithvi",correct: true},
        ] 
    },
    {
        question: "Who was the writer of Mahabharat?",
        answers:[
            {text: "Mahakavi Tulsidas",correct: false},
            {text: "Valmiki",correct: false},
            {text: "Ved Vyas",correct: true},
            {text: "Shukracharya",correct: false},
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
    questionElement.innerHTML = questionNo + ". " + currentQuestion.question;

    currentQuestion.answers.forEach(answer => {
        const button = document.createElement("button");
        button.innerHTML = answer.text;
        button.classList.add("btn");
        answerButtons.appendChild(button);
        if(answer.correct){
            button.dataset.correct = answer.correct;
        }
        button.addEventListener("click",selectAnswer);
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
    const isCorrect = selectedBtn.dataset.correct == "true";
    if(isCorrect){
        selectedBtn.classList.add("correct");
        score++;
    }else{
        selectedBtn.classList.add("incorrect");
    }
    Array.from(answerButtons.children).forEach(button => {
        if(button.dataset.correct === "true"){
            button.classList.add("correct");
        }
        button.disabled = true;
    });
    nextButton.style.display = "block";
}

function showScore(){
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
})

startQuiz();