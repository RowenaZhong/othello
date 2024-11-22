interface ButtonProps {
    left: number
    onClick?: any
    children?: string
}
const Button: React.FC<ButtonProps> = (props) => {
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
export default Button