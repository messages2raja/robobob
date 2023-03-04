import {render, screen } from '@testing-library/react';
import Robo from './Robo';

describe('test Robo component', ()=>{

test('test current answer',()=>{
    render(<Robo currentAnswer="Answer1" prevQuestion={[]} invalidQuestion="" inputVal="Answer1"/>);
     const answerElement = screen.getByTestId("displayAnswer");
    expect(answerElement).toBeInTheDocument();
    expect(answerElement).toHaveTextContent('Answer1');
})
test('test Previous Answered question heading to be present',()=>{
    const mockPrev = [{
        question:'whats your name',
        answer:'RoboBob'
    }]
    render(<Robo currentAnswer="" prevQuestion={mockPrev} invalidQuestion="" inputVal=""/>);
    const prevElement = screen.getByRole('heading',{name:/Previously Answered questions/i});
    expect(prevElement).toBeInTheDocument();
})
test('test Previous Answered question list to be present',()=>{
    const mockPrev = [{
        question:'whats your name',
        answer:'RoboBob'
    }];
    render(<Robo currentAnswer="" prevQuestion={mockPrev} invalidQuestion="" inputVal=""/>);
    let prevAnswersList = screen.getAllByRole('listitem');
        expect(prevAnswersList).toHaveLength(1);
        expect(prevAnswersList[0]).toHaveTextContent('Q:whats your name - A: RoboBob');
 })
 test('test Invalid question scenario',()=>{
    render(<Robo currentAnswer="" prevQuestion={[]} invalidQuestion="Invalid" inputVal="Invalid"/>);
    const invalidElement = screen.getByTestId("displayInvalid");
    expect(invalidElement).toBeInTheDocument();
    expect(invalidElement).toHaveTextContent('Invalid');
 })
})