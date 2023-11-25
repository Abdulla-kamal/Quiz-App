// Select Elements
let quizApp = document.querySelector(".quiz-app");
let questionsCount = document.querySelector(".count span");
let bullets = document.querySelector(".bullets");
let bulletsSpans = document.querySelector(".bullets .spans");
let question = document.querySelector(".quiz-area");
let answersArea = document.querySelector(".answers-area");
let button = document.querySelector(".submit");
let resultsContainer = document.querySelector(".results");
let countDownInt = document.querySelector(".countDown");
let category = document.querySelector(".quiz-app .category span")
let current = 0;
let rightAnswer = 0;
let countDaownInterval;




function getQuestions(url) {
  const myRequest = new XMLHttpRequest();

  myRequest.onreadystatechange = function () {
    if (this.readyState === 4 && this.status === 200) {
      // get the questions
      let questionsObj = JSON.parse(this.responseText);
      numberOfQuestions = questionsObj.length;
      createBullets(numberOfQuestions);
      addQuestionData(questionsObj[current], numberOfQuestions);
      
      // Start CountDown 
      countDown(30, numberOfQuestions)
      button.onclick = (_) => {
        checkAnswer(questionsObj[current].right_answer, numberOfQuestions);
        current++;
        question.innerHTML = "";
        answersArea.innerHTML = "";
        addQuestionData(questionsObj[current], numberOfQuestions);
        // create hundle bullets
        hundleBullets();
        // Show The Results
        showResult(numberOfQuestions);
        // Start CountDown 
        clearInterval(countDaownInterval);
        countDown(3, numberOfQuestions);
      };
    }
  };
  
  myRequest.open("GET", url, true);
  myRequest.send();
}


function createBullets(num) {
  questionsCount.innerHTML = num;
  for (let i = 0; i < num; i++) {
    // create span
    let span = document.createElement("span");
    
    // check if  first span
    if (i === 0) {
      span.className = "on";
    }
    
    //append span to bullets
    bulletsSpans.appendChild(span);
  }
}

function addQuestionData(obj, count) {
  if (current < count) {
    // Create h2 question
    let h2 = document.createElement("h2");
    
    // Create Text Question
    let questionText = document.createTextNode(`${obj["title"]} ?`);

    // Append Text To h2
    h2.appendChild(questionText);

    // Append Question h2 To Quiz Area
    question.appendChild(h2);
    
    for (let i = 1; i <= 4; i++) {
      // Create Main Div
      let mainDiv = document.createElement("div");
      mainDiv.className = "answer";
      
      // Create Input radion
      let input = document.createElement("input");
      
      // Add Attributes type + name + id + data-set
      input.type = "radio";
      input.name = "question";
      input.id = `answer_${i}`;
      input.dataset.data = obj[`answer_${i}`];
      
      if (i === 1) {
        input.checked = true;
      }
      // Create Lable
      let label = document.createElement("label");
      let labelContent = document.createTextNode(obj[`answer_${i}`]);
      label.appendChild(labelContent);
      
      // Add For  Attribute
      label.htmlFor = `answer_${i}`;
      
      // Append input and lable To mainDiv
      mainDiv.appendChild(input);
      mainDiv.appendChild(label);
      
      //Appen main div To area anwers
      answersArea.append(mainDiv);
    }
  }
}

function checkAnswer(rAnswer, qCount) {
  let answers = document.getElementsByName("question");
  let chosenAnswer;
  
  for (let i = 0; i < answers.length; i++) {
    if (answers[i].checked) {
      chosenAnswer = answers[i].dataset.data;
    }
  }
  if (chosenAnswer === rAnswer) {
    rightAnswer++;
  }
}

function hundleBullets() {
  let allSPans = document.querySelectorAll(".bullets .spans span");
  let arrayOfSpans = Array.from(allSPans);
  arrayOfSpans.forEach((span, index) => {
    if (current === index) {
      span.className = "on";
    }
  });
}

function showResult(qNumber) {
  let theResults;
  if (current === qNumber) {
    question.remove();
    answersArea.remove();
    button.remove();
    bullets.remove();
    if (rightAnswer > qNumber / 2 && rightAnswer < qNumber) {
      theResults = `<span class = "good" style="text-decoration:underline; text-decoration-style:wavy; text-decoration-color:rgb(47, 234, 47)">Good</span> ${rightAnswer} From ${qNumber}`;
    } else if (rightAnswer <= qNumber / 2) {
      theResults = `<span class = "bad" style="text-decoration:underline; text-decoration-style:wavy; text-decoration-color:"red">Bad</span> ${rightAnswer} From ${qNumber}`;
    } else {
      theResults = `<span class = "perfect" style="text-decoration:underline; text-decoration-style:wavy; text-decoration-color:#0078ff">Perfect</span> ${rightAnswer} From ${qNumber}`;
    }
    resultsContainer.innerHTML = theResults;
    resultsContainer.style.padding = "20px";
    resultsContainer.style.marginTop = "20px";
    resultsContainer.style.fonrSize = "30px";
    resultsContainer.style.textAlign = "center";
  }
}
function countDown(duration, count) {
  if (current < count) {
    let minutes, seconds;
    countDaownInterval = setInterval(() => {
      minutes = parseInt(duration / 60);
      seconds = parseInt(duration % 60);
      
      minutes = minutes < 10 ? `0${minutes}` : minutes;
      seconds = seconds < 10 ? `0${seconds}` : seconds;
      
      countDownInt.innerHTML = `${minutes}:${seconds}`
      
      if(--duration < 0) {
        clearInterval(countDaownInterval);
        button.click();
      }
    }, 1000);
  }
}



// Create Letter Choosing
let mainDiv = document.createElement("div");
mainDiv.className = "buttons";
let buttonHtml = document.createElement("button");
buttonHtml.innerHTML = "HTML";
let buttonCss = document.createElement("button");
buttonCss.innerHTML = "CSS";


window.onload = _=> {
  mainDiv.appendChild(buttonHtml)
  mainDiv.appendChild(buttonCss)
  document.body.appendChild(mainDiv)
  document.body.style.position = "relative";
  mainDiv.style.position = "absolute";
  mainDiv.style.left = "50%";
  mainDiv.style.top = "50%";
  mainDiv.style.transform = "translate(-50%, -50%)";
  mainDiv.style.background = "lightblue";
  mainDiv.style.width = "50%";
  mainDiv.style.height = "50%";
  mainDiv.style.display = "flex";
  mainDiv.style.justifyContent = "center";
  mainDiv.style.alignItems = "center";
  mainDiv.style.gap = "20px";
  buttonHtml.style.padding = "15px 20px";
  buttonCss.style.padding = "15px 20px";
  buttonHtml.style.borderRadius = "6px";
  buttonCss.style.borderRadius = "6px";
  buttonHtml.style.border = "none";
  buttonCss.style.border = "none";
  
}
buttonHtml.addEventListener("click", _=> {
  getQuestions("HTML.json");
  category.innerHTML = buttonHtml.innerHTML;
  mainDiv.remove()
})
buttonCss.addEventListener("click", _=> {
  getQuestions("CSS.json");
  category.innerHTML = buttonCss.innerHTML;
  mainDiv.remove()
})