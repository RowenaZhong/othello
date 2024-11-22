import React, { useContext } from "react";
import { DashButton } from "./button";
import Inboard from "./inboard";
import { GameStatusContext, StatusDispatchContext } from "./StatusProvider";
import { NewGamer } from "./NewGamer";
const DashBoard: React.FC = () => {
    const gameStatus = useContext(GameStatusContext);
    const dispatch = useContext(StatusDispatchContext);
    const [newgaming, setNewgaming] = React.useState(false);
    if (gameStatus.gameOver)
        console.log('Game Over');
    const Hint = () => {
        if (!gameStatus.gameOver) return;
    }
    return (
        <div className="dashboard">
            <Inboard />
            <DashButton left={140} onClick={() => setNewgaming(true)}>新游戏</DashButton>
            <DashButton left={300} onClick={Hint}>提示</DashButton>
            <NewGamer newgaming={newgaming} dispatch={dispatch} setNewGamingUI={setNewgaming}></NewGamer>
        </div >
    )
}
export default DashBoard