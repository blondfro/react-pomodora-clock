import React, {useState} from 'react';

function PomodoraClock() {
    const [timerType, setTimerType] = useState('Session');
    const [timeLeft, setTimeLeft] = useState(1500);
    const [sessLength, setSessLength] = useState(25);
    const [brkLength, setBrkLength] = useState(5);
    const [running, setRunning] = useState(false);

    // this will be for the set interval countdown.
    let tickHandler;

    // the ticker to decrement the timer.
    const ticker = () => {}

    // to start the countdown.
    const beginCountDown = () => {}

    // to switch the timer between session and break.
    const switchTimer = () => {}

    // to set the length of a session or break timer.
    const setSessionLength = (e) => {}

    const setTimerLength = (event, timerType) => {}

    const setBreakLength = (e) => {}

    // to increase or decrease the timer.
    const incDecTimer = (timerType, val, currLength, change) => {}

    // to reset the timer.
    const resetTimer = () => {}

    // this will update the clock display.
    const clock = () => {}

    return (
        <div>
            
        </div>
    )
}

export default PomodoraClock; 