import React, { useContext } from "react"
import { GameStatusContext, StatusDispatchContext } from "./StatusProvider"
import { Cell } from "./cell";
import { GetMoveValue, Judge, MakeMove } from "./game";
import { COORD } from "./status";
const Inboard: React.FC = () => {
    const gameStatus = useContext(GameStatusContext);
    const dispatch = useContext(StatusDispatchContext);
    if (gameStatus.gameOver) {
        const [black, white] = Judge(gameStatus.board);
        console.log(black, white);
        setTimeout(() => {
            alert(black + ':' + white + ((black == white) ? ",Draw!" : ((black > white) ? ',Black wins!' : 'White wins!')));
        }, 10);
    }
    const handleClick = (coord: COORD) => {
        if (!gameStatus.gameOver && gameStatus.currentPlayer != gameStatus.computerPlayer && GetMoveValue(gameStatus, coord) != 0) {
            MakeMove(gameStatus, coord, dispatch);
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