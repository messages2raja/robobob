import { useState } from "react";
import "./AskQuestionInput.scss";
export default function AskQuestionInput({
  askHandler,
  inputChangeHandler,
  invalidQuestion,
}) {
  const [currentQuestion, setCurrentQuestion] = useState("");
  const askInputChange = (e) => {
    inputChangeHandler(e);
    setCurrentQuestion(e.target.value);
  };
  const askButtonClick = (e) => {
    e.preventDefault();
    askHandler(currentQuestion);
  };
  return (
    <div className="questions-container">
      <form className="display-question" onSubmit={askButtonClick}>
        <div>
          <input
            type="search"
            className={invalidQuestion ? "error" : ""}
            value={currentQuestion}
            onChange={askInputChange}
            placeholder="Ask me something"
          />
        </div>
        <button type="submit" disabled={!currentQuestion}>
          ASK
        </button>
      </form>
    </div>
  );
}
