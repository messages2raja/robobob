import {useState} from 'react';
import './AskQuestion.scss';
export default function AskQuestion({askHandler,inputChangeHandler}){
    const [currentQuestion,setCurrentQuestion] = useState('')
    return(
        <div className="questions-container">
            <form className="display-question" onSubmit={(e)=>askHandler(e,currentQuestion)}>
            <div><input type="search" value={currentQuestion} onChange={(e)=>{inputChangeHandler(e);setCurrentQuestion(e.target.value);}} placeholder="Ask me something"/></div>
            <button type="submit">ASK</button>
            </form>
        </div>
    )
}