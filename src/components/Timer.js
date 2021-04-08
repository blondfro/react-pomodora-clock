import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

function Timer({ typeID, title, incrID, decrID, lengthID, length, onClick }) {
    return (
        <div id="counters" className="justify-content-center">
            <h4 id={typeID}>{title}</h4>
            <div className="row justify-content-center">
                <button
                    id={incrID}
                    className="btn btn-outline-dark rounded-circle"
                    onClick={onClick}
                    value="+">
                    <FontAwesomeIcon
                        icon="arrow-circle-up"
                        size="3x"
                        aria-hidden="true" />
                </button>
                <h1 id={lengthID}>{length}</h1>
                <button
                    id={decrID}
                    className="btn btn-outline-dark rounded-circle"
                    onClick={onClick}
                    value="-">
                    <FontAwesomeIcon
                        icon="arrow-circle-down"
                        size="3x"
                        aria-hidden="true" />
                </button>
            </div>
        </div>
    )
}

export default Timer; 