const quistions = [
    {
        quistion: "Which is largest animal in the world?",
        answers: [
            {text: "shark", correct: false},
            {text: "Blue whale", correct: true},
            {text: "Elephant", correct: false},
            {text: "Giraffe", correct: false}
        ]
    },
    {
        quistion: "Which is largest Occan in the world?",
        answers: [
            {text: "Atlantic", correct: false},
            {text: "North-occan", correct: false},
            {text: "Pacific", correct: true},  
            {text: "Indian-occan", correct: false}
        ]
    },
    {
        quistion: "Which is largest City in the world?",
        answers: [
            {text: "Dhaka", correct: false},
            {text: "New-York", correct: false},
            {text: "Mumbai", correct: false},
            {text: "London", correct: true}
        ]
    },
    {
        quistion: "Which is smallest country in the world?",
        answers: [
            {text: "Bhutan", correct: false},
            {text: "Maldives", correct: false},
            {text: "Vatican-city", correct: true},
            {text: "Cosovo", correct: false}
        ]
    },
    {
        quistion: "What is your favorite food?",
        answers: [
            {text: "Beef", correct: true},
            {text: "Matton", correct: false},
            {text: "Chicken", correct: false},
            {text: "Fish", correct: false}
        ]
    }  
];

const quistionElement = document.querySelector("#quistion");
const answerButton = document.querySelector("#answer-buttons");
const nextButton = document.querySelector("#next-btn");

let currentQuestionIndex = 0;
let score = 0;

function startQuiz() {
    currentQuestionIndex = 0;
    score = 0;
    nextButton.innerHTML = "Next";
    ShowQuestion();
};

function ShowQuestion() {
    resetState();
    let currentQuestion = quistions[currentQuestionIndex];
    let quistionNo = currentQuestionIndex + 1;
    quistionElement.innerHTML = quistionNo + ". " + currentQuestion.quistion;
    
    currentQuestion.answers.map(answer => {
        const button = document.createElement("button");
        button.innerHTML = answer.text;
        button.classList.add("btn");
        answerButton.appendChild(button);
        if(answer.correct) {
            button.dataset.correct = answer.correct;
        }
        button.addEventListener("click", selectAnswer);
    });
};

function resetState() {
    nextButton.style.display = "none";
    while(answerButton.firstChild) {
        answerButton.removeChild(answerButton.firstChild)
    }

};

function selectAnswer(e) {
    const selectedButton = e.target;
    const isCorrect = selectedButton.dataset.correct === "true";
    if(isCorrect) {
        selectedButton.classList.add("correct");
        score++;
    } else {
        selectedButton.classList.add("incorrect");
    };

    Array.from(answerButton.children).map(button => {
        if(button.dataset.correct === "true") {
            button.classList.add("correct");
        }
        button.disabled = true;
    });
    nextButton.style.display = "block";
};

function showScore() {
    resetState();
    quistionElement.innerHTML = `You scored ${score} out of ${quistions.length}`
    nextButton.innerHTML = "Play Again";
    nextButton.style.display = "block"
}


function handleNextButton() {
    currentQuestionIndex++;
    if(currentQuestionIndex < quistions.length) {
        ShowQuestion();
    } else {
       showScore();
    }
};


nextButton.addEventListener("click", () => {
    if(currentQuestionIndex < quistions.length) {
        handleNextButton();
    } else {
        startQuiz();
    }
});

startQuiz();