import React, { useState } from 'react';

import StartBallAnimation from './gameScene';

const SessionManager = () => {
    const [sessions, setSessions] = useState([]);  
    const [sessionCounter, setSessionCounter] = useState(null);
    const [isSessionActive,setIsSessionActive] = useState(false)
    
    const generateSessionId = () => {
        const sid = '_' + Math.random().toString(36).substring(2, 9);
        return sid;
    };

    const getRandomInt = (min, max) => {
        const counter = Math.floor(Math.random() * (max - min + 1)) + min;
        return counter;
    };

    const startSession = () => {
        if (isSessionActive) {
            return;
          }
        setIsSessionActive(true);
        const sessionId = generateSessionId();
        const counterDuration = getRandomInt(10,15);
        const startTime = new Date();
        setSessionCounter(counterDuration)
              
        // Start countdown
         const counterInterval = setInterval(() => {
            setSessionCounter(prevCounter => {
                if (prevCounter === 0) {
                    clearInterval(counterInterval);
                    const endTime = new Date();
                    const newSession = {
                        id : sessionId,
                        startTime : startTime,
                        endTime: endTime,
                    }
                    setSessions((prevSessions) => [...prevSessions, newSession])
                    setIsSessionActive(false);
                    console.log(sessions)
                    return 0;
                }
                return prevCounter - 1;
            });
        }, 1000);
    };   

    return (
        <div>
            <button onClick={startSession}>Start Session</button>
            <div>
              Session Timer: {sessionCounter} seconds
             </div>
            <div className="session-list">
                {sessions.map((session, index) => (
                    <div key={index}>
                        Session ID: {session.id}<br />
                        Start Time: {session.startTime.toString()}<br />
                        End Time: {session.endTime ? session.endTime.toString() : "Not ended yet"}<br />
                    </div>
                ))}
            </div>
         {<StartBallAnimation isSessionActive={isSessionActive}/>}
          
        </div>
    );
};

export default SessionManager;
