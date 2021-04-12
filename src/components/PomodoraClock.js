import React, {useState} from 'react';
import soundfile from '../assets/sounds/Twin-bell-alarm-clock-ringing-short.mp3';

import Timer from "./Timer";
import ClockDisplay from "./ClockDisplay";

function PomodoraClock() {
    const sessType = {
        SESSION: 'SESSION',
        BREAK: 'BREAK'
    }
    const [clockState, setClockState] = useState({
        timerType: sessType.SESSION,
        timeLeft: 1500,
        sessLength: 25,
        brkLength: 5,
        running: false
    });

    // create a state value to contain the callback value for the set interval.
    const [intervalID, setIntervalID] = useState(null);

    // create a state variable to contain the audio file.
    const [alarmSound] = useState(new Audio(soundfile));

    // the ticker to decrement the timer.
    const ticker = () => {
        setClockState(prevState => {
            const newTime = prevState.timeLeft -1;
            if (newTime >= 0) {
                return {...prevState, timeLeft: newTime}
            } else {
                alarmSound.play();
                switchTimer();
            }
        });
    }

    // to start the countdown.
    const beginCountDown = () => {
        if (!clockState.running) {
            setClockState({...clockState, running: true});
            const tickHandler = setInterval(() => {
                setIntervalID(tickHandler);
                ticker();
            }, 100);
        } else {
            clearInterval(intervalID);
            return setClockState({...clockState, running: false})
        }
    }

    // to switch the timer between session and break.
    const switchTimer = () => {
        switch (clockState.timerType) {
            case 'SESSION': {
                setClockState(prevState => ({
                    ...prevState,
                    timerType: sessType.BREAK,
                    timeLeft: prevState.brkLength * 60
                }));
                break;
            }
            case 'BREAK': {
                setClockState(prevState => ({
                    ...prevState,
                    timerType: sessType.SESSION,
                    timeLeft: prevState.sessLength * 60
                }));
                break;
            }
            default: break;
        }
    }

    // to reset the timer.
    const resetTimer = () => {
        clearInterval(intervalID);
        setClockState({
            timerType: sessType.SESSION,
            timeLeft: 1500,
            sessLength: 25,
            brkLength: 5,
            running: false,
        });
        alarmSound.pause();
        alarmSound.currentTime = 0;
    }

    // to set the length of a session or break timer.
    const setSessionLength = (e) => {
        if(!clockState.running) {
            incDecTimer(
                'SESSION',
                e.currentTarget.value,
                clockState.sessLength,
                'sessLength');
        }
    }

    const setBreakLength = (e) => {
        if(!clockState.running) {
            incDecTimer(
                'BREAK',
                e.currentTarget.value,
                clockState.brkLength,
                'brkLength');
        }
    }

    // to increase or decrease the timer.
    const incDecTimer = (timerType, val, currLength, change) => {
        switch(val) {
            case '+': {
                if (currLength < 60) {
                    setClockState({
                        ...clockState,
                        [change]: currLength + 1,
                        timeLeft: timerType === clockState.timerType
                            ? currLength * 60 + 60
                            : clockState.timeLeft});
                }
                break;}
            case '-': {
                if (currLength > 1) {
                    setClockState({
                        ...clockState,
                        [change]: currLength - 1,
                        timeLeft: timerType === clockState.timerType
                            ? currLength * 60 - 60
                            : clockState.timeLeft
                    });
                }
                break;}
            default:
                break;
        }
    }


    return (
        <div>
            <div id="pomodora-clock" className="container">
                <h2 id="app-title">Pomodora Clock</h2>
                <div>
                    <Timer
                        typeID='session-label' title='Session Length'
                        incrID='session-increment' decrID='session-decrement'
                        lengthID='session-length' length={clockState.sessLength}
                        onClick={setSessionLength}
                    />

                    <Timer
                        typeID='break-label' title='Break Length'
                        incrID='break-increment' decrID='break-decrement'
                        lengthID='break-length' length={clockState.brkLength}
                        onClick={setBreakLength}
                    />
                </div>

                <div id="count-down">
                    <ClockDisplay
                        timerType={clockState.timerType}
                        timeLeft={clockState.timeLeft}
                        running={clockState.running}
                        begin={beginCountDown}
                        reset={resetTimer}
                    />

                </div>
                <audio id="beep"
                       src={soundfile}
                       ref={alarmSound} />
            </div>
        </div>
    )
}

export default PomodoraClock; 