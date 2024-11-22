interface DashButtonProps {
    left: number
    onClick?: any
    children?: string
}
const DashButton: React.FC<DashButtonProps> = (props) => {
    return (
        <div
            className="dash_button"
            onClick={props.onClick}
            style={{ left: props.left }}
        >
            {props.children}
        </div >
    )
}

interface NewGameButtonProps {
    top: number
    onClick?: any
    children?: string
}
const NewGameButton: React.FC<NewGameButtonProps> = (props) => {
    return (
        <div
            className="idbGameModeSelector"
            onClick={props.onClick}
            style={{ top: props.top }}
        >
            {props.children}
        </div >
    )
}
export { DashButton, NewGameButton }