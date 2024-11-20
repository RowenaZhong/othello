export interface Matrix<T> {
    data: Array<T>
    x: number
    y: number
}
export class Matrix<T> {
    data: Array<T>
    x: number
    y: number
    constructor(x: number, y: number) {
        this.data = new Array(x * y);
        this.x = x;
        this.y = y;
    }
    get(i: number, j: number) {
        return this.data[i * this.x + j];
    }
    set(i: number, j: number, val: T) {
        this.data[i * this.x + j] = val;
    }
}