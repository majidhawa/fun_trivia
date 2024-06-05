
// Variables
const categoryElement = document.getElementById("category");
const difficultyElement = document.getElementById("difficulty");
const questionsElement = document.getElementById("question-amount");
const startButton = document.getElementById("start-btn");
const mainContainerElement = document.querySelector(".main-container");
let score = 0;

// Event Listeners
startButton.addEventListener("click", quizSettings);

// Function
function quizSettings() {
    let setCategory = categoryElement.value;
    let setDifficulty = difficultyElement.value;
    let setQuestions = questionsElement.value;
    // Dropdown Check


const category = document.getElementById("category");
const difficulty = document.getElementById("difficulty");
const questions = document.getElementById("question-amount");
const startBtn = document.getElementById("start-btn");
const mainContainer = document.querySelector(".main-container");
var score = 0;

startBtn.addEventListener("click", QuizSettings);

function QuizSettings() {
    let setCategory = category.value;
    let setDifficulty = difficulty.value;
    let setQuestions = questions.value;


    let gameCondition = true;
    let settingsArray = [setCategory, setDifficulty, setQuestions];
    let stylesArray = [categoryElement, difficultyElement, questionsElement];
    for (let i = 0; i < 3; i++) {
        if (settingsArray[i].includes("Select")) {
            stylesArray[i].style.background = "#831818";
            
            gameCondition = false;
           
        } else stylesArray[i].style.background = "#2E2E52";
    }
    
    if (gameCondition == false) {
        return;
    } else startQuiz(setQuestions, setCategory, setDifficulty);
}


function startQuiz(questions, category, difficulty) {

function StartQuiz(questions, category, difficulty) {
    

    let container = document.querySelector(".game-settings");
    container.style.opacity = 0;
    setTimeout(() => {
        document.querySelector(".game-settings").remove();
    }, 1000);
  
    let scoreboard = document.createElement("p");
    scoreboard.id = "scoreboard";
    document.body.appendChild(scoreboard);

    // Hide container
    mainContainerElement.style.opacity = 0;
    mainContainerElement.style.transform = "rotateX(50deg)";
    // Fetch Request

 
    mainContainer.style.opacity = 0;
    mainContainer.style.transform = "rotateX(50deg)";
 

    setTimeout(() => {
        fetch(
            `https://opentdb.com/api.php?amount=${questions}&category=${category}&difficulty=${difficulty}`
        )

          .then((response) => response.json())
          .then((data) => {
                //
                let length = 0;
                newQuestion(data, length);
                // New <button> = Submit Answer
                let submitButton = document.createElement("button");
                submitButton.innerText = "Next";
                submitButton.id = "submit-btn";
                mainContainerElement.appendChild(submitButton);
                submitButton.addEventListener("click", () => {
 
            .then((response) => response.json())
            .then((data) => {
                
                let length = 0;
                NewQuestion(data, length);
               
                let submitBtn = document.createElement("button");
                submitBtn.innerText = "Next";
                submitBtn.id = "submit-btn";
                mainContainer.appendChild(submitBtn);
                submitBtn.addEventListener("click", () => {
                    

                    if (document.querySelectorAll(".option")) {
                        let elm = document.querySelectorAll(".option");
                        let optionSelected = false;
                        for (let i = 0; i < elm.length; i++) {
                            if (elm[i].style.paddingLeft == "3rem") {
                                submitButton.style.background = "none";
                                submitButton.style.color = "black";
                                optionSelected = true;
                            }
                        }
                        if (optionSelected == false) {
                            submitButton.style.background = "#831818";
                            submitButton.style.color = "white";
                            submitButton.style.width = "180px";
                            setTimeout(() => {
                                submitButton.style.width = "140px";
                            }, 300);
                            return;
                        }
                    }
                   
                    length++;

                    newQuestion(data, length);
                    checkGameEnd(length, questions);
                    // Hide container

                    NewQuestion(data, length);
                    CheckGameEnd(length, questions);
                

                });
            });
    }, 1000);
}


function newQuestion(data, length) {
    // Remove old question if it exists
    var elm = document.querySelector("h2");
    if (elm) elm.remove();
    // Remove all old options
    while (mainContainerElement.children.length > 1)
        mainContainerElement.removeChild(mainContainerElement.firstChild);
    if (length < data.results.length) {
        // Codes -> Punctuation
        let quizQuestion = data.results[length].question;
        if (quizQuestion.includes("&quot;"))
            quizQuestion = quizQuestion.replaceAll("&quot;", '"');
        if (quizQuestion.includes("&#039;"))
            quizQuestion = quizQuestion.replaceAll("&#039;", "'");

function NewQuestion(data, length) {
  
    var elm = document.querySelector("h2");
    if (elm) elm.remove();
   
    while (mainContainer.children.length > 1)
        mainContainer.removeChild(mainContainer.firstChild);
    if (length < data.results.length) {
      
        let quizQueston = data.results[length].question;
        if (quizQueston.includes("&quot;"))
            quizQueston = quizQueston.replaceAll("&quot;", '"');
        if (quizQueston.includes("&#039;"))
            quizQueston = quizQueston.replaceAll("&#039;", "'");

        let correctAnswer = data.results[length].correct_answer;
        let answersArray = [
            data.results[length].incorrect_answers,
            data.results[length].correct_answer,
        ].flat();

        answersArray.sort(() => Math.random() - 0.5);
        for (let i = 0; i < answersArray.length; i++) {
            // New <div>

        AnswersArray.sort(() => Math.random() - 0.5);
        for (let i = 0; i < AnswersArray.length; i++) {
           

            let option = document.createElement("div");
            option.classList.add("option");
          
            let para = document.createElement("p");
            para.innerText = answersArray[i];
            option.prepend(para);
           
            option.addEventListener("click", (e) => {
                checkAnswer(e, correctAnswer, data);
            });
            mainContainerElement.prepend(option);
        }
     
        let title = document.createElement("h2");

        title.textContent = quizQuestion;
        mainContainerElement.prepend(title);
        // show main container
        mainContainerElement.style.opacity = 1;
        mainContainerElement.style.transform = "rotateX(0deg)";
        title.textContent = quizQueston;
        mainContainer.prepend(title);
     
        mainContainer.style.opacity = 1;
        mainContainer.style.transform = "rotateX(0deg)";

    }
}

function checkAnswer(e, answer, data) {
    let chosenAnswer = e.target.innerText;
    let element = e.target;
    element.style.color = "white";
    if (chosenAnswer == answer) {
        element.style.paddingLeft = "3rem";
        element.style.background = "#2CAB4E";
        score++;
        scoreboard.innerText = "Your Score: " + score + "/" + data.results.length;
    } else {
        element.style.background = "#831818";
        element.style.paddingLeft = "1rem";
    }

    // Remove ability to click once answer is found on options


    let removeOptions = document.querySelectorAll(".option");
    for (let i = 0; i < removeOptions.length; i++) {
        removeOptions[i].style.pointerEvents = "none";
        
        if (removeOptions[i].innerText == answer) {

                removeOptions[i].style.paddingLeft = "3rem";
                removeOptions[i].style.background = "#2CAB4E";
                scoreboard.innerText =
                    "Your Score: " + score + "/" + data.results.length;
            ;
        }
    }
}


function checkGameEnd(length, questions) {
    // return if not answered all questions
    if (length!= questions) return;
    // else remove button
    mainContainerElement.removeChild(mainContainerElement.lastChild);
    // Move scoreboard into container

function CheckGameEnd(length, questions) {
  
    if (length != questions) return;
 
    mainContainer.removeChild(mainContainer.lastChild);

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
        title.innerText = `You got ${percentage}% of questions correct. You want a medal?`;
    }
   
    let refresh = document.createElement("button");
    refresh.innerText = "Play again!";
    refresh.id = "restart-btn";
    refresh.addEventListener("click", () => {
        location.reload();
    });

    /// Append items to DOM
    mainContainerElement.appendChild(scoreboard);
    mainContainerElement.appendChild(title);
    mainContainerElement.appendChild(refresh);
}

  
    mainContainer.appendChild(scoreboard);
    mainContainer.appendChild(title);
    mainContainer.appendChild(refresh);
}

