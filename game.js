let questions = [
    {
        question: 'Which HTML tag is used to define an inline style?',
        choice1: '<script>',
        choice2: '<css>',
        choice3: '<style>',
        choice4: '<span>',
        answer: 3,
    },
    {
        question: 'Which property is used to change the text color in CSS?',
        choice1: 'text-color',
        choice2: 'font-color',
        choice3: 'text-style',
        choice4: 'color',
        answer: 4,
    },
    {
        question: 'Which of the following is the correct way to comment in HTML?',
        choice1: '// Comment',
        choice2: '<!-- Comment -->',
        choice3: '/* Comment */',
        choice4: '<! Comment>',
        answer: 2,
    },
];

let currentQuestionIndex = 0;
let score = 0;
let availableQuestions = [...questions];

const questionText = document.getElementById("question-text");
const options = Array.from(document.getElementsByClassName("option"));
const questionNumberText = document.querySelector(".question-number");
const scoreText = document.querySelector(".score-number");
const progressBar = document.getElementById("progress-bar");
const totalQuestions = questions.length;

const loadNewQuestion = () => {
    if (availableQuestions.length === 0 || currentQuestionIndex >= totalQuestions) {
        localStorage.setItem("mostRecentScore", score);
        return window.location.assign("end.html");
    }

    currentQuestionIndex++;
    questionNumberText.innerText = `${currentQuestionIndex}/${totalQuestions}`;
    updateProgressBar();

    const questionIndex = Math.floor(Math.random() * availableQuestions.length);
    currentQuestion = availableQuestions[questionIndex];
    questionText.innerText = currentQuestion.question;

    options.forEach((option, index) => {
        const optionNumber = index + 1;
        option.querySelector(".box").innerText = currentQuestion[`choice${optionNumber}`];
        option.dataset["number"] = optionNumber;
    });

    availableQuestions.splice(questionIndex, 1);
};

const updateProgressBar = () => {
    const progressPercentage = (currentQuestionIndex / totalQuestions) * 100;
    progressBar.style.width = `${progressPercentage}%`;
};

options.forEach((option) => {
    option.addEventListener("click", (e) => {
        const selectedOption = e.currentTarget;
        const selectedAnswer = selectedOption.dataset["number"];

        if (selectedAnswer == currentQuestion.answer) {
            score += 10;
            selectedOption.classList.add("correct");
        } else {
            selectedOption.classList.add("incorrect");
        }

        scoreText.innerText = score;

        setTimeout(() => {
            selectedOption.classList.remove("correct", "incorrect");
            loadNewQuestion();
        }, 1000);
    });
});

loadNewQuestion();
