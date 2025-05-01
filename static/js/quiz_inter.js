const questions = [
    {
        question: "GUESS THE SIGN????",
        image: "https://media3.giphy.com/media/DcPfy7StVKeB5dv0ND/giphy.gif?cid=6c09b9526b4ket30jzh8enobi43mtxzgap5g1kevtq13n9i1&ep=v1_internal_gif_by_id&rid=giphy.gif&ct=s",
        options: ["Menu", "Hello", "Sorry", "Good"],
        answer: "Hello"
    },

    {
        question: "GUESS THE SIGN????",
        image: "../static/pics/bye.webp",
        options: ["Good", "Nice", "Bye", "See"],
        answer: "Bye"
    },
    {
        question: "GUESS THE SIGN????",
        image: "../static/pics/please.gif",
        options: ["Please", "Tea", "Library", "Travel"],
        answer: "Please"
    },
    {
        question: "GUESS THE SIGN????",
        image: "../static/pics/sorry.webp",
        options: ["Water", "Nice", "Sorry", "Food"],
        answer: "Sorry"
    },
    {
        question: "GUESS THE SIGN????",
        image: "../static/pics/thankyou.webp",
        options: ["See You", "Thank You", "Ask Me", "Do it"],
        answer: "Thank You"
    },

];

const questionElement = document.getElementById('question');
const optionsElement = document.getElementById('options');
const scoreElement = document.getElementById('scoreValue');
const progressBar = document.getElementById('progressBar');
const quizContainer = document.getElementById('quiz');
let currentQuestionIndex = 0;
let score = 0;
let correctAnswers = 0;
let wrongAnswers = 0;

function loadQuestion(question) {
    questionElement.textContent = question.question;
    optionsElement.innerHTML = '';

    if (question.image) {
        const image = document.createElement('img');
        image.src = question.image;
        image.alt = "Image related to the question";
        image.style.maxWidth = "100%";
        image.style.maxHeight = "220px";
        image.style.marginTop ="-40px";
        optionsElement.appendChild(image);
    }

    question.options.forEach((option, index) => {
        const button = document.createElement('button');
        button.textContent = option;
        button.classList.add('option');
        button.dataset.option = option;
        button.addEventListener('click', () => selectOption(button));
        optionsElement.appendChild(button);
    });

    updateProgressBar();
}

function selectOption(selectedButton) {
    const selectedOption = selectedButton.dataset.option;
    const correctOption = questions[currentQuestionIndex].answer;
    const optionButtons = document.querySelectorAll('.option');

    optionButtons.forEach(button => {
        if (button.dataset.option === correctOption) {
            button.style.backgroundColor = 'green';
        } else {
            button.style.backgroundColor = 'red';
        }
        button.disabled = true;
    });

    if (selectedOption === correctOption) {
        score++;
        correctAnswers++;
        scoreElement.textContent = score;
    } else {
        wrongAnswers++;
    }

    currentQuestionIndex++;
    if (currentQuestionIndex < questions.length) {
        setTimeout(() => {
            loadQuestion(questions[currentQuestionIndex]);
        }, 1000);
    } else {
        showQuizSummary();
    }
}

function updateProgressBar() {
    const progressPercentage = ((currentQuestionIndex + 1) / questions.length) * 100;
    progressBar.style.width = `${progressPercentage}%`;
}

function showQuizSummary() {
    quizContainer.innerHTML = ''; // Clear quiz container

    const summaryBox = document.createElement('div');
    summaryBox.classList.add('summary-box');

    const scoreDisplay = document.createElement('div');
    scoreDisplay.textContent = `Your Score: ${score}`;
    summaryBox.appendChild(scoreDisplay);

    const correctAnswersDisplay = document.createElement('div');
    correctAnswersDisplay.textContent = `Correct Answers: ${correctAnswers}`;
    summaryBox.appendChild(correctAnswersDisplay);

    const wrongAnswersDisplay = document.createElement('div');
    wrongAnswersDisplay.textContent = `Wrong Answers: ${wrongAnswers}`;
    summaryBox.appendChild(wrongAnswersDisplay);

    const compliment = document.createElement('div');
    compliment.classList.add('compliment');
    compliment.textContent = getCompliment(score);
    summaryBox.appendChild(compliment);

    quizContainer.appendChild(summaryBox);
}

function getCompliment(score) {
    if (score === questions.length) {
        return "Perfect! You're a quiz master!";
    } else if (score >= questions.length / 2) {
        return "Well done! You did great!";
    } else {
        return "Nice try! Keep practicing!";
    }
}

loadQuestion(questions[currentQuestionIndex]);
