import React, {useState} from 'react';
import './App.css';
import Robo from './Robo'; 
import AskQuestion from './AskQuestion';
import aboutRobobob from './data/aboutRobo.json';
import calculateResult from './arithmeticCalculation';

function App() {
  const [questions,setQuestions] = useState('')
  const [currentQuestion,setCurrentQuestion] = useState('');
  const [currentAnswer,setCurrentAnswer] = useState('');
  const [invalidQuestion,setInvalidQuestion] = useState('');
  const [inputVal,setInputVal] = useState('');
  const [prevQuestion,setPrevQuestion] = useState([]);

  //Ask button click functionality
  const askHandler = (e,inputValue) => {
     e.preventDefault();
    const inputPattern = /^[\d+\-*/.\s]+$/;
    const isValidInput = (inputValue) => {
     return inputPattern.test(inputValue);
    }
    if (isValidInput(inputValue)) {
      const questionAsked = `Evaluate ${inputValue}`;
      let evaluatedAnswer = calculateResult(inputValue);
      if(evaluatedAnswer.toString().length>7){
        evaluatedAnswer = evaluatedAnswer.toFixed(7);
      }
      setCurrentAnswer(evaluatedAnswer);
      setInvalidQuestion('');
      const saveCurrentQuestion = {
        question:questionAsked,
        answer:evaluatedAnswer
      }
      const findInExistingQuestions = prevQuestion.find((obj)=>obj.question === saveCurrentQuestion.question)
      if(!findInExistingQuestions){
      setPrevQuestion([...prevQuestion,saveCurrentQuestion]);
      }
    }
    else{
      setCurrentQuestion(inputValue);
      searchQuestion(inputValue);
    }
 
  }
   //Ask Input change functionality
  const inputChangeHandler = (e) => {
    e.stopPropagation();
    const currentInputValue = e.target.value;
    setInputVal(currentInputValue);
    if(currentInputValue.length===0){
      setCurrentAnswer('');
      setInvalidQuestion('');
    }
  }
//Search if current question is already there in the previous questions array
  const searchQuestion = (curr) => {
    console.log(currentQuestion);
    const filterQuestions = aboutRobobob.filter((about)=> about.question.toLowerCase().includes(curr.toLowerCase()));
    if(filterQuestions.length){
      const findInExistingQuestions = prevQuestion.find((obj)=>obj.question === filterQuestions[0].question)
      if(!findInExistingQuestions){
        setPrevQuestion([...prevQuestion,...filterQuestions]);
        setCurrentAnswer('')
      }
      setCurrentAnswer(filterQuestions[0].answer);
      setInvalidQuestion('')
    }
    else{
      setInvalidQuestion("invalid")
      setCurrentAnswer('')
    }
    }
  return (
    <div className="App">
    <h1>ROBOBOB</h1>
    <Robo currentAnswer={currentAnswer} prevQuestion={prevQuestion} invalidQuestion={invalidQuestion} inputVal={inputVal}/>
    <AskQuestion askHandler={askHandler} inputChangeHandler={inputChangeHandler}/>
    </div>
  );
}

export default App;
