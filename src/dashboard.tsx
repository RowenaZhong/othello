import React, { useContext } from "react";
import Button from "./button";
import Inboard from "./inboard";
import { GameStatusContext, StatusDispatchContext } from "./StatusProvider";
import { StatusAction } from "./status";
const DashBoard: React.FC = () => {
    const gameStatus = useContext(GameStatusContext);
    const dispatch = useContext(StatusDispatchContext);
    if (gameStatus.gameOver)
        console.log('Game Over');
    const NewGame = () => {
        //start ui
        let updater: StatusAction = {
            type: 'reset',
            currentPlayer: 'black'
        }
        dispatch(updater);
    }
    const Hint = () => {
        if (!gameStatus.gameOver) return;
    }
    return (
        <div className="dashboard">
            <Inboard />
            <Button left={140} onClick={NewGame}>新游戏</Button>
            <Button left={300} onClick={Hint}>提示</Button>
        </div >
    )
}
export default DashBoard