const questions = [
    {
        question: "GUESS THE SIGN????",
        image: "../static/pics/iamfine.gif",
        options: ["Done Done", "Eat Your Lunch", "I am Fine", "Do ur work"],
        answer: "I am Fine"
    },

    {
        question: "GUESS THE SIGN????",
        image: "../static/pics/areyouok.gif",
        options: ["Are you OK", "Nice work", "Bye Bye", "See u soon"],
        answer: "Are you OK"
    },
    {
        question: "GUESS THE SIGN????",
        image: "../static/pics/iamgoinghome.gif",
        options: ["Please Say", "Tea Time", "I am going Home", "Travel Buddies"],
        answer: "I am going Home"
    },
    {
        question: "GUESS THE SIGN????",
        image: "../static/pics/seeyoutomorrow.gif",
        options: ["Water Break", "Nice Work", "Sorry For this", "See you Tomorrow"],
        answer: "See you Tomorrow"
    },
    {
        question: "GUESS THE SIGN????",
        image: "../static/pics/howareyou.gif",
        options: ["How are You", "Thank You", "Ask Me again", "Did it nice"],
        answer: "How are You"
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
        image.style.maxHeight = "230px";
        image.style.marginTop ="-20px";
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
