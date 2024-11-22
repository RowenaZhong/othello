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
export interface Status {
    currentPlayer: Player
    computerPlayer: Player
    gameOver: boolean
    board: Player[][]
    level: number[][]
}
export class Status {
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

        this.gameOver = false;
    }
}