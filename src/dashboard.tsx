import React, { useContext } from "react";
import { DashButton } from "./button";
import Inboard from "./inboard";
import { GameStatusContext, StatusDispatchContext } from "./StatusProvider";
import { NewGamer } from "./NewGamer";
import { Piece } from "./cell";
import { Decide, MakeMove } from "./game";
const DashBoard: React.FC = () => {
    const gameStatus = useContext(GameStatusContext);
    const dispatch = useContext(StatusDispatchContext);
    const [newgaming, setNewgaming] = React.useState(true);
    if (gameStatus.gameOver)
        console.log('Game Over');
    const Hint = () => {
        if (gameStatus.gameOver) return;
        console.log(`Hint Disabled: ${gameStatus.currentPlayer == gameStatus.computerPlayer}`);
        if (gameStatus.currentPlayer == gameStatus.computerPlayer) return;
        MakeMove(gameStatus, Decide(gameStatus), dispatch);
    }
    return (
        <div className="dashboard">
            <Inboard />
            <div style={{ position: "absolute", left: 20, top: 520, height: 50, width: 50 }}>
                <Piece piece={gameStatus.currentPlayer} coord={{ X: - 1, Y: -1 }} onclick={() => { }} />
            </div>
            <DashButton left={140} onClick={() => setNewgaming(true)}>新游戏</DashButton>
            <DashButton left={300} onClick={Hint}>提示</DashButton>
            <NewGamer newgaming={newgaming} dispatch={dispatch} setNewGamingUI={setNewgaming}></NewGamer>
        </div >
    )
}
export default DashBoard