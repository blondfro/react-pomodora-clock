import React, {useState} from 'react';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

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

    const [intervalID, setIntervalID] = useState(null);

    // useEffect(() => {
    //     clock();
    //
    // }, [clockState.timeLeft])


    let alarmSound;



    // this will be for the set interval countdown.
    // let tickHandler;


    // the ticker to decrement the timer.
    const ticker = () => {
        if(clockState.timeLeft === 0) {
            clearInterval(intervalID);
            alarmSound.play();
            switchTimer();
            setClockState({...clockState, running: false});
        } else {
            let tmp = clockState.timeLeft;
            console.log(clockState.timeLeft);
            setClockState((prevState) => (
                {
                    ...prevState,
                    timeLeft: prevState.timeLeft - 1
                }
            ));
        }
    }

    // to start the countdown.
    const beginCountDown = () => {
        if (!clockState.running) {
            setClockState({...clockState, running: true});
            const tickHandler = setInterval(ticker, 1000);
            setIntervalID(tickHandler);
        } else {
            clearInterval(intervalID);
            return setClockState({...clockState, running: false})
        }
    }

    // to switch the timer between session and break.
    const switchTimer = () => {
        switch(clockState.timerType) {
            case 'SESSION': {
                setClockState({
                    ...clockState,
                    timerType: sessType.BREAK,
                    timeLeft: clockState.brkLength * 60
                });
                beginCountDown();
                break;
            }
            case 'BREAK': {
                setClockState({
                    ...clockState,
                    timerType: sessType.SESSION,
                    timeLeft: clockState.sessLength * 60
                });
                beginCountDown();
                break;
            }
            default:
                break;
        }
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

    // to reset the timer.
    const resetTimer = () => {
        clearInterval(intervalID);
        setClockState({
            timerType: 'Session',
            timeLeft: 1500,
            sessLength: 25,
            brkLength: 5,
            running: false,
        });
        alarmSound.pause();
        alarmSound.currentTime = 0;
    }

    // this will update the clock display.
    // const clock = () => {
    //     let minutes = Math.floor(clockState.timeLeft / 60);
    //     let seconds = clockState.timeLeft - minutes * 60;
    //
    //     minutes = minutes < 10 ? '0' + minutes : minutes;
    //     seconds = seconds < 10 ? '0' + seconds : seconds;
    //
    //     return minutes + ':' + seconds;
    // }

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
                       src="http://www.blondfro.com/sounds/mp3s/Twin-bell-alarm-clock-ringing-short.mp3"
                       ref={(audio) => {alarmSound = audio}}/>
            </div>
        </div>
    )
}

export default PomodoraClock; 