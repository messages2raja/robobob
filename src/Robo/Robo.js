import './Robo.scss';
export default function Robo({prevQuestion,currentAnswer,invalidQuestion,inputVal}){
    return(
        <div className="cute-robot-v1">
            <div className="sideFlex">
                {prevQuestion.length > 0 && (<h3>Previously Answered questions</h3>)}
                <ol>
                {
                    
                    prevQuestion.map((obj,index)=>(
                    <>
                    <li key={index}> Question:{obj.question} - Answer: {obj.answer}</li>
                    </>
                    ))
                }
                </ol>
            </div>
            <div className={((currentAnswer || invalidQuestion) && inputVal) ? 'circle-bg open' : 'circle-bg'}>
                <div className="robot-ear left"></div>
                     <div className="robot-head">
                        <div className="robot-face">
                        {(currentAnswer && inputVal) 
                         ?(<div data-testid="displayAnswer" className="anwserEye">{currentAnswer}</div>)
                         :(invalidQuestion && inputVal)
                         ?(<div data-testid="displayInvalid" className="anwserError">{invalidQuestion}</div>)
                        :(<><div className="eyes left"></div>
                            <div className="eyes right"></div></>)
                        }
                        <div className="mouth open"></div>
                        </div>
                   </div>
                <div className="robot-ear right"></div>
                <div className="robot-body"></div>
            </div>
            <div className="sideFlex"></div>
        </div>
    )
}