import { useContext } from "react";
import { StatusContext } from "./StatusProvider";
import { GetEnemy } from "./status";

export interface COORD {
    X: number
    Y: number
}
export class COORD {
    public X: number;
    public Y: number;
    constructor(x: number, y: number) {
        this.X = x;
        this.Y = y;
    }
}
export const IsValidCoord = (coord: COORD): boolean => {
    return coord.X >= 0 && coord.X < 8 && coord.Y >= 0 && coord.Y < 8;
}
export const Directions = [
    [-1, -1], [-1, 0], [-1, 1],
    [0, -1], [0, 1],
    [1, -1], [1, 0], [1, 1]
]
export const GetMoveValue = (coord: COORD): number => {
    let x = coord.X, y = coord.Y;
    let board = useContext(StatusContext).board.slice();
    const currentPlayer = useContext(StatusContext).currentPlayer;
    if ((x < 0) || (x > 7) || (y < 0) || (y > 7))
        return 0;
    if (board[x][y] == null)
        return 0;

    let t = 0, u: number, v: number;
    for (let d of Directions) {
        const dx = d[0], dy = d[1];
        u = x, v = y;
        while (board[u + dx][v + dy] == GetEnemy(currentPlayer)) {
            u += dx, v += dy;
            if (!IsValidCoord({ X: u, Y: v }))
                break;
        }
        if (IsValidCoord({ X: u, Y: v }) && board[u + dx][v + dy] == currentPlayer) {
            u = x, v = y;
            while (board[u + dx][v + dy] == GetEnemy(currentPlayer)) {
                board[u + dx][v + dy] = currentPlayer;
                u += dx, v += dy;
                t++;
            }
        }
    }
    return t;
}
