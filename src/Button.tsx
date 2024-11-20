interface ButtonProps {
    left: number
    onClick?: any
    children?: string
}
export default function Button(props: ButtonProps) {
    return <button className="dash_button" onClick={props.onClick} style={{ left: props.left }} >{props.children}</button >
}