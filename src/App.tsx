import React, {useState, useEffect} from 'react';
import {formatQuestion,formatCorrectAnswer,formatAnswers} from './formatQuestion';
import './App.css';


interface Question{
  question: string;
  answers: [string];
  correctAnswer: string;
}


const getQuestions = async  () => {
  return fetch('https://opentdb.com/api.php?amount=10&category=9&difficulty=easy&type=multiple')
  .then(res => res.json())
  .then(data => {
      return data.results.map((question: { question: any; correct_answer: any; incorrect_answers: any; }) => {
          const formattedQuestion:string = formatQuestion(question.question);
          const formattedCorrectAnswer:string = formatCorrectAnswer(question.correct_answer);
          const formattedAnswers:[string] = formatAnswers(question.incorrect_answers);
          formattedAnswers.push(formattedCorrectAnswer);
          return {
              question: formattedQuestion,
              answers: formattedAnswers,
              correctAnswer: formattedCorrectAnswer
          }
      })
  })
}

const App: React.FC = () => {
  const [questions, setQuestions] = useState<[Question]>([{
    question: '',
    answers: [""],
    correctAnswer: ''
  }]);
  const [currentQuestion, setCurrentQuestion] = useState<number>(0);
  const [score, setScore] = useState<number>(0);
  const [restart, setRestart] = useState<boolean>(false);

  useEffect(() => {
    getQuestions().then((questions: [Question])=> {
        setQuestions(questions);
    })
}, [restart])

const handleAnswer = (answer:string) => {
  if(answer === questions[currentQuestion].correctAnswer) {
      setScore(score + 1);
  }
  setCurrentQuestion(currentQuestion + 1);
}

const handleRestart = () => {
  setCurrentQuestion(0);
  setScore(0);
  setRestart(!restart);
  setQuestions([{
    question: '',
    answers: [""],
    correctAnswer: ''
  }])
}

return (
  <div className="App">
  {
    questions.length == 1?  <div className='loading'>Loading...</div> : (
      currentQuestion < questions.length ? ( 
        <div className='game'>
          <div className='scoreBoard'>
            <h2>Score: {score}</h2>
          </div>
          <div className='question'>
            <h2>{questions[currentQuestion].question}</h2>
          </div>
          <div className='answers'>
            {questions[currentQuestion].answers.map(answer => (
              <button className='answer' key={answer} onClick={() => handleAnswer(answer)}>{answer}</button>
            ))}
          </div>
        </div>
      ) : (
        <div className='game-over'>
          <h1 style={{color: 'red'}}>Game Over</h1>
          <div className='score'>
            <h2>Your score:</h2>
            <h2 style={{color:(score < 6)?'red':'lime'}}>{score}</h2>
          </div>
          <button className='restartButton' onClick={handleRestart}>Restart</button>
        </div>
      )
    )
  }
</div>
);
}

export default App;
