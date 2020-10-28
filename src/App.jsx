import React, { useState, useRef } from 'react';
import './App.css'

function padTime(time){
    return time.toString().padStart(2,'0');
}


function App() {
    const [tilte,setTitle] = useState('Let the countdown begin!')
    const [timeLeft,setTimeLeft] = useState(30 * 60);
    const [isrunning,setIsrunning] = useState(false);
    const intervalRef = useRef(null);

    function startTimer(){
        if(intervalRef.current !== null) return;
        setTitle(`You're doing great!`)
        setIsrunning(true)
        intervalRef.current = setInterval(()=>{
            setTimeLeft(timeLeft => {
                if (timeLeft >= 1)
                    return timeLeft - 1;
                resetTimer();
                return 0;
            })
        },1000)
    }

    function stopTimer(){
        if(intervalRef.current === null) return;
        clearInterval(intervalRef.current);
        intervalRef.current = null;
        setTitle('Keep it up!!!');
        setIsrunning(false)
    }

    function resetTimer(){
        clearInterval(intervalRef.current)
        intervalRef.current = null;
        setTitle('Ready to go another round?');
        setTimeLeft(30 * 60);
        setIsrunning(false)
    }

    const minutes = padTime(Math.floor(timeLeft / 60));
    const seconds = padTime(timeLeft - minutes * 60)
    return (
        <div className="app">
            <h2>{tilte}</h2>

            <div className="timer">
                <span>{minutes}</span>
                <span>:</span>
                <span>{seconds}</span>
            </div>

            <div className="buttons">
                {!isrunning && <button onClick={startTimer} className="ui teal button">Start</button>}
                {isrunning && <button onClick={stopTimer} className="ui teal button">Stop</button>}
                <button onClick={resetTimer} className="ui teal button">Reset</button>
            </div>
        </div>
    )
}

export default App
