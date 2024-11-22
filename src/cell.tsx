import React from "react";
import { Player } from "./status";
import { COORD } from "./status";
interface CellUI {
    pawn: Player
    coord: COORD
    onclick: any
}
export const Cell: React.FC<CellUI> = (cellui) => {
    return (
        <div className="cell" onClick={() => cellui.onclick(cellui.coord)}>
            {
                cellui.pawn &&
                <div className={`pawn`} style={{ backgroundColor: cellui.pawn }}>
                </div>
            }
        </div >
    )
}