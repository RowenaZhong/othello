import React, { createContext, useReducer } from "react";
import { GameStatus, StatusAction, statusReducer } from "./status";
export const GameStatusContext = createContext<GameStatus>(new GameStatus);
export const StatusDispatchContext = createContext<React.Dispatch<any>>(() => { });

export const StatusProvider: React.FC<{ children: any }> = ({ children }: { children: any }) => {
    const [status, dispatch] = useReducer(
        statusReducer,
        new GameStatus
    );
    return (
        <GameStatusContext.Provider value={status}>
            <StatusDispatchContext.Provider value={dispatch}>
                {children}
            </StatusDispatchContext.Provider>
        </GameStatusContext.Provider>
    );
}
