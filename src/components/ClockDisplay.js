import React, {useEffect, useState} from 'react';
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";

function ClockDisplay({ timerType, timeLeft, running, begin, reset }) {
    const [timeDisplay, setTimeDisplay] = useState('');

    useEffect(() => {
        const clock = () => {
            let minutes = Math.floor(timeLeft / 60);
            let seconds = timeLeft - minutes * 60;

            minutes = minutes < 10 ? '0' + minutes : minutes;
            seconds = seconds < 10 ? '0' + seconds : seconds;

            setTimeDisplay(minutes + ':' + seconds);
            // return minutes + ':' + seconds;
        }

        clock();
        console.log('length has changed', timeLeft);

    }, [timeLeft])





    return (
        <div>
            <h2 id="timer-label">{timerType}</h2>
            <h1 id="time-left">
                {timeDisplay}
            </h1>
            <div className="row">
                <button
                    id="start_stop"
                    className={
                        running
                            ? 'btn btn-outline-warning rounded-circle'
                            : 'btn btn-outline-success rounded-circle'
                    }
                    onClick={begin}>{
                    running
                        ? <FontAwesomeIcon
                            icon="pause-circle"
                            size="2x"
                            aria-hidden="true"/>
                        : <FontAwesomeIcon
                            icon="play-circle"
                            size="2x"
                            aria-hidden="true"/>
                }</button>
                <button
                    id="reset"
                    className="btn btn-outline-danger rounded-circle"
                    onClick={reset}>
                    <FontAwesomeIcon
                        icon="redo"
                        size="2x"
                        aria-hidden="true"
                    />
                </button>
            </div>
        </div>
    )
}

export default ClockDisplay;