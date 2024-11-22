import React, { useContext } from "react"
import { GameStatusContext, StatusDispatchContext } from "./StatusProvider"
import { Cell } from "./cell";
import { Chess, chessable, GetMoveValue } from "./game";
import { COORD, GameStatus, GetEnemy } from "./status";
const Inboard: React.FC = () => {
    const gameStatus = useContext(GameStatusContext);
    const gameUpd = useContext(StatusDispatchContext);
    const handleClick = (coord: COORD) => {
        if (!gameStatus.gameOver && GetMoveValue(gameStatus, coord) != 0) {
            gameUpd(Chess(gameStatus, coord));
            if (chessable(gameStatus, GetEnemy(gameStatus.currentPlayer)))
                gameUpd({
                    type: 'transfer',
                    currentPlayer: GetEnemy(gameStatus.currentPlayer)
                });
            else if (!chessable(gameStatus, gameStatus.currentPlayer))
                gameUpd({
                    type: 'gameover',
                    winner: GetEnemy(gameStatus.currentPlayer)
                })

        }
    }
    const CellJSX = gameStatus.board.map((rowCell, row) => {
        return rowCell.map((pawn, col) => {
            return <Cell key={`${row}-${col}`} pawn={pawn} coord={{ X: row, Y: col }} onclick={handleClick} />
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