"use strict";
 
const quizData = [
  {
    question: "What does 'var' stand for in JavaScript?",
    options: [
      "Variable",
      "Variant",
      "Virtual",
      "Verbatim",
    ],
    correct: 0,
  },
  {
    question: "Which method adds an element to the end of an array?",
    options: [
      "push()",
      "pop()",
      "shift()",
      "unshift()",
    ],
    correct: 0,
  },
  {
    question: "What is the result of '2' + 2 in JavaScript?",
    options: [
      "4",
      "'22'",
      "NaN",
      "Error",
    ],
    correct: 1,
  },
  {
    question: "What is the purpose of 'use strict' in JavaScript?",
    options: [
      "To enable strict mode",
      "To declare variables",
      "To add comments",
      "To create objects",
    ],
    correct: 0,
  },
  {
    question: "Which keyword declares a block-scoped variable?",
    options: [
      "let",
      "var",
      "function",
      "return",
    ],
    correct: 0,
  },
  {
    question: "What does the isNaN() function check?",
    options: [
      "If a value is NaN",
      "If a value is undefined",
      "If a value is null",
      "If a value is false",
    ],
    correct: 0,
  },
  {
    question: "Which of these is NOT a JavaScript data type?",
    options: [
      "Undefined",
      "Boolean",
      "Class",
      "Number",
    ],
    correct: 2,
  },
  {
    question: "How can you convert a string to an integer in JavaScript?",
    options: [
      "parseInt()",
      "toString()",
      "String()",
      "parseString()",
    ],
    correct: 0,
  },
  {
    question: "Which symbol is used for comments in JavaScript?",
    options: [
      "//",
      "#",
      "/* */",
      "Both // and /* */",
    ],
    correct: 3,
  },
  {
    question: "Which event occurs when a user clicks on an element?",
    options: [
      "onclick",
      "onchange",
      "onmouseclick",
      "onmouseover",
    ],
    correct: 0,
  },
  {
    question: "What is the purpose of JSON.stringify()?",
    options: [
      "Convert a JavaScript object to a string",
      "Parse a string to an object",
      "Read JSON data",
      "Sort JSON data",
    ],
    correct: 0,
  },
  {
    question: "How can you declare a function in JavaScript?",
    options: [
      "function myFunction() {}",
      "def myFunction() {}",
      "function: myFunction() {}",
      "declare function myFunction() {}",
    ],
    correct: 0,
  },
  {
    question: "What does the DOM stand for?",
    options: [
      "Document Object Model",
      "Display Object Management",
      "Digital Object Model",
      "Document Orientation Model",
    ],
    correct: 0,
  },
  {
    question: "What does the map() function do in JavaScript?",
    options: [
      "Iterates and creates a new array",
      "Filters elements in an array",
      "Reduces array to a single value",
      "Finds an element in an array",
    ],
    correct: 0,
  },
  {
    question: "Which statement is used to handle exceptions in JavaScript?",
    options: [
      "try...catch",
      "throw",
      "error...catch",
      "if...else",
    ],
    correct: 0,
  },
];

let currentQuestionIndex = 0;
let score = 0;
 
const questionEl = document.getElementById("question");
const optionsEl = document.getElementById("options");
const progressBarEl = document.getElementById("progress-bar");
const prevBtn = document.getElementById("prev-btn");
const nextBtn = document.getElementById("next-btn");
const scoreContainer = document.getElementById("score-container");
const scoreEl = document.getElementById("score");
const feedbackEl = document.getElementById("feedback");
const restartBtn = document.getElementById("restart-btn");
 
const celebrationPopup = document.getElementById("celebration-popup");

 
function loadQuestion() {
  const currentQuestion = quizData[currentQuestionIndex];
  questionEl.textContent = currentQuestion.question;

  optionsEl.innerHTML = "";
  currentQuestion.options.forEach((option, index) => {
    const optionBtn = document.createElement("div");
    optionBtn.textContent = option;
    optionBtn.classList.add("option");
    optionBtn.addEventListener("click", () => selectOption(index));
    optionsEl.appendChild(optionBtn);
  });

  updateProgressBar();
}

 
function selectOption(selectedIndex) {
  const options = document.querySelectorAll(".option");
  options.forEach((option, index) => {
    option.classList.toggle("selected", index === selectedIndex);
  });

  const currentQuestion = quizData[currentQuestionIndex];
  if (selectedIndex === currentQuestion.correct) {
    score++;
  }
}

 
const updateProgressBar = () => {
  const progress = ((currentQuestionIndex + 1) / quizData.length) * 100;
  progressBarEl.innerHTML = `<div style="width: ${progress}%;"></div>`;
};

 
prevBtn.addEventListener("click", () => {
  if (currentQuestionIndex > 0) {
    currentQuestionIndex--;
    loadQuestion();
  }
});

nextBtn.addEventListener("click", () => {
  if (currentQuestionIndex < quizData.length - 1) {
    currentQuestionIndex++;
    loadQuestion();
  } else {
    showScore();
  }
});

 
function showScore() {
  questionEl.parentElement.classList.add("hidden");
  scoreContainer.classList.remove("hidden");

  scoreEl.textContent = score;
  const feedback =
    score / quizData.length >= 0.8
      ? "Excellent!"
      : score / quizData.length >= 0.5
      ? "Good job!"
      : "Keep Practicing";
  feedbackEl.textContent = feedback;

  if (score / quizData.length >= 0.8) {
    celebrationPopup.classList.add("visible");
  }
}
 
restartBtn.addEventListener("click", () => {
  score = 0;
  currentQuestionIndex = 0;
  scoreContainer.classList.add("hidden");
  questionEl.parentElement.classList.remove("hidden");
  loadQuestion();
});

 
loadQuestion();
