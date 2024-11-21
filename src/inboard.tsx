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