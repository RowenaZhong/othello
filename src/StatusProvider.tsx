import React, { createContext, useReducer } from "react";
import { Status } from "./status";
export const StatusContext = createContext<Status>(new Status);
export const StatusDispatchContext = createContext<React.Dispatch<any>>(() => { });
export const StatusProvider: React.FC<{ children: any }> = ({ children }: { children: any }) => {
    const [status, dispatch] = useReducer(
        statusReducer,
        new Status
    );
    return (
        <StatusContext.Provider value={status}>
            <StatusDispatchContext.Provider value={dispatch}>
                {children}
            </StatusDispatchContext.Provider>
        </StatusContext.Provider>
    );
}
function statusReducer(status: Status, action: any): Status {
    switch (action.type) {
        default: return status;
    }
}