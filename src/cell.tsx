import React from "react";
import { Player } from "./status";
interface CellUI {
    player: Player
    row: number
    col: number
    onclick: any
}
export const Cell: React.FC<CellUI> = (cellui) => {
    return (
        <div key={`${cellui.row}-${cellui.col}`} className="cell" onClick={() => cellui.onclick(cellui.player, cellui.row, cellui.col)}>
            {
                cellui.player &&
                <div className={`pawn`} style={{ backgroundColor: cellui.player }}>
                </div>
            }
        </div >
    )
}