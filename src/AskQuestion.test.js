import {render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event'
import AskQuestion from './AskQuestion';

describe('Test AskQuestion component',()=>{
    const askHandler = jest.fn((value) => value);
    const inputChangeHandler = jest.fn((value) => value);
    test('should render Input element',()=>{
        render(<AskQuestion askHandler={askHandler}  inputChangeHandler={inputChangeHandler}/>);
        const inputElement = screen.getByPlaceholderText('Ask me something');
        expect(inputElement).toBeInTheDocument();
     })
     test('should render Button element',()=>{
        render(<AskQuestion askHandler={askHandler}  inputChangeHandler={inputChangeHandler}/>);
        const buttonElement = screen.getByRole('button',{name:/ASK/i});
        expect(buttonElement).toBeInTheDocument();
     })
    test('should hold Input value when user type', () => {
        render(<AskQuestion askHandler={askHandler} setInputVal="Name" inputChangeHandler={inputChangeHandler}/>);
        const inputElement = screen.getByPlaceholderText('Ask me something');
        const buttonElement = screen.getByRole('button',{name:/ASK/i});
        userEvent.type(inputElement, 'Name')
        expect(inputElement).toHaveValue('Name')
      });
      test('should call askHandler when the ask button is clicked', () => {
        render(<AskQuestion askHandler={askHandler} setInputVal="Name" inputChangeHandler={inputChangeHandler}/>);
        const inputElement = screen.getByPlaceholderText('Ask me something');
        const buttonElement = screen.getByRole('button',{name:/ASK/i});
        userEvent.type(inputElement, 'Name')
        expect(inputElement).toHaveValue('Name')
        userEvent.click(buttonElement);
        expect(askHandler).toHaveBeenCalledTimes(1);
        // expect(handleClick).toHaveReturnedWith('Button clicked');
      });
})