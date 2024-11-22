import React, { useContext } from "react"
import { StatusContext, StatusProvider } from "./StatusProvider"
import { Cell } from "./cell";
import { Player } from "./status";
const Inboard: React.FC = () => {
    const CellItems = useContext(StatusContext);
    const handleClick = ({ player, row, col }: { player: Player, row: number, col: number }) => {
        if (player) return;
    }
    const CellJSX = CellItems.board.map((rowCell, row) => {
        console.log(rowCell, row);
        return rowCell.map((player, col) => {
            console.log(player, row, col);
            return <Cell key={row * 8 + col} player={player} col={col} row={row} onclick={handleClick} />
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
                <StatusProvider>
                    {CellJSX}
                </StatusProvider>
            </div>
        </div>
    )
}
export default Inboard