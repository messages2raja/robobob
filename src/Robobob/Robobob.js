import React, {useState} from 'react';
import Robo from '../Robo/Robo'; 
import './Robobob.css'
import AskQuestion from '../AskQuestionInput/AskQuestionInput';
import aboutRobobob from '../data/aboutRobobob.json';
import calculateResult from '../utils/arithmeticCalculation';

function Robobob() {
  const [currentQuestion,setCurrentQuestion] = useState('');
  const [currentAnswer,setCurrentAnswer] = useState('');
  const [invalidQuestion,setInvalidQuestion] = useState('');
  const [inputVal,setInputVal] = useState('');
  const [prevQuestion,setPrevQuestion] = useState([]);

  //Ask Question button click Handler
  const askHandler = (e,inputValue) => {
    e.preventDefault();
    const inputPattern = /^[\d+\-*/.\s]+$/;
    const isValidInput = (inputValue) => {
     return inputPattern.test(inputValue);
    }
    if (isValidInput(inputValue)) {
      const questionAsked = `Evaluate ${inputValue}`;
      let evaluatedAnswer = calculateResult(inputValue);
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
   //Ask Question Input change Handler
  const inputChangeHandler = (e) => {
    const currentInputValue = e.target.value;
    setInputVal(currentInputValue);
    if(currentInputValue.length===0){
      setCurrentAnswer('');
      setInvalidQuestion('');
    }
  }

//Search if the current question exists in the previous questions array to avoid redundant entries in previously asked questions
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

export default Robobob;
