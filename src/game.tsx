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
        if (IsValidCoord({ X: u + dx, Y: v + dy }) && board[u + dx][v + dy] == currentPlayer) {
            u = x, v = y;
            while (board[u + dx][v + dy] == GetEnemy(currentPlayer)) {
                u += dx, v += dy;
                t++;
            }
        }
    }
    return t;
}

export const ReversePieces = (status: GameStatus, coord: COORD): StatusAction => {
    let boardUpdater = new Array<{ coord: COORD, piece: Player }>();
    let gameStatusUpdater: StatusAction = {
        type: 'chess',
        boardUpdater: boardUpdater
    }
    const board = status.board;
    const currentPlayer = status.currentPlayer;
    boardUpdater.push({ coord: coord, piece: currentPlayer });
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
        if (IsValidCoord({ X: u + dx, Y: v + dy }) && board[u + dx][v + dy] == currentPlayer) {
            u = coord.X, v = coord.Y;
            while (board[u + dx][v + dy] == GetEnemy(currentPlayer)) {
                u += dx, v += dy;
                t++;
                boardUpdater.push({ coord: { X: u, Y: v }, piece: currentPlayer });
            }
        }

    }
    return gameStatusUpdater;
}

export const ExistValidMovement = (status: GameStatus, player: Player): boolean => {
    let st = { ...status, currentPlayer: player };
    for (let i = 0; i < 8; i++)
        for (let j = 0; j < 8; j++)
            if (GetMoveValue(st, { X: i, Y: j }))
                return true;
    return false;
}
export const GetValidMovements = (status: GameStatus, player: Player): Array<COORD> => {
    let st = { ...status, currentPlayer: player };
    let ret = new Array<COORD>()
    for (let i = 0; i < 8; i++)
        for (let j = 0; j < 8; j++)
            if (GetMoveValue(st, { X: i, Y: j }))
                ret.push({ X: i, Y: j });
    return ret;
}

export const Decide = (status: GameStatus): COORD => {
    const player = status.currentPlayer;
    const board = status.board.slice();
    let rank = Array(8).fill(null).map(() => Array(8).fill(0));
    rank[0][0] = rank[0][7] = rank[7][0] = rank[7][7] = 64;
    rank[0][1] = rank[0][6] = rank[1][0] = rank[1][7] = rank[6][0] = rank[6][7] = rank[7][1] = rank[7][6] = -32;
    rank[1][1] = rank[1][6] = rank[6][1] = rank[6][6] = -64;

    for (let i = 2; i <= 5; i++) {
        rank[0][i] = rank[7][i] = rank[i][0] = rank[i][7] = 32;
        rank[2][i] = rank[i][2] = rank[5][i] = rank[i][5] = 16;
    }

    if (board[0][0] == player) {
        for (let i = 1; i < 7; i++)
            if (board[0][i - 1] == player)
                rank[0][i] = 48;
            else break;
        for (let i = 1; i < 7; i++)
            if (board[i - 1][0] == player)
                rank[i][0] = 48;
            else break;
        rank[1][1] = 48;
    }
    if (board[0][0] == GetEnemy(player)) {
        if (board[0][2] == GetEnemy(player))
            rank[0][1] = 64;
        if (board[2][0] == GetEnemy(player))
            rank[1][0] = 64;
    }
    if (board[0][7] == player) {
        for (let i = 6; i > 0; i--)
            if (board[0][i + 1] == player)
                rank[0][i] = 48;
            else break;
        for (let i = 1; i < 7; i++)
            if (board[i - 1][7] == player)
                rank[i][7] = 48;
            else break;
        rank[1][6] = 48;
    }
    if (board[0][7] == GetEnemy(player)) {
        if (board[0][5] == GetEnemy(player))
            rank[0][6] = 64;
        if (board[2][7] == GetEnemy(player))
            rank[1][7] = 64;
    }
    if (board[7][0] == player) {
        for (let i = 1; i < 7; i++)
            if (board[7][i - 1] == player)
                rank[7][i] = 48;
            else break;
        for (let i = 6; i > 0; i--)
            if (board[i + 1][0] == player)
                rank[i][0] = 48;
            else break;
        rank[6][1] = 48;
    }
    if (board[7][0] == GetEnemy(player)) {
        if (board[7][2] == GetEnemy(player))
            rank[7][1] = 64;
        if (board[5][0] == GetEnemy(player))
            rank[6][0] = 64;
    }
    if (board[7][7] == player) {
        for (let i = 6; i > 0; i--)
            if (board[7][i + 1] == player)
                rank[7][i] = 48;
            else break;
        for (let i = 6; i > 0; i--)
            if (board[i + 1][7] == player)
                rank[i][7] = 48;
            else break;
        rank[6][6] = 48;
    }
    if (board[7][7] == GetEnemy(player)) {
        if (board[7][5] == GetEnemy(player))
            rank[7][6] = 64;
        if (board[5][7] == GetEnemy(player))
            rank[6][7] = 64;
    }
    let maxScore: number = -100;
    let maxScorePositionList = new Array<COORD>();
    for (let i = 0; i < 8; i++)
        for (let j = 0; j < 8; j++) {
            let score = GetMoveValue(status, { X: i, Y: j });
            if (score > 0) {
                score += rank[i][j];
                if (score > maxScore) {
                    maxScore = score;
                    maxScorePositionList = [{ X: i, Y: j }];
                }
                else if (score == score)
                    maxScorePositionList.push({ X: i, Y: j });
            }
        }
    if (maxScorePositionList.length > 0) {
        let idx = Math.floor(Math.random() * maxScorePositionList.length);
        return maxScorePositionList[idx];
    }
    return { X: -1, Y: -1 };
}