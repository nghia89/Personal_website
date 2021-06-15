import { IConCheckSuccess, IConCheckError } from "@/helpers/svg";
import React, { useState, useEffect } from "react";

export default function NotificationBox(props) {
  const [exit, setExit] = useState<Boolean>(false);
  const [width, setWidth] = useState(0);
  const [intervalID, setIntervalID] = useState<number>(0);

  const handleStartTimer = () => {
    let id: any;
    id = setInterval(() => {
      setWidth(prev => {
        if (prev < 100) {
          return prev + 0.5;
        }
        clearInterval(id);
        return prev;
      });
    }, 20);

    setIntervalID(id);
  };


  const handlePauseTimer = () => {
    clearInterval(intervalID);
  };

  const handleCloseNotification = () => {
    setExit(true);
    handlePauseTimer();
    setTimeout(() =>
      props.dispatch({
        type: "REMOVE_NOTIFICATION",
        id: props.id
      }), 400)
  };

  useEffect(() => {
    if (width === 100) {
      // Close notification
      handleCloseNotification()
    }
  }, [width])

  useEffect(() => {
    handleStartTimer();
  }, []);

  return (
    <div
      onMouseEnter={handlePauseTimer}
      onMouseLeave={handleStartTimer}
      className={`notification-item ${props.type === "SUCCESS" ? "show_success" : "show_error"} ${exit ? "exit" : ""}`
      }
    >
      <div className="d-flex justify-content-center align-items-center">
        <span>
          {props.type === "SUCCESS" ? IConCheckSuccess() : IConCheckError()}
        </span>
        <p>{props.message}

        </p>
        <span className={"close"} onClick={() => handleCloseNotification()}>x</span>
      </div>

      < div className={"bar"} style={{ width: `${width}%` }} />
    </div>
  )
}