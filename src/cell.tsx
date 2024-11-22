import React from "react";
import { Player } from "./status";
import { COORD } from "./status";
interface CellUI {
    piece: Player
    coord: COORD
    onclick: any
    left?: number
    top?: number
}
export const Piece: React.FC<CellUI> = (cellui) => {
    return (
        <div className={`piece`} style={{ backgroundColor: cellui.piece! }} />
    )
}
export const Cell: React.FC<CellUI> = (cellui) => {
    return (
        <div className="cell" onClick={() => cellui.onclick(cellui.coord)} >
            {
                cellui.piece && <Piece piece={cellui.piece} coord={cellui.coord} onclick={cellui.onclick} />
            }
        </div >
    )
}