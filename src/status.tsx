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



export type Player = null | 'white' | 'black'

export const GetEnemy = (player: Player): Player => {
    if (player === 'white') {
        return 'black'
    }
    if (player === 'black') {
        return 'white'
    }
    return null;
}




export interface GameStatus {
    currentPlayer: Player
    computerPlayer: Player
    gameOver: boolean
    board: Player[][]
    level: number[][]
}

export class GameStatus {
    public currentPlayer: Player;
    public board: Player[][];
    public computerPlayer: Player;
    constructor() {
        this.currentPlayer = 'black';
        this.computerPlayer = null;

        this.board = Array(8).fill(null).map(() => Array(8).fill(null));
        this.board[3][3] = this.board[4][4] = 'white';
        this.board[3][4] = this.board[4][3] = 'black';

        this.level = Array(8).fill(null).map(() => Array(8).fill(0));
        this.level[0][0] = this.level[0][7] = this.level[7][0] = this.level[7][7] = 64;
        this.level[0][1] = this.level[0][6] = this.level[1][0] = this.level[1][7] = this.level[6][0] = this.level[6][7] = this.level[7][1] = this.level[7][6] = -32;
        this.level[1][1] = this.level[1][6] = this.level[6][1] = this.level[6][6] = -64;

        for (let i = 2; i <= 5; i++) {
            this.level[0][i] = this.level[7][i] = this.level[i][0] = this.level[i][7] = 32;
            this.level[2][i] = this.level[i][2] = this.level[5][i] = this.level[i][5] = 16;
        }
    }
}


export interface StatusAction {
    type: 'chess' | 'reset' | 'gameover' | 'transfer'
    computerProvider?: Player
    currentPlayer?: Player
    gameOver?: boolean
    boardUpdater?: Array<{ coord: COORD, pawn: Player }>
    levelUpdater?: Array<{ coord: COORD, level: number }>
}

export const statusReducer = (status: GameStatus, action: StatusAction): GameStatus => {
    let newStatus = new GameStatus();
    switch (action.type) {
        case 'chess':
            newStatus = { ...status };
            for (const upd of action.boardUpdater!)
                newStatus.board[upd.coord.X][upd.coord.Y] = upd.pawn;
            for (const upd of action.levelUpdater!)
                newStatus.level[upd.coord.X][upd.coord.Y] = upd.level;
            return newStatus;
        case 'reset':
            newStatus.computerPlayer = action.computerProvider!;
            newStatus.currentPlayer = action.currentPlayer!;
            newStatus.gameOver = false;
            return newStatus;
        case 'transfer':
            newStatus = { ...status };
            newStatus.currentPlayer = action.currentPlayer!;
            return newStatus;
        case 'gameover':
            newStatus = { ...status };
            newStatus.gameOver = true;
            return newStatus;
        default: throw Error('Unknown action type: ' + action.type);
    }
}