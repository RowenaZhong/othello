import { COORD, StatusAction } from "./status";
import { GetEnemy, Player, GameStatus } from "./status";

export const IsValidCoord = (coord: COORD): boolean => {
    return coord.X >= 0 && coord.X < 8 && coord.Y >= 0 && coord.Y < 8;
}
export const Directions = [
    [-1, -1], [-1, 0], [-1, 1],
    [0, -1], [0, 1],
    [1, -1], [1, 0], [1, 1]
]
export const GetMoveValue = (status: GameStatus, coord: COORD): number => {
    let x = coord.X, y = coord.Y;
    const board = status.board;
    const currentPlayer = status.currentPlayer;
    if ((x < 0) || (x > 7) || (y < 0) || (y > 7))
        return 0;
    if (board[x][y])
        return 0;

    let t = 0, u: number, v: number;
    for (let d of Directions) {
        const dx = d[0], dy = d[1];
        u = x, v = y;
        if (!IsValidCoord({ X: u + dx, Y: v + dy }))
            continue;
        while (board[u + dx][v + dy] == GetEnemy(currentPlayer)) {
            u += dx, v += dy;
            if (!IsValidCoord({ X: u + dx, Y: v + dy }))
                break;
        }
        if (IsValidCoord({ X: u, Y: v }) && board[u + dx][v + dy] == currentPlayer) {
            u = x, v = y;
            while (board[u + dx][v + dy] == GetEnemy(currentPlayer)) {
                u += dx, v += dy;
                t++;
            }
        }
    }
    return t;
}

export const Chess = (status: GameStatus, coord: COORD): StatusAction => {
    let boardUpd = new Array<{ coord: COORD, pawn: Player }>();
    let updater: StatusAction = {
        type: 'chess',
        boardUpdater: boardUpd,
        levelUpdater: new Array<{ coord: COORD, level: number }>()
    }
    const board = status.board;
    const currentPlayer = status.currentPlayer;
    boardUpd.push({ coord: coord, pawn: currentPlayer });
    let t = 0, u: number, v: number;
    for (let d of Directions) {
        let dx = d[0], dy = d[1];
        [u, v] = [coord.X, coord.Y]
        if (!IsValidCoord({ X: u + dx, Y: v + dy }))
            continue;
        while (board[u + dx][v + dy] == GetEnemy(currentPlayer)) {
            u += dx, v += dy;
            if (!IsValidCoord({ X: u + dx, Y: v + dy }))
                break;
        }
        if (IsValidCoord({ X: u, Y: v }) && board[u + dx][v + dy] == currentPlayer) {
            u = coord.X, v = coord.Y;
            while (board[u + dx][v + dy] == GetEnemy(currentPlayer)) {
                u += dx, v += dy;
                t++;
                boardUpd.push({ coord: { X: u, Y: v }, pawn: currentPlayer });
            }
        }

    }
    return updater;
}

export const chessable = (status: GameStatus, player: Player): boolean => {
    let st = status;
    st.currentPlayer = player;
    for (let i = 0; i < 8; i++)
        for (let j = 0; j < 8; j++)
            if (GetMoveValue(st, { X: i, Y: j }))
                return true;
    return false;
}