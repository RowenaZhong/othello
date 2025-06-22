import React from "react"
import { NewGameButton } from "./button"
import { StatusAction } from "./status"
import { Decide, MakeMove } from "./game"
interface NewGameProp {
    newgaming: boolean
    dispatch: React.Dispatch<StatusAction>
    setNewGamingUI: React.Dispatch<React.SetStateAction<boolean>>
}

export const NewGamer: React.FC<NewGameProp> = (props) => {
    const start_playing_black = () => {
        props.dispatch({
            type: 'reset',
            computerProvider: 'white',
            currentPlayer: 'black'
        });
        props.setNewGamingUI(false);
    }
    const start_playing_white = () => {
        props.dispatch({
            type: 'reset',
            computerProvider: 'black',
            currentPlayer: 'black'
        });
        props.setNewGamingUI(false);
        // FIXME: start playing white
        // MakeMove(gameStatus, Decide(gameStatus), dispatch);
    }
    const start_playing_twin = () => {
        props.dispatch({
            type: 'reset',
            computerProvider: null,
            currentPlayer: 'black'
        });
        props.setNewGamingUI(false);
    }
    return (
        <div style={{
            display: props.newgaming ? "block" : "none",
            position: "fixed",
            left: "0px",
            top: "0px",
            height: "100vh",
            width: "100vw",
            zIndex: 100
        }}>
            <div className="newgamer">
                <NewGameButton top={40} onClick={start_playing_black}>执黑</NewGameButton>
                <NewGameButton top={120} onClick={start_playing_white}>执白</NewGameButton>
                <NewGameButton top={200} onClick={start_playing_twin}>双人局</NewGameButton>
            </div>
        </div >
    )
}