const FULL_DASH_ARRAY = 283;
const WARNING_THRESHOLD = 10;
const ALERT_THRESHOLD = 5;
var correct = false;
var question = 1;
var score = 0;

const COLOR_CODES = {
  info: {
    color: "green"
  },
  warning: {
    color: "orange",
    threshold: WARNING_THRESHOLD
  },
  alert: {
    color: "red",
    threshold: ALERT_THRESHOLD
  }
};
const easy = {
  title: 'easy',
  questions: [
  {
    question: `<p class="subtitle">Given an array of integers
    <code>nums</code> and an integer <code>target</code>,
    return indicies of the two <code>numbers</code> such that they add up to
    <code>target</code></p>
    <p class="subtitle">You may assume that each input would have exactly one solution,
    and you may not use the same element twice.</p>
    <p class="subtitle">You can return the answer in any order.</p>`,
    outline: `/**
 * @param {number[]} nums
 * @param {number} target
 * @return {number[]}
 */
var twoSum = function(nums, target) {

};`,
    test: `twoSum([2,7,11,15], 9)`,
    answer: `0,1`
  },
  {
    question: `<p class="subtitle">Given a 32-bit signed integer, reverse digets of an integer.</p>
    <p class="subtitle">Assume we are dealing with an environment that could only store integers
    within the 32-bit signed integer range: [−2<sup>31</sup>,  2<sup>31</sup> − 1]. For the purpose
    of this problem, assume that your function returns 0 when the reversed integer overflows.</p>`,
    outline: `/**
 * @param {number} x
 * @return {number}
 */
var reverse = function(x) {

};`,
    test: `reverse(123)`,
    answer: `321`
  },
  {
    question: `<p class="subtitle">Roman numerals are represented by seven different symbols:
    <code>I</code>, <code>V</code>, <code>X</code>, <code>L</code>, <code>C</code>,
    <code>D</code> and <code>M</code>.</p> <p class="subtitle">For example, 2 is
    written as <code>II</code> in Roman numeral, just two one's added together.
    12 is written as <code>XII</code>, which is simply <code>X</code> + <code>II</code>.
    The number 27 is written as <code>XXVII</code>, which is <code>XX</code> + <code>V</code> + <code>II</code>.</p>
    <p class="subtitle">Given a roman numeral, convert it to an integer.</p>`,
    outline: `/**
 * @param {string} s
 * @return {number}
 */
var romanToInt = function(s) {

};`,
    test: `romanToInt('IX')`,
    answer: `9`
  },
  {
    question: `<p class="subtitle">Determine whether an integer is a palindrome.
    An integer is a palindrome when it reads the same backward as forward.</p>`,
    outline: `/**
 * @param {number} x
 * @return {boolean}
 */
var isPalindrome = function(x) {

};`,
    test: `isPalindrome(121)`,
    answer: `true`
  },
  {
    question: `<p class="subtitle">Write a function to find the longest common
    prefix string amongst an array of strings.</p><p class="subtitle">
    If there is no common prefix, return an empty string <code>""</code>.</p>`,
    outline: `/**
 * @param {string[]} strs
 * @return {string}
 */
var longestCommonPrefix = function(strs) {

};`,
    test: `longestCommonPrefix(["flower","flow","flight"])`,
    answer: `fl`
  }
]};

const medium = [
  {

  }
];

const hard = [
  {

  }
];

function $(selector) {
  return document.querySelector(selector);
}

const TIME_LIMIT = 180;
let timePassed = 0;
let timeLeft = TIME_LIMIT;
let timerInterval = null;
let remainingPathColor = COLOR_CODES.info.color;

function onTimesUp() {
  clearInterval(timerInterval);
  $('#robot').classList.add('shake');
  finishQuiz();
}

function startTimer() {
  timerInterval = setInterval(() => {
    timePassed = timePassed += 1;
    timeLeft = TIME_LIMIT - timePassed;
    document.getElementById("base-timer-label").innerHTML = formatTime(
      timeLeft
    );
    setCircleDasharray();
    setRemainingPathColor(timeLeft);

    if (timeLeft === 0) {
      onTimesUp();
    }
  }, 1000);
}

function formatTime(time) {
  const minutes = Math.floor(time / 60);
  let seconds = time % 60;

  if (seconds < 10) {
    seconds = `0${seconds}`;
  }

  return `${minutes}:${seconds}`;
}

function setRemainingPathColor(timeLeft) {
  const { alert, warning, info } = COLOR_CODES;
  if (timeLeft <= alert.threshold) {
    document
      .getElementById("base-timer-path-remaining")
      .classList.remove(warning.color);
    document
      .getElementById("base-timer-path-remaining")
      .classList.add(alert.color);
  } else if (timeLeft <= warning.threshold) {
    document
      .getElementById("base-timer-path-remaining")
      .classList.remove(info.color);
    document
      .getElementById("base-timer-path-remaining")
      .classList.add(warning.color);
  }
}

function calculateTimeFraction() {
  const rawTimeFraction = timeLeft / TIME_LIMIT;
  return rawTimeFraction - (1 / TIME_LIMIT) * (1 - rawTimeFraction);
}

function setCircleDasharray() {
  const circleDasharray = `${(
    calculateTimeFraction() * FULL_DASH_ARRAY
  ).toFixed(0)} 283`;
  document
    .getElementById("base-timer-path-remaining")
    .setAttribute("stroke-dasharray", circleDasharray);
}

function chooseQuiz(difficulty) {
  document.getElementById("app").innerHTML = `
  <div class="base-timer">
    <svg class="base-timer__svg" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
      <g class="base-timer__circle">
        <circle class="base-timer__path-elapsed" cx="50" cy="50" r="45"></circle>
        <path
          id="base-timer-path-remaining"
          stroke-dasharray="283"
          class="base-timer__path-remaining ${remainingPathColor}"
          d="
            M 50, 50
            m -45, 0
            a 45,45 0 1,0 90,0
            a 45,45 0 1,0 -90,0
          "
        ></path>
      </g>
    </svg>
    <span id="base-timer-label" class="base-timer__label"><a id="play" style="color: var(--${difficulty}-start" onclick="play(${difficulty}, 0)"><span class="icon"><i class="fas fa-play"></i></span></a></span>
  </div>
  `;
  let questions = eval(difficulty);
  $('#buttons').remove();
  $('.open').classList = difficulty;
  $('#heading').innerHTML = 'Get ready! And Press &nbsp <span class="icon"><i class="fas fa-play"></i></span>&nbsp when you are ready!';
}

function decodeHtml(html) {
    var txt = document.createElement("textarea");
    txt.innerHTML = html;
    return txt.value;
}

function play(q, i) {
  $('#heading').remove();
  $('#question-box').style.visibility = 'visible';
  $('#question').innerHTML = q.questions[i].question;
  $('#code').value = q.questions[i].outline;
  $('#base-timer-label').innerHTML = `<span>${formatTime(timeLeft)}</span>`;
  $('#run-button').setAttribute('data-difficulty', q.title);
  $('#submit-button').setAttribute('data-difficulty', q.title);
  $('#run-button').setAttribute('data-number', i);
  $('#submit-button').setAttribute('data-number', i);
  $('#skip-button').setAttribute('data-difficulty', q.title);
  $('#skip-button').setAttribute('data-number', i);
  $('#result-track').style.visibility = 'visible';
  $('#track').innerHTML = '0/5';
  startTimer();
}

$('#run-button').addEventListener('click', () => {
  let difficulty = $('#run-button').getAttribute('data-difficulty');
  let index = $('#run-button').getAttribute('data-number');
  run(difficulty, index);
});

$('#skip-button').addEventListener('click', () => {
  let difficulty = $('#skip-button').getAttribute('data-difficulty');
  let index = $('#skip-button').getAttribute('data-number');
  next(difficulty, index);
});

$('#submit-button').addEventListener('click', () => {
  let difficulty = $('#submit-button').getAttribute('data-difficulty');
  let index = $('#submit-button').getAttribute('data-number');
  if (correct) {
    submit(difficulty, index);
  } else {
    run(difficulty, index);
    if (correct) {
      submit(difficulty, index);
    } else {
      return;
    }
  }
});

function submit(q, i) {
  score++;
  question++;
  next(q, i);
}

function next(q, i) {
 let index = parseInt(i) + 1;
 if (index === 5) {
   finishQuiz();
 }
 let obj = eval(q);
 console.log(obj);
 console.log(index);
 question++;
 $('#question').innerHTML = obj.questions[index].question;
 $('#code').value = obj.questions[index].outline;
 $('#run-button').setAttribute('data-difficulty', obj.title);
 $('#submit-button').setAttribute('data-difficulty', obj.title);
 $('#run-button').setAttribute('data-number', index);
 $('#submit-button').setAttribute('data-number', index);
 $('#skip-button').setAttribute('data-difficulty', obj.title);
 $('#skip-button').setAttribute('data-number', index);
 $('#track').innerHTML = index + '/5';
 $('#skip-button').classList = 'button is-pulled-right is-success';
 $('#skip-button').innerHTML = '<span class="icon"><i class="fas fa-forward"></i></span> <span>Next</span>';
 if($('#response-note')) {
   $('#response-note').remove();
 }
 $('#result').innerHTML = '';
}

function run(q, i) {
  let code = $('#code').value;
  let obj = eval(q);
  code += obj.questions[i].test;
  let evaluationCode = code;
  try {
    let returnValue = eval(code);
    console.log(returnValue);
    $('#result').style.visibility = 'visible';
    $('#result').innerHTML = returnValue;
      if (returnValue == obj.questions[i].answer) {
      if($('#response-note')) {
        $('#response-note').remove();
      }
      let response = document.createElement('P');
      response.classList = 'subtitle has-text-success has-text-weight-semibold';
      response.style.marginTop = '20px';
      response.innerHTML = '🎉 Answer accepted! Great job!';
      response.id = 'response-note';
      $('#code-section').appendChild(response);
      $('#skip-button').classList = 'button is-pulled-right is-success';
      $('#skip-button').innerHTML = '<span class="icon"><i class="fas fa-forward"></i></span> <span>Next</span>';
      correct = true;
    } else {
      if($('#response-note')) {
        $('#response-note').remove();
      }
      let response = document.createElement('P');
      response.classList = 'subtitle has-text-danger has-text-weight-semibold';
      response.style.marginTop = '20px';
      response.innerHTML = '😿 Answer not accepted! Try again!';
      response.id = 'response-note';
      $('#code-section').appendChild(response);
      $('#skip-button').classList = 'button is-pulled-right is-danger';
      $('#skip-button').innerHTML = '<span class="icon"><i class="fas fa-forward"></i></span> <span>Skip</span>';
    }
  } catch (e) {
    $('#result').style.visibility = 'visible';
    console.log(e);
    $('#result').style.color = 'red';
    $('#result').innerHTML = e;
  }
}

function finishQuiz() {
  $('#question-box').remove();
  $('#result-track').style.visibility = 'hidden';
  $('#app').style.visibility = 'hidden';
  let congrats = document.createElement('DIV');
  congrats.innerHTML = `<p class="title is-2 has-text-weight-bold has-text-centered">
  Great Job! Your score was ${score}</p>`;
  $('#container').appendChild(congrats);
}
