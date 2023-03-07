import { render, screen } from "@testing-library/react";
import Robo from "./Robo";

describe("robo component", () => {
  test("current answer", () => {
    render(
      <Robo
        currentAnswer="Answer1"
        previousQueries={[]}
        invalidQuestion=""
        inputValue="Answer1"
      />
    );
    const answerElement = screen.getByTestId("displayAnswer");
    expect(answerElement).toBeInTheDocument();
    expect(answerElement).toHaveTextContent("Answer1");
  });
  test("current answer asasa", () => {
    render(
      <Robo
        currentAnswer="4"
        previousQueries={[]}
        invalidQuestion=""
        inputValue="2+2"
      />
    );
    const answerElement = screen.getByTestId("displayAnswer");
    expect(answerElement).toBeInTheDocument();
    expect(answerElement).toHaveTextContent("4");
  });
  test("previous answered question heading to be present", () => {
    const mockPrev = [
      {
        question: "whats your name",
        answer: "RoboBob",
      },
    ];
    render(
      <Robo
        currentAnswer=""
        previousQueries={mockPrev}
        invalidQuestion=""
        inputValue=""
      />
    );
    const prevElement = screen.getByRole("heading", {
      name: /Previously Answered questions/i,
    });
    expect(prevElement).toBeInTheDocument();
  });
  test("previous answered question list to be present", () => {
    const mockPrev = [
      {
        question: "whats your name",
        answer: "RoboBob",
      },
    ];
    render(
      <Robo
        currentAnswer=""
        previousQueries={mockPrev}
        invalidQuestion=""
        inputValue=""
      />
    );
    let prevAnswersList = screen.getAllByRole("listitem");
    expect(prevAnswersList).toHaveLength(1);
    expect(prevAnswersList[0]).toHaveTextContent(
      "Question:whats your name - Answer: RoboBob"
    );
  });
  test("invalid question scenario", () => {
    render(
      <Robo
        currentAnswer=""
        previousQueries={[]}
        invalidQuestion="Invalid"
        inputValue="Invalid"
      />
    );
    const invalidElement = screen.getByTestId("displayInvalid");
    expect(invalidElement).toBeInTheDocument();
    expect(invalidElement).toHaveTextContent("Invalid");
  });
});
