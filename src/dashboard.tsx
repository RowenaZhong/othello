import React, { useContext } from "react";
import { DashButton } from "./button";
import Inboard from "./inboard";
import { GameStatusContext, StatusDispatchContext } from "./StatusProvider";
import { NewGamer } from "./NewGamer";
import { Piece } from "./cell";
import { Decide, ExistValidMovement, MakeMove } from "./game";
import { GetEnemy, statusReducer } from "./status";
const DashBoard: React.FC = () => {
    const gameStatus = useContext(GameStatusContext);
    const dispatch = useContext(StatusDispatchContext);
    const [newgaming, setNewgaming] = React.useState(false);
    if (gameStatus.gameOver)
        console.log('Game Over');
    const Hint = () => {
        if (gameStatus.gameOver) return;
        let updater = MakeMove(gameStatus, Decide(gameStatus));
        dispatch(updater);
        const newGameStatus = statusReducer(gameStatus, updater);
        if (ExistValidMovement(newGameStatus, GetEnemy(newGameStatus.currentPlayer)))
            dispatch({
                type: 'transfer',
                currentPlayer: GetEnemy(newGameStatus.currentPlayer)
            });

        else if (!ExistValidMovement(newGameStatus, newGameStatus.currentPlayer))
            dispatch({
                type: 'gameover',
                winner: GetEnemy(newGameStatus.currentPlayer)
            });
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