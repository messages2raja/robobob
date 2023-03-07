import React, { useState } from "react";
import Robo from "../Robo/Robo";
import "./Robobob.css";
import AskQuestion from "../AskQuestionInput/AskQuestionInput";
import aboutRobobob from "../data/aboutRobobob.json";
import calculateResult from "../utils/arithmeticCalculation";

const appName = "ROBOBOB";
const inputPattern = /^[\d+\-*/.\s]+$/;

function Robobob() {
  const [currentQuestion, setCurrentQuestion] = useState("");
  const [currentAnswer, setCurrentAnswer] = useState("");
  const [invalidQuestion, setInvalidQuestion] = useState("");
  const [inputValue, setInputValue] = useState("");
  const [previousQueries, setPreviousQueries] = useState([]);

  //Ask Question button click Handler
  const askHandler = (inputValue) => {
    if (inputPattern.test(inputValue)) {
      const question = `Evaluate ${inputValue}`;
      let answer = calculateResult(inputValue);
      setCurrentAnswer(answer);
      setInvalidQuestion("");
      const currentQuery = {
        question,
        answer,
      };
      const existingQuery = previousQueries.find(
        (previousQuery) => previousQuery.question === currentQuery.question
      );
      if (!existingQuery) {
        setPreviousQueries([...previousQueries, currentQuery]);
      }
    } else {
      setCurrentQuestion(inputValue);
      search(inputValue);
    }
  };
  //Ask Question Input change Handler
  const inputChangeHandler = (e) => {
    const currentInputValue = e.target.value;
    setInputValue(currentInputValue);
    if (currentInputValue.length === 0) {
      setCurrentAnswer("");
      setInvalidQuestion("");
    }
  };

  //Search if the current question exists in the previous Queries array to avoid redundant entries in previously asked Queries
  const search = (curr) => {
    const filterQueries = aboutRobobob.filter((about) =>
      about.question.toLowerCase().includes(curr.toLowerCase())
    );
    if (filterQueries.length) {
      const findInExistingQueries = previousQueries.find(
        (obj) => obj.question === filterQueries[0].question
      );
      if (!findInExistingQueries) {
        setPreviousQueries([...previousQueries, ...filterQueries]);
        setCurrentAnswer("");
      }
      setCurrentAnswer(filterQueries[0].answer);
      setInvalidQuestion("");
    } else {
      setInvalidQuestion("invalid");
      setCurrentAnswer("");
    }
  };
  return (
    <div className="App">
      <h1>{appName}</h1>
      <Robo
        currentAnswer={currentAnswer}
        previousQueries={previousQueries}
        invalidQuestion={invalidQuestion}
        inputValue={inputValue}
      />
      <AskQuestion
        askHandler={askHandler}
        inputChangeHandler={inputChangeHandler}
      />
    </div>
  );
}

export default Robobob;
