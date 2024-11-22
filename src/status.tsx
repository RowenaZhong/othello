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

    }
}


export interface StatusAction {
    type: 'chess' | 'reset' | 'gameover' | 'transfer'
    computerProvider?: Player
    currentPlayer?: Player
    gameOver?: boolean
    boardUpdater?: Array<{ coord: COORD, piece: Player }>
}

export const statusReducer = (status: GameStatus, action: StatusAction): GameStatus => {
    let newStatus = new GameStatus();
    switch (action.type) {
        case 'chess':
            newStatus = { ...status };
            for (const upd of action.boardUpdater!)
                newStatus.board[upd.coord.X][upd.coord.Y] = upd.piece;
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
            newStatus.currentPlayer = null;
            setTimeout(() => alert('Game Over!'), 10);
            return newStatus;
        default: throw Error('Unknown action type: ' + action.type);
    }
}