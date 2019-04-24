let questionNumber = 0;
let currentScore = 0;
let answered = 0;

function displayQuestion() {
  $('.question-form').html(`
  <legend>Name the yoga pose:</legend>
  <label><input type="radio" name="answer" class="radio" value="0"/>${TheQuiz[questionNumber].answers[0]}<br/></label>
  <label><input type="radio" name="answer" class="radio" value="1"/>${TheQuiz[questionNumber].answers[1]}<br/></label>
  <label><input type="radio" name="answer" class="radio" value="2"/>${TheQuiz[questionNumber].answers[2]}<br/></label>
  <label><input type="radio" name="answer" class="radio" value="3"/>${TheQuiz[questionNumber].answers[3]}<br/></label>
  <button type="button" class="submit">Submit</button>
  `);
  // Inserts Question
}
function updateQuestionScreen() {
  $('.pose').prop("src", TheQuiz[questionNumber].icon);
  $('.pose').prop("alt", TheQuiz[questionNumber].alt);
  // Updates question picture and alt text

  questionNumber++;
  $('.js-question').html(`Question: ${questionNumber}`);
  // Updates and displays question number

  $('.the-answer').html('');
  // Clears the previous answer
}
function nextQuestion() {
  displayQuestion();
  // Displays question text

  updateQuestionScreen()
  // Updates the rest of the question screen
}

function displayAnswer() {
  let correct = TheQuiz[questionNumber - 1].correctAnswer;
  let guessed = $('input[name=answer]:checked').val();
  // Gather correct and guessed answers

  if (correct == guessed) {
    currentScore++;
    $('.the-answer').html(`
    <h3>Good Job! The correct answer is: ${TheQuiz[questionNumber - 1].answers[correct]}.  You choose right!</h3>
    `);
  } else {
    $('.the-answer').html(`
    <h3>Sorry, the correct answer is: ${TheQuiz[questionNumber - 1].answers[correct]}.</h3>
    `);
  } // Display correct answer and message
}
function updateAnswerScreen() {
  $('.question-form').html('<button type="button" class="submit">Next Question</button>');
  // Clears the question radio buttons

  answered++;
  $('.js-score').html(`Score: ${currentScore}/${questionNumber}`);
  // Updates and displays answered number

  if (answered == 10) {
    $(".submit").html('View Results');
  } // Updates button text
}
function checkAnswer() {
  displayAnswer();
  // Displays answer text

  updateAnswerScreen();
  // Updates the rest of the answer screen
}

function handleButtonPress() {
  // Directs the progress of the quiz
  $('form').on('click', '.submit', function(event) {
    event.preventDefault();

    if (questionNumber == 0) {
      $('.js-score').html(`Score: 0/0`);
    } // Resets score for play again

    if (answered < 10) {
      if (answered == questionNumber) {
        // If ready for question
        nextQuestion();
      } else {
        if ($('input[name=answer]:checked').val() == undefined) {
          // If they left a question unanswered
          alert('Please select an answer.');
        } else {
          // If ready for answer
          checkAnswer();
        }
      }
    } else {
      // If all questions have been answered then display results
      displayFinalScreen();
    }
    // Navigates to Question / Answer / Final Screens
  });
}

function displayFinalScreen() {
  $('.pose').prop("src", "https://uploads-ssl.webflow.com/5b44edefca321a1e2d0c2aa6/5c1485620de6e6e40adffb22_Dimensions-Guide-Humans-Standing-Icon.svg");
  $('.pose').prop("alt", "Man and Woman Standing");
  // Returns to original picture and alt text

  let quotes = '\u0022';
  let apostrophe = '\u0027';
  let hyphen = '\u002D';

  const resultsText = [
    `${quotes}There are two mistakes one can make along the road to truth: not going all the way, and not starting.${quotes} ${hyphen} Buddha`,
    `${quotes}Quiet the mind, and the soul will speak.${quotes} ${hyphen} Ma Jaya Sati Bhagavati`,
    `${quotes}Change is not something that we should fear. Rather, it is something that we should welcome. For without change, nothing in this world would ever grow or blossom, and no one in this world would ever move forward to become the person they${apostrophe}re meant to be.${quotes} ${hyphen} B.K.S Iyengar`,
    `${quotes}Yoga is the journey of the self, through the self, to the self.${quotes} ${hyphen} The Bhagavad Gita`,
    `${quotes}Yoga is not about touching your toes. It is what you learn on the way down.${quotes} ${hyphen} Jigar Gor`,
    `${quotes}The pose begins when you want to get out of it.${quotes} ${hyphen} Baron Baptiste`,
    `${quotes}Yoga teaches us to cure what need not be endured and endure what cannot be cured.${quotes} ${hyphen} B.K.S Iyengar`,
    `${quotes}Yoga does not remove us from the reality or responsibilities of everyday life but rather places our feet firmly and resolutely in the practical ground of experience. We don${apostrophe}t transcend our lives; we return to the life we left behind in the hopes of something better.${quotes} ${hyphen} Donna Farhi`,
    `${quotes}Inner peace begins the moment you choose not to allow another person or event to control your emotions.${quotes} ${hyphen} Unknown`,
    `${quotes}Yoga does not just change the way we see things, it transforms the person who sees.${quotes} ${hyphen} B.K.S Iyengar`,
    `${quotes}Yoga is the stilling of the fluctuations of the mind.${quotes} ${hyphen} Patanjali`
  ]; // Quotes by score
  
  $('.the-answer').html(`
    <h3>You scored a ${currentScore} out of 10</h3>
  `); // Displays score

  $('.question-form').html(`
    <h5 class="quote">${resultsText[currentScore]}</h5><button type="button" class="submit">Play Again</button>
  `); // Displays quote and updates button text

  questionNumber = 0;
  currentScore = 0;
  answered = 0;
  // Resets variables to play again
}

function widthChange(mq) {
  if (mq.matches) {
    $('.header').html(`
      <h1 class="quiz-title">Yoga Quiz</h1>
      <div>
        <h2 class="bar js-question">Question: 0</h2>
        <h2 class="bar js-score">Score: 0/0</h2>
      </div>
    `);
  } else {
    $('.header').html(`
      <h2 class="bar js-question">Question: 0</h2>
      <h1 class="quiz-title">Yoga Quiz</h1>
      <h2 class="bar js-score">Score: 0/0</h2>
    `);
  }
} // Handles screen size formatting

function turnUpVolume() {
  handleButtonPress();
  // Informs page of the listener

  if (matchMedia) {
    const mq = window.matchMedia("(max-width: 430px)");
    mq.addListener(widthChange);
    widthChange(mq);
  } // Manually add listener
}

$(turnUpVolume);
