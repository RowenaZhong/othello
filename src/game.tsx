type Player = null | 'white' | 'black'
export interface Status {
    currentPlayer: Player
    game: Player[][]
    computerPlayer: Player
}
export class Status {
    public currentPlayer: Player;
    public game: Player[][];
    public computerPlayer: Player;
    constructor() {
        this.currentPlayer = 'black';
        this.computerPlayer = null;
        this.game = Array(8).fill(Array(8).fill(null));
    }
}