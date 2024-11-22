import React, { useContext } from "react"
import { GameStatusContext, StatusDispatchContext } from "./StatusProvider"
import { Cell } from "./cell";
import { ReversePieces, ExistValidMovement, GetValidMovements, GetMoveValue } from "./game";
import { COORD, GetEnemy, statusReducer } from "./status";
const Inboard: React.FC = () => {
    const gameStatus = useContext(GameStatusContext);
    const dispatch = useContext(StatusDispatchContext);
    const handleClick = (coord: COORD) => {
        if (!gameStatus.gameOver && GetMoveValue(gameStatus, coord) != 0) {
            const updater = ReversePieces(gameStatus, coord);
            dispatch(updater);
            const newGameStatus = statusReducer(gameStatus, updater);
            if (ExistValidMovement(newGameStatus, GetEnemy(newGameStatus.currentPlayer)))
                dispatch({
                    type: 'transfer',
                    currentPlayer: GetEnemy(newGameStatus.currentPlayer)
                }), console.log('transfer!');

            else if (!ExistValidMovement(newGameStatus, newGameStatus.currentPlayer))
                dispatch({
                    type: 'gameover',
                    winner: GetEnemy(newGameStatus.currentPlayer)
                }), console.log('gameOver!');

            else console.log('continue!');
            console.log(GetValidMovements(newGameStatus, newGameStatus.currentPlayer));
            console.log(GetValidMovements(newGameStatus, GetEnemy(newGameStatus.currentPlayer)));
        }

    }
    const CellJSX = gameStatus.board.map((rowCell, row) => {
        return rowCell.map((piece, col) => {
            return <Cell key={`${row}-${col}`} piece={piece} coord={{ X: row, Y: col }} onclick={handleClick} />
        })
    }

    );
    return (
        <div className="inboard">
            <div style={{
                margin: "5px",
                display: "grid",
                gridTemplateRows: "repeat(8, 50px)",
                gridTemplateColumns: "repeat(8, 50px)",
                gridRowGap: "10px",
                gridColumnGap: "10px"
            }}>
                {CellJSX}
            </div>
        </div>
    )
}
export default Inboard