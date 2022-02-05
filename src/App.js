import React from 'react';
import './App.css';
import {useState, useEffect} from 'react';
import {formatQuestion,formatCorrectAnswer,formatAnswers} from './formatQuestion';

const getQuestions = () => {
    return fetch('https://opentdb.com/api.php?amount=10&category=9&difficulty=easy&type=multiple')
    .then(res => res.json())
    .then(data => {
        return data.results.map(question => {
            const formattedQuestion = formatQuestion(question.question);
            const formattedCorrectAnswer = formatCorrectAnswer(question.correct_answer);
            const formattedAnswers = formatAnswers(question.incorrect_answers);
            formattedAnswers.push(formattedCorrectAnswer);
            return {
                question: formattedQuestion,
                answers: formattedAnswers,
                correctAnswer: formattedCorrectAnswer
            }
        })
    })
}
  
export default function App() {
 
    const [questions, setQuestions] = useState([]);
    const [currentQuestion, setCurrentQuestion] = useState(0);
    const [score, setScore] = useState(0);

    useEffect(() => {
        getQuestions().then(questions => {
            setQuestions(questions);
        })
    }, [])

    const handleAnswer = (answer) => {
        if(answer === questions[currentQuestion].correctAnswer) {
            setScore(score + 1);
        }
        setCurrentQuestion(currentQuestion + 1);
    }

    const handleRestart = () => {
        setCurrentQuestion(0);
        setScore(0);
    }

    return (
        <div className="App">
        {
          questions.length === 0 ? <div className='loading'>Loading...</div> : (
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