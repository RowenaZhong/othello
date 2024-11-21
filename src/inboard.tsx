import React, { useContext } from "react"
import { StatusContext, StatusProvider } from "./StatusProvider"
import { Cell } from "./cell";
const Inboard: React.FC = () => {
    const CellItems = useContext(StatusContext);
    const CellJSX = CellItems.game.map((rowCell, row) =>
        rowCell.map((player, col) =>
            <Cell key={row * 8 + col} player={player} col={col} row={row} />
        )
    );
    return (
        <div className="inboard" style={{
            display: "grid",
            gridTemplateRows: "repeat(8, 60px)",
            gridTemplateColumns: "repeat(8, 60px)"
        }}>
            <StatusProvider>
                {CellJSX}
            </StatusProvider>
        </div>
    )
}
export default Inboard