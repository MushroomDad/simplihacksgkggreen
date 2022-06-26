const correctAnswerIcon = "https://img.icons8.com/ios/250/000000/checked.png";
const wrongAnswerIcon= "https://img.icons8.com/ios/250/000000/cancel.png";
const warningIcon = "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSa7WP9E3LDA10kP2Rk2enw-_kjI-iJd4kny8yH2kTrPR8hgrwtBg";

let questionCounter = 0;
let score = 0;
let questionsArray = [
  {
    question: "1. What is an effect of climate change?",
     optionone: "Hotter Summers",
    optiontwo: "Rising Ocean Temperatures",
    optionthree: "Melting Polar Ice",
    optionfour: "All of the above",
    correctAnswer: "All of the above"
  },
  {
     question: "2. What is one cause of climate change?",
    optionone: "Burning of Fossil Fuels",
    optiontwo: "Using less electricity",
    optionthree: "Biodiversity",
    optionfour: "Global Warming",
    correctAnswer: "Burning of Fossil Fuels"
  
  },
  {
     question: "3. How might climate change affect the ocean?",
    optionone: "Increase of food",
    optiontwo: "Less acidic oceans",
    optionthree: "Decreasing Ocean temperatures",
    optionfour: "Shifting ocean currents and fish migration",
    correctAnswer: "Shifting ocean currents and fish migration"
    
  },
  {
    question: "4. What is a threat of climate change?",
    optionone: "Cooling Polar regions",
    optiontwo: "Stable weather patterns",
    optionthree: "Rising Sea levels",
    optionfour: "Increase in Oxygen Production",
    correctAnswer: "Rising Sea levels"
  },
  {
    question: "5. How much mass are ice sheets in Greenland and Antarctica losing annually combined? ",
    optionone: "190 billon tons",
    optiontwo: "300 million tons",
    optionthree: " 500 million tons",
    optionfour: "427 billion tons",
    correctAnswer: "427 billion tons"
  },
  {
    question: "6. In just 40 years average wildlife populations... ",
    optionone: "increased by 60%",
    optiontwo: "dropped by 60%",
    optionthree: "increased by 35.5%",
    optionfour: "dropped by 35.5%",
    correctAnswer: "dropped by 60%"
  },
  {
    question: "7. What do higher temperatures do to marine life?",
    optionone: "Aids marine biodiversity",
    optiontwo: "stabilizes fish development",
    optionthree: "mass migration of marine species",
    optionfour: "alter human development",
    correctAnswer: "mass migration of marine species"
  },
  {
    question: "8. What can I do to stop climate change?     Choose best options                                              I.Switch to LED light bulbs                                II.Wash laundry with hot water                                III. Ride a bike/public transportation                      IV.Eat More Vegetables                                      V.Hang dry clothes and use a clothesline                       VI. Reduce, Reuse, Repair and Recycle.                            VI. Switch to using coal,oil, or gas utility /n VII.Keep doors open so air circulates",
    optionone: "All",
    optiontwo: "II,III,IV,V,VI,VII",
    optionthree: "I,III,IV,V,VI,VI,VII",
    optionfour: "I,III,IV,V,VI",
    correctAnswer: "I,III,IV,V,VI"
  }
];

let questionsCount = questionsArray.length;

function handleStartClick(){
	$('.js-start-button').on('click',function(event){
		console.log("handleStartClick() ran");
		$('.progress-section').show();
		$('.start-section').hide();
		$('.end-section').hide();
		$('.quiz-box').fadeIn("slow");
		renderQuizBox(); 

	});
}

// This function displays the quizz box with the question, options, 
// score and question count
function renderQuizBox(){
  renderQuestionCount();
  renderQuestion();
  renderScore();
}
function renderScore(){
  $(".progress-section .score-card").text(`${score}/${questionsCount}`);
}
function renderQuestionCount(){
  $(".progress-section .question-count").text(`Question ${questionCounter+1} of ${questionsCount}`);
}

// This function renders a new question
function renderQuestion(){
  $(".questions-form p").text(questionsArray[questionCounter].question);
  $(".questions-form #option-one").val(questionsArray[questionCounter].optionone);
  $(".questions-form #option-two").val(questionsArray[questionCounter].optiontwo);
  $(".questions-form #option-three").val(questionsArray[questionCounter].optionthree);
  $(".questions-form #option-four").val(questionsArray[questionCounter].optionfour);
   
  $(".questions-form #option-one").next().text(questionsArray[questionCounter].optionone);
  $(".questions-form #option-two").next().text(questionsArray[questionCounter].optiontwo);
  $(".questions-form #option-three").next().text(questionsArray[questionCounter].optionthree);
  $(".questions-form #option-four").next().text(questionsArray[questionCounter].optionfour);
}

function handleSubmitAnswer(){
  $('.js-submit-button').on('click',function(event){
    console.log("handleSubmitAnswer() ran");
    let selectedOption = $('input[type=radio]:checked').val();
    if(selectedOption === undefined) {
       displayPopup(false, selectedOption);
    }
    else{
     //reset radio button
      $('input[type=radio]:checked').attr('checked',false);
      checkAnswer(selectedOption);
    }
 });
}


// This function checks whether the answer selected by the
// user is correct or not
function checkAnswer(selected){
  let rightAnswer = questionsArray[questionCounter].correctAnswer;
  
  if(selected === rightAnswer){
    score++;
    displayPopup(true, rightAnswer);
  } 
  else{
   displayPopup(false, rightAnswer);
  }
}

//This function gives feedback to the user whether 
//the option selected in correct or wrong. 
//It also alerts the user if no option is selected
function displayPopup(statusFlag, answer){
  $('.feedback-section').show();
  if(statusFlag){
    $(".popup-box img").attr("src",correctAnswerIcon);
    $(".popup-box #popup-text").text("You are right!");
    $(".popup-box").show();
  }
  else{
      if(answer === undefined) {
         questionCounter--;
         $(".popup-box img").attr("src",warningIcon);
         $(".popup-box #popup-text").text('Please select an option');
       }
      else{
         $(".popup-box img").attr("src",wrongAnswerIcon);
        $(".popup-box #popup-text").text(`Sorry, the correct answer was: ${answer}`);
      }
    }
     $(".popup-box").show();
}

//This function will proceed to the next question or display the final score
//based on the question count.
function handlePopupClose(){
  $('.js-close-button').on('click', function(event){
    console.log("handlePopupClose() ran");
    $('.popup-box').hide();
    $('.feedback-section').hide();
    $('.quiz-box').hide().fadeIn();
    questionCounter++;
    if(questionCounter < questionsArray.length) {
       $('.quiz-box').fadeIn();
       renderQuizBox();
    }
    else{
      $('.quiz-box').hide();
      displayFinalScore();
    }
  });
}

//This function displays the final score once the quiz is completed
function displayFinalScore(){
   $('.end-section').fadeIn(1000);
   $('.end-section h4').text(`Your Score is: ${score}/${questionsCount}`);
   $('.correct .count' ).text(score);
   $('.wrong .count').text(questionsCount - score);
   resetQuiz();
}

//This function resets the questions and score
function resetQuiz(){
  questionCounter = 0;
  score = 0;
}

//This function will start over the quiz
function handleStartOver(){
  $('.js-startover-button').on('click',function(event){
    console.log("handleStartOver() ran");
    $('.end-section').hide();
    $('.quiz-box').fadeIn();
    renderQuizBox();
  });
}

function init(){
  $('.end-section').hide();
  $('.progress-section').hide();
  $('.quiz-box').hide();
  $('.feedback-section').hide();
  handleStartClick();
  handleSubmitAnswer();
  handlePopupClose();
  handleStartOver()
}
$(init());
