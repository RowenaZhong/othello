import Button from "./Button";

export default function DashBoard() {
    return (
        <div className="dashboard">
            <div className="inboard"></div>
            <Button left={140} onClick={() => alert('新游戏')}>新游戏</Button>
            <Button left={300} onClick={() => alert('Hint')}>提示</Button>
        </div >
    )
}