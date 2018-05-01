//the function will start the quiz when you push the start quiz button
function pushStartButton() {
  console.log('`pushStartButton` ran');
  $('.quiz-button').on('click', '.start-button', event => {
     event.preventDefault(); 
     startQuiz();
  });
} 

//this will generate the quiz after hitting the start quiz button
function startQuiz(){
  $('.starting-heading').remove();
  $('.quiz-button').remove();
  $('.question-container').css('display', 'block');
  $('.questionNumber').text(1);
  renderQuestion();
}

//this will render a question to the DOM
function renderQuestion() {
  console.log('`renderQuestion`');
  $('.question-container').html(createQuestion());
  answerSubmission();
}

//create variables to keep track of the question # and score. The DATA will be retrieved from questionslist.js 
let questionNumber = 0; 
let score = 0; 

//this function links to questionslist.js to generate all the questions to the HTML
function createQuestion(){
  if (questionNumber < DATA.length){
    return (`<h2 class='ask-question'>${DATA[questionNumber].question}</h2>
    <form role='form' class='question-form'>
    <section role='region'>
    <fieldset class='answer-list'>
      <legend>Answers:</legend>
      <label class='answer-set'>
      <input type="radio" style="vertical-align: middle" name="answer-set-1" id="answer1-1" value="${DATA[questionNumber].answers[0]}" unchecked required><span class='span-answer' for="ans-1">${DATA[questionNumber].answers[0]}</span></label>
      <br>
      <label class='answer-set'>
      <input type="radio" style="vertical-align: middle" name="answer-set-1" id="answer1-2" value="${DATA[questionNumber].answers[1]}" required><span class='span-answer' for="ans-2">${DATA[questionNumber].answers[1]}</span></label>
      <br>
      <label class='answer-set'>
      <input type="radio" style="vertical-align: middle" name="answer-set-1" id="answer1-3" value="${DATA[questionNumber].answers[2]}" required><span class='span-answer' for="ans-3">${DATA[questionNumber].answers[2]}</span></label>
      <br>
      <label class='answer-set'>
      <input type="radio" style="vertical-align: middle" name="answer-set-1" id="answer1-4" value="${DATA[questionNumber].answers[3]}" required><span class='span-answer' for="ans-4">${DATA[questionNumber].answers[3]}</span></label>
      <br>
    </fieldset>
    <div class='submit-button'>
        <button type='submit' class='go-submit-answer'>Submit!</button>
    </div>
    </section>
    </form>`);
  } else {
    finalResults();
  }
}

//what happens when the user clicks the submit button and submits their answer
function answerSubmission(){
   console.log('`answerSubmission`'); 
   $('form').on('submit', event => {
    event.preventDefault(); 
    //console.log('tipoff button executed');
    let chosen = $('input:checked'); 
    //console.log(chosen);
    let selectedAnswer = chosen.val();
   // console.log('chosen.val', selectedAnswer)
    let realAnswer = `${DATA[questionNumber].rightAnswer}`;
   // console.log('realAnswer', realAnswer)
    if (selectedAnswer === realAnswer){
      correctAnswer();
    } else {
      wrongAnswer(); 
    }
   });
}

//what happens when you get the answer correct
function correctAnswer(){
  scoreUp();
  $('.ask-question').remove();
  $('.question-list').remove();
  $('.question-container').html(`<section role='region' class='feedback-container row .col-12'>
     <div class='image-of-feedback'>
      <img class='feedback-image' src='${DATA[questionNumber].icon}' alt= '${DATA[questionNumber].alt}'>
     </div>
     <div class='answer-response'>
       <h2 class='answer'>Correct, 2 points!</h2>
       <button id ='next-button'>Next Question</button>
     </div>
    </section>`);
}

//what happens when you get the answer wrong
function wrongAnswer(){
  $('.ask-question').remove();
  $('.question-list').remove();
     $('.question-container').html(`<section role='region' class='feedback-container'>
     <div class='image-of-feedback'>
      <img class='feedback-image' src='https://www.demilked.com/magazine/wp-content/uploads/2016/06/month-in-new-york-infinite-gifs-james-curran-28.gif' alt = 'Unable to intercept a pass.'>
     </div>
     <div class='answer-response'>
       <h2 class='answer'>Sorry, that's incorrect. The correct answer is ${DATA[questionNumber].rightAnswer}. You'll get it next time!</h2>
       <button id ='next-button'>Next Question</button>
     </div>
    </section>`);
}

//increase score by 2 points
function scoreUp(){
  score += 2;
  $('.score').text(score);
}

//increase question number by +1
function increaseQuestionNumber () {
    questionNumber += 1; 
    if(questionNumber < 10) {
  $('.questionNumber').text(questionNumber+1);
 } 
}

//this will move onto the next question after pushing the next question button
function changeQuestion(){
  console.log('`changeQuestion`ran');
   $('.question-container').on('click','#next-button', event => {
     event.preventDefault();
     console.log('next button worked');
     $('.feedback-container').remove();
     increaseQuestionNumber();
     renderQuestion();
   }
)}

//what is presented on the browser at the end of the quiz
function finalResults(){
  console.log('`finalResults`ran');
  if(score >= 16){
    $('.ask-question').remove();
    $('.question-list').remove();
    $('.question-container').html(`<div class='final-container'> 
     <div class='score-results'>
     <h2>You scored ${score} of out a of possible 20 points.</h2>
     </div>
     <div>
       <img class='results-image' src='https://78.media.tumblr.com/7edf983f4e309fb5c87cab142ee13a58/tumblr_o2eoszsXrI1riokveo1_500.gif' alt=''Cartoon Lebron James dancing.'>
     </div>
     <div class='results-commentary'>
      <h3>Incredible scoring! You have been selected to the All-Star team.  Congratulations!</h3>
     </div>
     <div>
       <a href='index.html'><button class='restart-button'>Restart Quiz!</button></a>
     </div>
    </div>`);
  } else {
    $('.ask-question').remove();
    $('.question-list').remove();
    $('.question-container').html(`<div class='final-container'> 
     <div class='score-results'>
     <h2>You scored ${score} of out a of possible 20 points.</h2>
     </div>
     <div>
       <img class='results-image' src='http://gifimage.net/wp-content/uploads/2017/09/basketball-animated-gif-9.gif' alt='Cartoon Michael Jordan wagging tongue and dribbling'>
     </div>
     <div class='results-commentary'>
      <h3>With a little more practice, you'll be an All-Star in no time. You'll need at least 16 points!</h3>
     </div>
     <div>
       <a href='index.html'><button class='restart-button'>Restart Quiz!</button></a>
     </div>
    </div>`);
  }
}

//callback the main functions of the quiz. How to know which functions to callback? 
function runQuiz(){
   pushStartButton();
   changeQuestion();
}

$(runQuiz); 
