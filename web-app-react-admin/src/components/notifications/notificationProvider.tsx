import React, { createContext, useContext, useReducer } from "react";
import { randomUId } from "@/helpers/utils";
import NotificationBox from "./notificationBox";

export const NotificationContext = createContext({});

const NotificationProvider = (props) => {
  const [state, dispatch] = useReducer((state, action) => {
    switch (action.type) {
      case "ADD_NOTIFICATION":
        return [{ ...action.payload }, ...state];
      case "REMOVE_NOTIFICATION":
        return state.filter(el => el.id !== action.id);
      default:
        return state
    }
  }, []);

  return (
    <NotificationContext.Provider value={dispatch}>
      <div className={"notification-wrapper"}>
        {state.map((note) => {
          return <NotificationBox dispatch={dispatch} key={note.id} {...note} />
        })}
      </div>
      {props.children}
    </NotificationContext.Provider>
  )
};

export const useNotification = () => {
  const dispatch = useContext(NotificationContext) as any;

  return (type: 'SUCCESS' | 'ERROR', message: String) => {
    dispatch({
      type: "ADD_NOTIFICATION",
      payload: {
        id: randomUId(),
        type: type,
        message: message
      }
    })
  }
};

export default NotificationProvider;