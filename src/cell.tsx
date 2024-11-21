import React from "react";
import { Player } from "./status";
interface CellUI {
    player: Player
    row: number
    col: number
}
export const Cell: React.FC<CellUI> = (cellui) => {
    return (
        <div key={cellui.row * 8 + cellui.col} className="cell" >
            {
                cellui.player &&
                <div className={`player - ${cellui.player} `}>
                </div>
            }
        </div >
    )
}