import React, { useState } from 'react';
import { fetchQuizQuestions } from './API';
//COMPONENTS IMPORTS
import QuestionsCard from './components/QuestionsCard';
//TYPES IMPORTS
import { QuestionState, Difficulty } from './API';
//styles import
import { GlobalStyle, Wrapper  } from './App.styles';

export type AnswerObject = {
  question: string;
  answer: string;
  correct: boolean;
  correctAnswer: string;
}
const TOTAL_QUESTIONS = 10 //this is the total que. numbers we'll have 10 questions

const App = () => {
  const [loading, setLoading] = useState(false);
  const [questions, setQuestions] = useState<QuestionState[]>([]);
  const [number, setNumber] = useState(0);
  const [userAnswers, setUserAnswers] = useState<AnswerObject[]>([]);
  const [score, setScore] = useState(0);
  const [gameOver, setGameOver] = useState(true);

  console.log(questions);



  const startTrivia = async () => {
    setLoading(true);
    setGameOver(false);
    const newQuestions = await fetchQuizQuestions(
      TOTAL_QUESTIONS,
      Difficulty.EASY
    );
    setQuestions(newQuestions);
    setScore(0);
    setUserAnswers([]);
    setNumber(0);
    setLoading(false);
  }
  const checkAnswer = (e: React.MouseEvent<HTMLButtonElement>) => {
    if(!gameOver){
      //user's answer
      const answer = e.currentTarget.value;
      // check answer against correct answer
      const  correct = questions[number].correct_answer === answer;
      // add score if answer is correct
      if (correct) setScore(prev => prev + 1);
      //save answer in the array for user's answer
      const answerObject = {
        question: questions[number].question,
        answer,
        correct,
        correctAnswer: questions[number].correct_answer
      };
      setUserAnswers((prev) => [...prev, answerObject])
    }
  };
  const nextQuestion = () => {
    //move on to the next question if not the last question 
    const nextQuestion = number + 1;
    if(nextQuestion === TOTAL_QUESTIONS){
      setGameOver(true);
    }
    else{
      setNumber(nextQuestion);
    }
  }
  return (
    <>
    <GlobalStyle />
    <Wrapper>
      <h1>QUIZ WEB APP</h1>
      {
        gameOver || userAnswers.length === TOTAL_QUESTIONS ? (
          <button className="start" onClick={startTrivia}>
            Start
          </button>
        ) : null
      }
      {!gameOver ? <p className="score">Score: {score * 10}</p> : null}
      {loading ? <p> Loading Questions ... </p> : null}
      {!loading && !gameOver && (
        <QuestionsCard
          questionNum={number + 1}//we added +1 here because arrays start from '0' we don't want to see the 0. que. in our quiz page 
          totalQuestions={TOTAL_QUESTIONS}//we created a const for total que. because it is easier to change the value.
          question={questions[number].question}
          answers={questions[number].answers}
          userAnswer={userAnswers ? userAnswers[number] : undefined}
          callback={checkAnswer}
        />
      )}
      {!gameOver && !loading && userAnswers.length === number + 1 && number !== TOTAL_QUESTIONS - 1 ? (
        <button className='next' onClick={nextQuestion}>
          Next Question
        </button>
      ) : null
      }

    </Wrapper>
    </>
  );
}

export default App;
