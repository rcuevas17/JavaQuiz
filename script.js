const startBtn = document.getElementById("start-btn")
const scoreBtn = document.getElementById("score-btn")
const quizContainerEl = document.getElementById("quiz-container")
const timerContainerEl = document.getElementById("timer-container")
const questionEl = document.getElementById("questions")
const answerBtnEl = document.getElementById("li-btn")
const nameEl = document.getElementById("name-entry")
const finalScore = document.getElementById("score")
const submitBtn = document.getElementById("submit-btn")

startBtn.addEventListener("click", startQuiz)

const timerElement= document.querySelector(".timer-count");
const timer, timerCount;
const quizDone = false
const questionIndex= 0;

const score= JSON.parse(localStorage.getItem("scoreBoard")) || [];

// Timer
function quizTimer() {
    timer= setInterval(function(){
        timerCount--;
        timerElement.textContent = timerCount;
            //test if quiz is finished
            if (quizDone || timerCount <= 0) {
                clearInterval(timer);
                quizEnd();
            }
    }, 1000);
}
function startQuiz() {
    startBtn.classList.add("hidden")
    scoreBtn.classList.add("hidden")
    quizContainerEl.classList.remove("hidden")
    timerContainerEl.classList.remove("hidden")
    quizDone = false
    timerCount = 60
    score = 0
    quizTimer()
    displayQuestion()
}

// Questions
function displayQuestion() {
    questionEl.innerText = questions[questionIndex].question
    //removes the previous question
    document.querySelector("#choices").innerHTML = ""
    questions[questionIndex].answer.forEach(function(item){
        const button = document.createElement("button")
        button.innerText = item
        button.setAttribute("class", "btn")
        button.addEventListener("click", checkAnswer)
        document.querySelector("#choices").appendChild(button)
    })
}
function checkAnswer(event){
    var answer = event.target.textContent
    if (answer === questions[questionIndex].correctAnswer){
        score += 25
    }
    else {
        timerCount -= 20
    }
    questionIndex++
    if (questionIndex === questions.length){
        quizDone = true;
        quizEnd()
    }
    else {
        displayQuestion()
    }
}
function quizEnd(){
    quizContainerEl.classList.add("hidden")
    timerContainerEl.classList.add("hidden")
    nameEl.classList.remove("hidden")
    finalScore.innerText = "Your Score: " + score
    showBoard();

    const questions = [
        {
            question: "What should you save your JS files as?",
            answer: [
                 ".html",
                 ".java",
                 ".js",
                 ".script"
            ],
            correctAnswer: ".js"
        },
        {
            question: "What is the correct JavaScript form to write 'Hello World'?",
            answer: [
                 "document.write('Hello World')",
                 "'Hello World'",
                 "document.append('Hello World')",
                 "(Hello World)"
            ],
            correctAnswer: "document.write('Hello World')"
        },
        {
            question: "Where is the correct place to insert a JavaScript?",
            answer: [
                 "In <head> section and <body>",
                 "In <body> section",
                 "In <head> section",
                 "In <footer> section"
            ],
            correctAnswer: "In <head> section and <body>"
        },
        {
            question: "How do join two different in context?",
            answer: [
                 "append",
                 "join",
                 "combine",
                 "Ask tucker"
            ],
            correctAnswer: "append"
        },
    ]