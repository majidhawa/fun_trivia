// Variables
const category = document.getElementById("category");
const difficulty = document.getElementById("difficulty");
const questions = document.getElementById("question-amount");
const startBtn = document.getElementById("start-btn");
const mainContainer = document.querySelector(".main-container");
var score = 0;
// Event Listeners
startBtn.addEventListener("click", QuizSettings);
// Function
function QuizSettings() {
    let setCategory = category.value;
    let setDifficulty = difficulty.value;
    let setQuestions = questions.value;
    // Dropdown Check
    let gameCondition = true;
    let settingsArray = [setCategory, setDifficulty, setQuestions];
    let stylesArray = [category, difficulty, questions];
    for (let i = 0; i < 3; i++) {
        if (settingsArray[i].includes("Select")) {
            stylesArray[i].style.background = "#831818";
            stylesArray[i].style.paddingLeft = "2rem";
            gameCondition = false;
            setTimeout(animate, 600);
        } else stylesArray[i].style.background = "#2E2E52";
    }
    function animate() {
        category.style.paddingLeft = "1rem";
        difficulty.style.paddingLeft = "1rem";
        questions.style.paddingLeft = "1rem";
    }
    if (gameCondition == false) {
        return;
    } else StartQuiz(setQuestions, setCategory, setDifficulty);
}
// Quiz Starts
function StartQuiz(questions, category, difficulty) {
    // Remove Settings Container
    let container = document.querySelector(".game-settings");
    container.style.opacity = 0;
    setTimeout(() => {
        document.querySelector(".game-settings").remove();
    }, 1000);
    // Add scoreboard
    let scoreboard = document.createElement("p");
    scoreboard.id = "scoreboard";
    document.body.appendChild(scoreboard);
    // Hide container
    mainContainer.style.opacity = 0;
    mainContainer.style.transform = "rotateX(50deg)";
    // Fetch Request
    setTimeout(() => {
        fetch(
            `https://opentdb.com/api.php?amount=${questions}&category=${category}&difficulty=${difficulty}`
        )
            .then((response) => response.json())
            .then((data) => {
                //
                let length = 0;
                NewQuestion(data, length);
                // New <button> = Submit Answer
                let submitBtn = document.createElement("button");
                submitBtn.innerText = "Next";
                submitBtn.id = "submit-btn";
                mainContainer.appendChild(submitBtn);
                submitBtn.addEventListener("click", () => {
                    // Make sure an option is selected
                    if (document.querySelectorAll(".option")) {
                        let elm = document.querySelectorAll(".option");
                        let optionSelected = false;
                        for (let i = 0; i < elm.length; i++) {
                            if (elm[i].style.paddingLeft == "3rem") {
                                submitBtn.style.background = "none";
                                submitBtn.style.color = "black";
                                optionSelected = true;
                            }
                        }
                        if (optionSelected == false) {
                            submitBtn.style.background = "#831818";
                            submitBtn.style.color = "white";
                            submitBtn.style.width = "180px";
                            setTimeout(() => {
                                submitBtn.style.width = "140px";
                            }, 300);
                            return;
                        }
                    }
                    // Get Question and Check if game over
                    length++;
                    NewQuestion(data, length);
                    CheckGameEnd(length, questions);
                    // Hide container
                });
            });
    }, 1000);
}
function NewQuestion(data, length) {
    // Remove old question if it exists
    var elm = document.querySelector("h2");
    if (elm) elm.remove();
    // Remove all old options
    while (mainContainer.children.length > 1)
        mainContainer.removeChild(mainContainer.firstChild);
    if (length < data.results.length) {
        // Codes -> Puntuation
        let quizQueston = data.results[length].question;
        if (quizQueston.includes("&quot;"))
            quizQueston = quizQueston.replaceAll("&quot;", '"');
        if (quizQueston.includes("&#039;"))
            quizQueston = quizQueston.replaceAll("&#039;", "'");
        let correctAnswer = data.results[length].correct_answer;
        let AnswersArray = [
            data.results[length].incorrect_answers,
            data.results[length].correct_answer,
        ].flat();
        AnswersArray.sort(() => Math.random() - 0.5);
        for (let i = 0; i < AnswersArray.length; i++) {
            // New <div>
            let option = document.createElement("div");
            option.classList.add("option");
            // New <p> inside of Div
            let para = document.createElement("p");
            para.innerText = AnswersArray[i];
            option.prepend(para);
            // Check Answer Event Listener
            option.addEventListener("click", (e) => {
                CheckAnswer(e, correctAnswer, data);
            });
            mainContainer.prepend(option);
        }
        // New <h2> = Question
        let title = document.createElement("h2");
        title.textContent = quizQueston;
        mainContainer.prepend(title);
        // show main container
        mainContainer.style.opacity = 1;
        mainContainer.style.transform = "rotateX(0deg)";
    }
}
function CheckAnswer(e, answer, data) {
    let ChosenAnswer = e.target.innerText;
    let element = e.target;
    element.style.color = "white";
    if (ChosenAnswer == answer) {
        element.style.paddingLeft = "3rem";
        element.style.background = "#2CAB4E";
        score++;
        scoreboard.innerText = "Your Score: " + score + "/" + data.results.length;
    } else {
        element.style.background = "#831818";
        element.style.paddingLeft = "1rem";
        setTimeout(() => {
            element.style.paddingLeft = "3rem";
        }, 300);
    }
    // Remove abiblity to click once answer is found on options
    let removeOptions = document.querySelectorAll(".option");
    for (let i = 0; i < removeOptions.length; i++) {
        removeOptions[i].style.pointerEvents = "none";
        // Show correct answer
        if (removeOptions[i].innerText == answer) {
            setTimeout(() => {
                removeOptions[i].style.paddingLeft = "3rem";
                removeOptions[i].style.background = "#2CAB4E";
                scoreboard.innerText =
                    "Your Score: " + score + "/" + data.results.length;
            }, 500);
        }
    }
}
function CheckGameEnd(length, questions) {
    // return if not answered all qeustions
    if (length != questions) return;
    // else remove button
    mainContainer.removeChild(mainContainer.lastChild);
    // Move scoreboard into container
    let scoreboard = document.getElementById("scoreboard");
    scoreboard.remove();
    //
    let title = document.createElement("h2");
    let percentage = (score / length) * 100;
    percentage = Math.round(percentage);
    if (percentage === 0) {
        title.innerText = "Unlucky maybe you can get one right next time.";
    } else if (percentage < 25) {
        title.innerText = `Only ${percentage}%, not great is it?`;
    } else if (percentage > 25 && percentage < 50) {
        title.innerText = `Not bad, you got ${percentage}% correct.`;
    } else if (percentage > 50 && percentage < 75) {
        title.innerText = `${percentage}% is pretty impressive.`;
    } else if (percentage > 75 && percentage < 99) {
        title.innerText = `wow, you must really be trying, ${percentage}% is a great score.`;
    } else {
        title.innerText = `You got ${percentage}% of questiosn correct. You want a medal?`;
    }
    // Restart/Refresh page button
    let refresh = document.createElement("button");
    refresh.innerText = "Play again!";
    refresh.id = "restart-btn";
    refresh.addEventListener("click", () => {
        location.reload();
    });
    /// Append items to dom
    mainContainer.appendChild(scoreboard);
    mainContainer.appendChild(title);
    mainContainer.appendChild(refresh);
}