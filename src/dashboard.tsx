import React, { createContext, useContext, useReducer, useState } from "react";
import Button from "./Button";
import { Status } from "./game";
import Inboard from "./inboard";
const DashBoard: React.FC = () => {
    const [status, setStatus] = useState(new Status());
    const statusContext = createContext(status);
    return (
        <div className="dashboard">
            <statusContext.Provider value={status}>
                <Inboard />
            </statusContext.Provider>
            <Button left={140} onClick={() => alert('新游戏')}>新游戏</Button>
            <Button left={300} onClick={() => alert('Hint')}>提示</Button>
        </div >
    )
}
export default DashBoard