import { render, screen, cleanup } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import AskQuestionInput from "./AskQuestionInput";
afterEach(cleanup);
describe("AskQuestion component", () => {
  const askHandler = jest.fn((value) => value);
  const inputChangeHandler = jest.fn((value) => value);
  test("should render input element", () => {
    render(
      <AskQuestionInput
        askHandler={askHandler}
        inputChangeHandler={inputChangeHandler}
      />
    );
    const inputElement = screen.getByPlaceholderText("Ask me something");
    expect(inputElement).toBeInTheDocument();
  });
  test("should render button element", () => {
    render(
      <AskQuestionInput
        askHandler={askHandler}
        inputChangeHandler={inputChangeHandler}
      />
    );
    const buttonElement = screen.getByRole("button", { name: /ASK/i });
    expect(buttonElement).toBeInTheDocument();
  });
  test("should hold input value when user type", () => {
    render(
      <AskQuestionInput
        askHandler={askHandler}
        setInputVal="Name"
        inputChangeHandler={inputChangeHandler}
      />
    );
    const inputElement = screen.getByPlaceholderText("Ask me something");
    userEvent.type(inputElement, "Name");
    expect(inputElement).toHaveValue("Name");
  });
  test("should call askHandler when the ask button is clicked", () => {
    render(
      <AskQuestionInput
        askHandler={askHandler}
        setInputVal="Name"
        inputChangeHandler={inputChangeHandler}
      />
    );
    const inputElement = screen.getByPlaceholderText("Ask me something");
    const buttonElement = screen.getByRole("button", { name: /ASK/i });
    userEvent.type(inputElement, "Name");
    expect(inputElement).toHaveValue("Name");
    userEvent.click(buttonElement);
    expect(askHandler).toHaveBeenCalledTimes(1);
  });
});
