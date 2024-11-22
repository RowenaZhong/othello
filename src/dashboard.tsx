import React from "react";
import Button from "./button";
import Inboard from "./inboard";
const DashBoard: React.FC = () => {
    return (
        <div className="dashboard">
            <Inboard />
            <Button left={140} onClick={() => alert('新游戏')}>新游戏</Button>
            <Button left={300} onClick={() => alert('Hint')}>提示</Button>
        </div >
    )
}
export default DashBoard